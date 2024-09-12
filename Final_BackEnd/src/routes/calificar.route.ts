import express from 'express';
import CalificarRecetaController from '../controller/calificar.controller.js';

const router = express.Router();
const calificarController = new CalificarRecetaController();

// Calificar una receta
router.post('/calificar', async (req, res) => {
  const { id_usuario, id_receta, calificacion } = req.body;
  if (calificacion < 1 || calificacion > 5) {
    return res.status(400).json({ message: 'La calificación debe estar entre 1 y 5' });
  }
  try {
    const calificacionId = await calificarController.calificarReceta({ id_usuario, id_receta, calificacion });
    res.status(201).json({ message: 'Receta calificada con éxito', calificacionId });
  } catch (err) {
    if (err instanceof Error) {
        console.error("Error al calificar una receta:", err); 
        res.status(500).json({ message: 'Error al calificar una receta', error: err.message });
      } else {
        console.error("Error desconocido:", err);
        res.status(500).json({ message: 'Error desconocido al calificar una receta' });
      }
  }
});

// Obtener todas las calificaciones de una receta
router.get('/receta/:id/calificaciones', async (req, res) => {
  const { id } = req.params;
  try {
    const calificaciones = await calificarController.getCalificacionesByReceta(Number(id));
    res.json(calificaciones);
  } catch (err) {
    if (err instanceof Error) {
        console.error("Error al buscar todas las recetas:", err); 
        res.status(500).json({ message: 'Error al buscar todas recetas', error: err.message });
      } else {
        console.error("Error desconocido:", err);
        res.status(500).json({ message: 'Error desconocido al buscar todasd recetas' });
      }
  }
});

// Obtener la calificación promedio de una receta
router.get('/receta/:id/promedio', async (req, res) => {
  const { id } = req.params;
  try {
    const promedioCalificacion = await calificarController.getPromedioCalificacion(Number(id));
    res.json({ promedioCalificacion });
  } catch (err) {
    if (err instanceof Error) {
        console.error("Error al obtener un promedio de calificacion:", err); 
        res.status(500).json({ message: 'Error al obtener un promedio de calificacion', error: err.message });
      } else {
        console.error("Error desconocido:", err);
        res.status(500).json({ message: 'Error desconocido al obtener un promedio de calificacion' });
      }
  }
});

// Eliminar una calificación
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const deletedRows = await calificarController.deleteCalificacion(Number(id));
    if (deletedRows === 0) {
      res.status(404).json({ message: 'Calificación no encontrada' });
    } else {
      res.json({ message: 'Calificación eliminada con éxito' });
    }
  } catch (err) {
    if (err instanceof Error) {
        console.error("Error al eliminar una calificacion:", err); 
        res.status(500).json({ message: 'Error al eliminar una calificacion', error: err.message });
      } else {
        console.error("Error desconocido:", err);
        res.status(500).json({ message: 'Error desconocido al eliminar una calificacion' });
      }
  }
});

export default router;
