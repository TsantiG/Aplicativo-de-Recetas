import { Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import pool from '../config/db';
import { Usuario } from '../interfaces/login.interface';


const router = Router();

// Registro de usuario
router.post('/register', async (req, res) => {
  const { nombre, correo, password } = req.body;

  // Cifrar la contraseña
  const hashedPassword = await bcrypt.hash(password, 10);
  const [result] = await pool.query(
    'INSERT INTO usuarios (nombre, correo, password_hash) VALUES (?, ?, ?)',
    [nombre, correo, hashedPassword]
  );
  
  res.json({ message: 'Usuario registrado correctamente' });
});

// Login de usuario
router.post('/login', async (req, res) => {
  const { correo, password } = req.body;
  
  const [rows] = await pool.query<Usuario[]>('SELECT * FROM usuarios WHERE correo = ?', [correo]);
  const user = rows[0];
  
  if (!user) {
    return res.status(400).json({ message: 'Correo o contraseña incorrectos' });
  }
  
  const validPassword = await bcrypt.compare(password, user.password_hash);
  if (!validPassword) {
    return res.status(400).json({ message: 'Correo o contraseña incorrectos' });
  }

  // Aqui puede a ver un error que no he podido solucionar para que lo tenga en cuenta ------------------------!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  const jwtSecret = process.env.JWT_SECRET;

  if (!jwtSecret) {
    throw new Error('JWT_SECRET no está definido en las variables de entorno');
  }
  
  const token = jwt.sign({ id: user.id }, jwtSecret, { expiresIn: '1h' });
  res.json({ token });
  
  // const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  // res.json({ token });
  });

export default router;
