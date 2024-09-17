// ruta para regiones
import express from 'express';
import RegionesController from '../controller/regiones.controller.js';
import TiposController from '../controller/tipos.controller.js';
const router = express.Router();
const regionesController = new RegionesController();
const tiposController = new TiposController();
router.get('/regiones', async (req, res) => {
    try {
        const regiones = await regionesController.getAllRegiones();
        res.json(regiones);
    }
    catch (err) {
        console.error("Error al obtener las regiones:", err);
        res.status(500).json({ message: 'Error al obtener las regiones' });
    }
});
router.get('/tipos', async (req, res) => {
    try {
        const tipos = await tiposController.getAllTipos();
        res.json(tipos);
    }
    catch (err) {
        console.error("Error al obtener los tipos:", err);
        res.status(500).json({ message: 'Error al obtener los tipos' });
    }
});
export default router;
