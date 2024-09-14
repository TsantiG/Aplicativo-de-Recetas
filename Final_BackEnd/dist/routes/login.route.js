import { Router } from 'express';
import session from 'express-session';
import QueryAsync from '../controller/login.controller.js';
import { getPool } from '../config/db.js'; // Obtener el pool inicializado
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
const router = Router();
const query = new QueryAsync(getPool()); // Pasar el pool inicializado al controlador
// Configuración de la sesión
router.use(session({
    secret: process.env.JWT_SECRET || 'mySecretKey',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false },
}));
// Ruta para registrar un nuevo usuario
router.post('/register', async (req, res) => {
    const { nombre, correo, password } = req.body;
    if (!nombre || !correo || !password) {
        return res.status(400).json({ message: 'Nombre, correo y contraseña son obligatorios' });
    }
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = { nombre, correo, password_hash: hashedPassword };
        const userId = await query.createUser(newUser);
        res.status(201).json({ message: 'Usuario creado con éxito', userId });
    }
    catch (err) {
        if (err instanceof Error) {
            console.error("Error creando usuario:", err);
            res.status(500).json({ message: 'Error al crear usuario', error: err.message });
        }
        else {
            console.error("Error desconocido:", err);
            res.status(500).json({ message: 'Error desconocido al crear usuario' });
        }
    }
});
router.post('/login', async (req, res) => {
    const { correo, password } = req.body;
    if (!correo || !password) {
        return res.status(400).json({ message: 'Correo y contraseña son obligatorios' });
    }
    try {
        const user = await query.getUserByEmail(correo);
        if (!user) {
            return res.status(400).json({ message: 'Correo no encontrado' });
        }
        // Validar la contraseña ingresada con la contraseña hasheada almacenada en la base de datos
        const isPasswordValid = await query.validatePassword(password, user.password_hash);
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Contraseña incorrecta' });
        }
        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET || 'mySuperSecretKey', {
            expiresIn: '24h', // proteccion de las rutas 
        });
        // Establecer sesión
        req.session.userId = user.id;
        res.json({ message: 'Login exitoso', token, userId: user.id });
    }
    catch (err) {
        if (err instanceof Error) {
            console.error("Error creando usuario:", err);
            res.status(500).json({ message: 'Error al iniciar sesión', error: err.message });
        }
        else {
            console.error("Error desconocido:", err);
            res.status(500).json({ message: 'Error desconocido al iniciar sesión' });
        }
    }
});
router.get('/perfil', authMiddleware, async (req, res) => {
    const userId = req.session.userId;
    const user = await query.getUserById(userId);
    res.json(user);
});
// router.post('/register', async (req, res) => {
//   const { nombre, correo, password } = req.body;
//   try {
//     // Hasheamos la contraseña antes de guardarla
//     const hashedPassword = await bcrypt.hash(password, 10);
//     const newUser = { nombre, correo, password_hash: hashedPassword };
//     const userId = await query.createUser(newUser);
//     res.status(201).json({ message: 'Usuario creado con éxito', userId });
//   } catch (err) {
//     res.status(500).json({ message: 'Error al crear usuario' });
//   }
// });
router.get('/user/:id', async (req, res) => {
    const { id } = req.params;
    if (isNaN(parseInt(id, 10))) {
        return res.status(400).json({ message: 'ID de usuario no válido' });
    }
    try {
        const user = await query.getUserById(parseInt(id, 10));
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        res.json(user);
    }
    catch (err) {
        if (err instanceof Error) {
            console.error("Error creando usuario:", err);
            res.status(500).json({ message: 'Error al buscar usuario', error: err.message });
        }
        else {
            console.error("Error desconocido:", err);
            res.status(500).json({ message: 'Error desconocido al buscar usuario' });
        }
    }
});
// Ruta para eliminar usuario por ID
router.delete('/user/:id', async (req, res) => {
    const { id } = req.params;
    if (isNaN(parseInt(id, 10))) {
        return res.status(400).json({ message: 'ID de usuario no válido' });
    }
    try {
        const affectedRows = await query.deleteUser(parseInt(id, 10));
        if (affectedRows === 0) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        res.json({ message: 'Usuario eliminado con éxito' });
    }
    catch (err) {
        if (err instanceof Error) {
            console.error("Error creando usuario:", err);
            res.status(500).json({ message: 'Error al eliminar usuario', error: err.message });
        }
        else {
            console.error("Error desconocido:", err);
            res.status(500).json({ message: 'Error desconocido al eliminar usuario' });
        }
    }
});
router.post('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ message: 'Error al cerrar sesión' });
        }
        res.json({ message: 'Sesión cerrada con éxito' });
    });
});
// Middleware para proteger rutas
function authMiddleware(req, res, next) {
    if (req.session.userId) {
        next();
    }
    else {
        res.status(401).json({ message: 'No autorizado' });
    }
}
export default router;
