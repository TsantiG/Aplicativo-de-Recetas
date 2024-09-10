import { Router } from 'express';
import session from 'express-session';
import QueryAsync from '../controller/login.controller.js'; // Importamos el controlador
import { pool } from '../config/db.js';
import bcrypt from 'bcryptjs';

const router = Router();
const query = new QueryAsync(pool);

// Configuración de la sesión
router.use(session({
  secret: process.env.JWT_SECRET || 'mySecretKey', // Usa un secreto seguro
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false }, // Asegúrate de activar 'secure' en producción con HTTPS
}));

// Ruta de login (se usa el correo en lugar del nombre)
router.post('/login', async (req, res) => {
  const { correo, password } = req.body;
  try {
    const user = await query.getUserByEmail(correo); // Modificamos para usar correo

    if (!user) {
      return res.status(400).json({ message: 'Correo no encontrado' });
    }

    const isPasswordValid = await query.validatePassword(password, user.password_hash);

    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Contraseña incorrecta' });
    }

    // Establecer sesión
    (req.session as any).userId = user.id;
    res.json({ message: 'Login exitoso' });
  } catch (err) {
    res.status(500).json({ message: 'Error al iniciar sesión' });
  }
});

// Ruta protegida para ver perfil del usuario
router.get('/perfil', authMiddleware, async (req, res) => {
  const userId = (req.session as any).userId;
  const user = await query.getUserById(userId);
  res.json(user);
});

// Ruta para registrar un nuevo usuario (nombre, correo, password)
router.post('/register', async (req, res) => {
  const { nombre, correo, password } = req.body;
  try {
    // Hasheamos la contraseña antes de guardarla
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = { nombre, correo, password_hash: hashedPassword };

    const userId = await query.createUser(newUser);
    res.status(201).json({ message: 'Usuario creado con éxito', userId });
  } catch (err) {
    res.status(500).json({ message: 'Error al crear usuario' });
  }
});

// Ruta para buscar usuario por ID
router.get('/user/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const user = await query.getUserById(parseInt(id, 10));

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Error al buscar usuario' });
  }
});

// Ruta para eliminar usuario por ID
router.delete('/user/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const affectedRows = await query.deleteUser(parseInt(id, 10));

    if (affectedRows === 0) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    res.json({ message: 'Usuario eliminado con éxito' });
  } catch (err) {
    res.status(500).json({ message: 'Error al eliminar usuario' });
  }
});

// Ruta de logout
router.post('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: 'Error al cerrar sesión' });
    }
    res.json({ message: 'Sesión cerrada con éxito' });
  });
});

// Middleware para proteger rutas
function authMiddleware(req: any, res: any, next: any) {
  if (req.session.userId) {
    next();
  } else {
    res.status(401).json({ message: 'No autorizado' });
  }
}

export default router;
