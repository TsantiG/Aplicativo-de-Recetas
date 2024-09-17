import { Router } from 'express';
import session from 'express-session';
import QueryAsync from '../controller/login.controller.js';
import { getPool } from '../config/db.js';  // Obtener el pool inicializado
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'; 
import multer from 'multer';
import PerfilController from '../controller/perfil.controller.js';



const router = Router();
const query = new QueryAsync(getPool());  // Pasar el pool inicializado al controlador
const perfilController = new PerfilController();

const upload = multer({ dest: 'uploads/' });  // Carpeta temporal para almacenar las imágenes


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
  } catch (err) {
    if (err instanceof Error) {
      console.error("Error creando usuario:", err); 
      res.status(500).json({ message: 'Error al crear usuario', error: err.message });
    } else {
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
      expiresIn: '24h',  // proteccion de las rutas 
    });

    // Establecer sesión
    (req.session as any).userId = user.id;
    res.json({ message: 'Login exitoso', token, userId: user.id });
  } catch (err) {
    if (err instanceof Error) {
      console.error("Error creando usuario:", err);  
      res.status(500).json({ message: 'Error al iniciar sesión', error: err.message });
    } else {
      console.error("Error desconocido:", err);
      res.status(500).json({ message: 'Error desconocido al iniciar sesión' });
    }
  }
});

router.get('/perfil', async (req, res) => {
  const { userId } = req.query;  // Obtener el ID del usuario desde la consulta (query params)

  if (!userId) {
    return res.status(400).json({ message: 'ID de usuario no proporcionado.' });
  }

  try {
    const user = await query.getUserById(Number(userId));  // Convertimos a número
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado.' });
    }

    res.json(user);
  } catch (err) {
    if (err instanceof Error) {
      console.error("Error al obtener el perfil del usuario:", err);  
      res.status(500).json({ message: 'Error al obtener el perfil del usuario', error: err.message });
    } else {
      console.error("Error desconocido:", err);
      res.status(500).json({ message: 'Error desconocido al obtener el perfil del usuario' });
    }
  }
});



router.put('/update', upload.single('foto'), async (req, res) => {
  const { userId, nombre, correo, password } = req.body;  // Recibimos el id del usuario desde el body

  try {
    // Si se proporciona una nueva contraseña, la hasheamos; de lo contrario, dejamos password_hash como undefined
    const password_hash = password ? await bcrypt.hash(password, 10) : undefined;

    const user = { nombre, correo, password_hash };  // Asignamos undefined si no hay password
    await query.updateUser(userId, user);

    // Actualizar la foto de perfil si se proporciona
    if (req.file) {
      await perfilController.actualizarFotoPerfil(userId, req.file);
    }

    res.status(200).json({ message: 'Perfil actualizado con éxito' });
  } catch (err) {
    if (err instanceof Error) {
      console.error("Error Actualizando usuario:", err);  
      res.status(500).json({ message: 'Error al Actualizar usuario', error: err.message });
    } else {
      console.error("Error desconocido:", err);
      res.status(500).json({ message: 'Error desconocido al Actualizar usuario' });
    }
  }
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
  } catch (err) {
    if (err instanceof Error) {
      console.error("Error creando usuario:", err);  
      res.status(500).json({ message: 'Error al buscar usuario', error: err.message });
    } else {
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
  } catch (err) {
    if (err instanceof Error) {
      console.error("Error creando usuario:", err);  
      res.status(500).json({ message: 'Error al eliminar usuario', error: err.message });
    } else {
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
function authMiddleware(req: any, res: any, next: any) {
  if (req.session.userId) {
    next();
  } else {
    res.status(401).json({ message: 'No autorizado' });
  }
}

export default router;
