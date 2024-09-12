import express from 'express';
import multer from 'multer';
import cloudinary from '../config/cloudinaryConfig.js';  // Configuración de Cloudinary
import { getPool } from '../config/db.js';  // Importar la conexión a la base de datos

const router = express.Router();
const upload = multer({ dest: 'uploads/' }); // Configuración de multer

// Ruta para subir la foto de perfil
router.post('/upload/profile', upload.single('image'), async (req, res) => {
  const { idUsuario } = req.body;
  const file = req.file;  // TypeScript ahora sabe que req.file existe

  if (!file || !idUsuario) {
    return res.status(400).json({ message: 'Falta la imagen o el ID del usuario' });
  }

  try {
    // Subimos la imagen a Cloudinary
    const result = await cloudinary.uploader.upload(file.path, {
      folder: 'usuarios_perfil',
    });

    // Guardar la URL de la imagen en la base de datos
    const pool = getPool();
    const query = 'INSERT INTO usuarios_fotos (id_usuario, url_foto) VALUES (?, ?)';
    await pool.query(query, [idUsuario, result.secure_url]);

    res.status(201).json({ message: 'Imagen subida con éxito', url: result.secure_url });
  } catch (err) {
    if (err instanceof Error) {
        console.error("Error subiendo la imagen:", err);  // Registrar el error completo
        res.status(500).json({ message: 'Error al subir la imagen', error: err.message });
      } else {
        console.error("Error desconocido:", err);
        res.status(500).json({ message: 'Error desconocido al subir la imagen' });
      }
    }
});

export default router;
