import express from 'express';
import RecetasController from '../controller/recetas.controller.js';
const router = express.Router();
const recetasController = new RecetasController();
// Crear una nueva receta
router.post('/create', async (req, res) => {
    const receta = req.body;
    try {
        const recetaId = await recetasController.createReceta(receta);
        res.status(201).json({ message: 'Receta creada con éxito', recetaId });
    }
    catch (err) {
        if (err instanceof Error) {
            console.error("Error creando la receta:", err);
            res.status(500).json({ message: 'Error al crear la receta', error: err.message });
        }
        else {
            console.error("Error desconocido:", err);
            res.status(500).json({ message: 'Error desconocido al crear la receta' });
        }
    }
});
// Obtener todas las recetas
router.get('/all', async (req, res) => {
    try {
        const recetas = await recetasController.getAllRecetas();
        res.json(recetas);
    }
    catch (err) {
        if (err instanceof Error) {
            console.error("Error al buscar todas las recetas:", err);
            res.status(500).json({ message: 'Error al buscar todas las recetas', error: err.message });
        }
        else {
            console.error("Error desconocido:", err);
            res.status(500).json({ message: 'Error desconocido al buscar todas las recetas' });
        }
    }
});
// Obtener una receta por ID
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const receta = await recetasController.getRecetaById(Number(id));
        res.json(receta);
    }
    catch (err) {
        if (err instanceof Error) {
            console.error("Error al buscar la receta por id:", err);
            res.status(500).json({ message: 'Error al buscar la receta por id', error: err.message });
        }
        else {
            console.error("Error desconocido:", err);
            res.status(500).json({ message: 'Error desconocido al buscar la receta por id' });
        }
    }
});
// Actualizar una receta
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const receta = req.body;
    try {
        const updatedRows = await recetasController.updateReceta(Number(id), receta);
        if (updatedRows === 0) {
            res.status(404).json({ message: 'Receta no encontrada' });
        }
        else {
            res.json({ message: 'Receta actualizada con éxito' });
        }
    }
    catch (err) {
        if (err instanceof Error) {
            console.error("Error al actualizar recetas:", err);
            res.status(500).json({ message: 'Error al actualizar recetas', error: err.message });
        }
        else {
            console.error("Error desconocido:", err);
            res.status(500).json({ message: 'Error desconocido al actualizar recetas' });
        }
    }
});
// Eliminar una receta
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const deletedRows = await recetasController.deleteReceta(Number(id));
        if (deletedRows === 0) {
            res.status(404).json({ message: 'Receta no encontrada' });
        }
        else {
            res.json({ message: 'Receta eliminada con éxito' });
        }
    }
    catch (err) {
        if (err instanceof Error) {
            console.error("Error al eliminar receta:", err);
            res.status(500).json({ message: 'Error al eliminar receta', error: err.message });
        }
        else {
            console.error("Error desconocido:", err);
            res.status(500).json({ message: 'Error desconocido al eliminar receta' });
        }
    }
});
export default router;
