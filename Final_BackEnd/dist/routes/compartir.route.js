import express from 'express';
import CompartirRecetasController from '../controller/compartir.controller.js';
import authMiddleware from '../middleware/authMiddleware.js';
const router = express.Router();
const compartirController = new CompartirRecetasController();
// Compartir una receta
router.post('/compartir', authMiddleware, async (req, res) => {
    const id_usuario = req.userId; // El ID de usuario autenticado debería estar disponible aquí
    const { id_receta, id_region, id_tipo } = req.body;
    try {
        const compartirId = await compartirController.compartirReceta({
            id_usuario, // Asegúrate de pasar el ID del usuario autenticado
            id_receta,
            id_region,
            id_tipo
        });
        res.status(201).json({ message: 'Receta compartida con éxito', compartirId });
    }
    catch (err) {
        if (err instanceof Error) {
            console.error("Error al compartir receta:", err);
            res.status(500).json({ message: 'Error al compartir receta', error: err.message });
        }
        else {
            console.error("Error desconocido:", err);
            res.status(500).json({ message: 'Error desconocido al compartir receta' });
        }
    }
});
// Obtener todas las recetas compartidas
router.get('/compartidas', async (req, res) => {
    try {
        const recetasCompartidas = await compartirController.getAllCompartidas();
        res.json(recetasCompartidas);
    }
    catch (err) {
        if (err instanceof Error) {
            console.error("Error al buscar todas las recetas compartidas:", err);
            res.status(500).json({ message: 'Error  al buscar todas las recetas compartidas', error: err.message });
        }
        else {
            console.error("Error desconocido:", err);
            res.status(500).json({ message: 'Error desconocido  al buscar todas las recetas compartidas' });
        }
    }
});
// Obtener las recetas compartidas por un usuario
router.get('/usuario/:id', authMiddleware, async (req, res) => {
    const { id } = req.params;
    try {
        const recetasCompartidas = await compartirController.getCompartidasByUsuario(Number(id));
        res.json(recetasCompartidas);
    }
    catch (err) {
        if (err instanceof Error) {
            console.error("Error  al buscar la receta compartida:", err);
            res.status(500).json({ message: 'Error   al buscar la receta compartida', error: err.message });
        }
        else {
            console.error("Error desconocido:", err);
            res.status(500).json({ message: 'Error desconocido  al buscar la receta compartida' });
        }
    }
});
// Eliminar una receta compartida
router.delete('/:id', authMiddleware, async (req, res) => {
    const { id } = req.params;
    const userId = req.userId;
    try {
        const recetaExistente = await compartirController.getCompartidasById(Number(id));
        if (!recetaExistente) {
            return res.status(404).json({ message: 'Receta no encontrada' });
        }
        if (recetaExistente.id_usuario !== userId) {
            return res.status(403).json({ message: 'No tienes permiso para eliminar esta calificación' });
        }
        const deletedRows = await compartirController.deleteCompartir(Number(id));
        if (deletedRows === 0) {
            res.status(404).json({ message: 'Receta compartida no encontrada' });
        }
        else {
            res.json({ message: 'Receta compartida eliminada con éxito' });
        }
    }
    catch (err) {
        if (err instanceof Error) {
            console.error("Error al dejar de compartir la receta:", err);
            res.status(500).json({ message: 'Error al dejar de compartir la receta', error: err.message });
        }
        else {
            console.error("Error desconocido:", err);
            res.status(500).json({ message: 'Error desconocido al dejar de compartir la receta' });
        }
    }
});
export default router;
