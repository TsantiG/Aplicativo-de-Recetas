import express from 'express';
import ComentarRecetaController from '../controller/comentar.controller.js';

const router = express.Router();
const comentarController = new ComentarRecetaController();

// Comentar una receta
router.post('/comentar', async (req, res) => {
  const { id_usuario, id_receta, comentario } = req.body;
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
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
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
