import express from 'express';
import ComentarRecetaController from '../controller/comentar.controller.js';
import authMiddleware from '../middleware/authMiddleware.js'; 
const router = express.Router();
const comentarController = new ComentarRecetaController();



// Comentar una receta
router.post('/comentar', authMiddleware, async (req, res) => {
  const {  id_receta, comentario } = req.body;
  const id_usuario = (req as any).userId;
  try {
    const comentarioId = await comentarController.comentarReceta({ id_usuario, id_receta, comentario });
    res.status(201).json({ message: 'Comentario agregado con éxito', comentarioId });
  } catch (err) {
    if (err instanceof Error) {
        console.error("Error al agregar comentario:", err); 
        res.status(500).json({ message: 'Error al agregar comentario', error: err.message });
      } else {
        console.error("Error desconocido:", err);
        res.status(500).json({ message: 'Error desconocido al agregar comentario' });
      }
  }
});

// Obtener comentarios de una receta
router.get('/receta/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const comentarios = await comentarController.getComentariosByReceta(Number(id));
    res.json(comentarios);
  } catch (err) {
    if (err instanceof Error) {
        console.error("Error al buscar comentario:", err); 
        res.status(500).json({ message: 'Error al buscar comentario', error: err.message });
      } else {
        console.error("Error desconocido:", err);
        res.status(500).json({ message: 'Error desconocido al buscar comentario' });
      }
  }
});

// Eliminar un comentario
router.delete('/:id', authMiddleware, async (req, res) => {
  const { id } = req.params;
  const id_usuario = (req as any).userId;
  try {
    const comentarioExistente = await comentarController.getComentarById(Number(id));

    if (!comentarioExistente) {
      return res.status(404).json({ message: 'Receta no encontrada' });
    }

    if (comentarioExistente.id_usuario !== id_usuario) {
      return res.status(403).json({ message: 'No tienes permiso para eliminar esta calificación' });
    }
    const deletedRows = await comentarController.deleteComentario(Number(id));
    if (deletedRows === 0) {
      res.status(404).json({ message: 'Comentario no encontrado' });
    } else {
      res.json({ message: 'Comentario eliminado con éxito' });
    }
  } catch (err) {
    if (err instanceof Error) {
        console.error("Error al eliminar comentario:", err); 
        res.status(500).json({ message: 'Error al eliminar comentario', error: err.message });
      } else {
        console.error("Error desconocido:", err);
        res.status(500).json({ message: 'Error desconocido al eliminar comentario' });
      }
  }
});

export default router;
