import { Router } from 'express';
import pool from '../config/db';

const router = Router();

// Obtener todas las recetas
router.get('/recetas', async (req, res) => {
  const [rows] = await pool.query('SELECT * FROM recetas');
  res.json(rows);
});

// Crear una receta
router.post('/recetas', async (req, res) => {
  const { nombre, descripcion, instrucciones, ingredientes, imagen_url, video_url, id_usuario } = req.body;
  
  await pool.query(
    'INSERT INTO recetas (nombre, descripcion, instrucciones, ingredientes, imagen_url, video_url, id_usuario) VALUES (?, ?, ?, ?, ?, ?, ?)',
    [nombre, descripcion, instrucciones, ingredientes, imagen_url, video_url, id_usuario]
  );
  
  res.json({ message: 'Receta creada' });
});

// Actualizar una receta
router.put('/recetas/:id', async (req, res) => {
  const { id } = req.params;
  const { nombre, descripcion, instrucciones, ingredientes, imagen_url, video_url } = req.body;
  
  await pool.query(
    'UPDATE recetas SET nombre = ?, descripcion = ?, instrucciones = ?, ingredientes = ?, imagen_url = ?, video_url = ? WHERE id = ?',
    [nombre, descripcion, instrucciones, ingredientes, imagen_url, video_url, id]
  );
  
  res.json({ message: 'Receta actualizada' });
});

// Eliminar una receta
router.delete('/recetas/:id', async (req, res) => {
  const { id } = req.params;
  
  await pool.query('DELETE FROM recetas WHERE id = ?', [id]);
  res.json({ message: 'Receta eliminada' });
});

export default router;
