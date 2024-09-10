import { Router } from 'express';
import session from 'express-session';
import QueryAsync from '../controller/login.controller'; // Importamos el controlador
import {pool} from '../config/db'

const router = Router();
const query = new QueryAsync(pool);

// Configuración de la sesión
router.use(session({
  secret: process.env.JWT_SECRET || 'mySecretKey', // Usa un secreto seguro
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false }, // Asegúrate de activar 'secure' en producción con HTTPS
}));

// Ruta de login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await query.getUserByUsername(username);

    if (!user) {
      return res.status(400).json({ message: 'Usuario no encontrado' });
    }

    const isPasswordValid = await query.validatePassword(password, user.password_hash);

    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Contraseña incorrecta' });
    }

    // Establecer sesión
    req.session.userId = user.id;
    res.json({ message: 'Login exitoso' });
  } catch (err) {
    res.status(500).json({ message: 'Error al iniciar sesión' });
  }
});

// Middleware para proteger rutas
function authMiddleware(req: any, res: any, next: any) {
  if (req.session.userId) {
    next();
  } else {
    res.status(401).json({ message: 'No autorizado' });
  }
}

// Ruta protegida de ejemplo
router.get('/perfil', authMiddleware, async (req, res) => {
  const user = await query.getUserById(req.session.userId);
  res.json(user);
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

export default router;
