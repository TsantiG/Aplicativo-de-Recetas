import express from 'express';
import RecetasController from '../controller/recetas.controller.js';
import authMiddleware from '../middleware/authMiddleware.js'; 
import cloudinary from '../config/cloudinaryConfig.js';
import multer from 'multer';
const upload = multer({ dest: 'uploads/' });  // Carpeta temporal para almacenar las imágenes


const router = express.Router();
const recetasController = new RecetasController();

// Crear una nueva receta
router.post('/create', authMiddleware, upload.single('imagen'), async (req, res) => {
  const id_usuario = (req as any).userId;
  const { nombre, descripcion, ingredientes, instrucciones } = req.body;

  let imagen_url = '';

  try {
    // Subir imagen a Cloudinary
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: 'recetas',
      });
      imagen_url = result.secure_url;
    }

    const receta = {
      nombre,
      descripcion,
      ingredientes,
      instrucciones,
      imagen_url,  // URL de la imagen subida
      video_url: '',  // Por el momento no hay video
      id_usuario,
    };

    const recetaId = await recetasController.createReceta(receta);
    res.status(201).json({ message: 'Receta creada con éxito', recetaId });
  } catch (err) {
    if (err instanceof Error) {
      console.error("Error creando la receta:", err); 
      res.status(500).json({ message: 'Error al crear la receta', error: err.message });
    } else {
      console.error("Error desconocido:", err);
      res.status(500).json({ message: 'Error desconocido al crear la receta' });
    }
  }
});


// Obtener todas las recetas
router.get('/all',authMiddleware,  async (req, res) => {
  try {
    const recetas = await recetasController.getAllRecetas();
    res.json(recetas);
  } catch (err) {
    if (err instanceof Error) {
        console.error("Error al buscar todas las recetas:", err); 
        res.status(500).json({ message: 'Error al buscar todas las recetas', error: err.message });
      } else {
        console.error("Error desconocido:", err);
        res.status(500).json({ message: 'Error desconocido al buscar todas las recetas' });
      }
    }
});

// Obtener una receta por ID
router.get('/:id',authMiddleware, async (req, res) => {
  const { id } = req.params;
  try {
    const receta = await recetasController.getRecetaById(Number(id));
    res.json(receta);
  } catch (err) {
    if (err instanceof Error) {
        console.error("Error al buscar la receta por id:", err); 
        res.status(500).json({ message: 'Error al buscar la receta por id', error: err.message });
      } else {
        console.error("Error desconocido:", err);
        res.status(500).json({ message: 'Error desconocido al buscar la receta por id' });
      }
  }
});

// Obtener todas las recetas por ID dce usuario
router.get('/usuario/recetas', authMiddleware, async (req, res) => {

  const userId = (req as any).userId; 
  
  if (!userId || isNaN(userId)) {
    return res.status(400).json({ message: 'El ID de usuario es inválido o no está autenticado' });
  }

  try {
    const recetas = await recetasController.getRecetasByUsuario(userId);
    if (recetas.length === 0) {
      return res.status(404).json({ message: 'No se encontraron recetas para este usuario.' });
    }
    res.json(recetas);
  } catch (err) {
    if (err instanceof Error) {
        console.error("Error al buscar la receta por id:", err); 
        res.status(500).json({ message: 'Error al buscar la receta por id', error: err.message });
      } else {
        console.error("Error desconocido:", err);
        res.status(500).json({ message: 'Error desconocido al buscar la receta por id' });
      }
  }
});


// Actualizar una receta
router.put('/:id', authMiddleware, async (req, res) => {
  const { id } = req.params;
  const receta = req.body;
  const userId = (req as any).userId;  

  try {
    const recetaExistente = await recetasController.getRecetaById(Number(id));

    if (!recetaExistente) {
      return res.status(404).json({ message: 'Receta no encontrada' });
    }

    // Verificar si el usuario es el dueño de la receta
    if (recetaExistente.id_usuario !== userId) {
      return res.status(403).json({ message: 'No tienes permiso para editar esta receta' });
    }

    // Actualizar la receta si el usuario es el dueño
    const updatedRows = await recetasController.updateReceta(Number(id), receta);
    
    if (updatedRows === 0) {
      return res.status(404).json({ message: 'Receta no encontrada' });
    } else {
      res.json({ message: 'Receta actualizada con éxito' });
    }
  } catch (err) {
    if (err instanceof Error) {
      console.error("Error al actualizar receta:", err);
      res.status(500).json({ message: 'Error al actualizar receta', error: err.message });
    } else {
      console.error("Error desconocido:", err);
      res.status(500).json({ message: 'Error desconocido al actualizar receta' });
    }
  }
});


// Eliminar una receta
router.delete('/:id',authMiddleware, async (req, res) => {
  const { id } = req.params;
  const userId = (req as any).userId;
  try {
    const recetaExistente = await recetasController.getRecetaById(Number(id));

    if (!recetaExistente) {
      return res.status(404).json({ message: 'Receta no encontrada' });
    }

    if (recetaExistente.id_usuario !== userId) {
      return res.status(403).json({ message: 'No tienes permiso para eliminar esta calificación' });
    }

    const deletedRows = await recetasController.deleteReceta(Number(id));
    if (deletedRows === 0) {
      res.status(404).json({ message: 'Receta no encontrada' });
    } else {
      res.json({ message: 'Receta eliminada con éxito' });
    }
  } catch (err) {
    if (err instanceof Error) {
        console.error("Error al eliminar receta:", err); 
        res.status(500).json({ message: 'Error al eliminar receta', error: err.message });
      } else {
        console.error("Error desconocido:", err);
        res.status(500).json({ message: 'Error desconocido al eliminar receta' });
      }
  }
});

export default router;
