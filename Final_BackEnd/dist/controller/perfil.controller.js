import { getPool } from '../config/db.js';
import cloudinary from '../config/cloudinaryConfig.js';
class PerfilController {
    pool;
    constructor() {
        this.pool = getPool();
    }
    // Actualizar la foto de perfil del usuario
    async actualizarFotoPerfil(id_usuario, file) {
        try {
            // Subir la imagen a Cloudinary
            const result = await cloudinary.uploader.upload(file.path, {
                folder: 'usuarios_perfiles',
            });
            const url_foto = result.secure_url;
            // Actualizar o insertar la URL de la foto en la tabla usuarios_fotos
            const sql = `
        INSERT INTO usuarios_fotos (id_usuario, url_foto) 
        VALUES (?, ?)
        ON DUPLICATE KEY UPDATE url_foto = VALUES(url_foto)
      `;
            const [resultInsert] = await this.pool.query(sql, [id_usuario, url_foto]);
            return resultInsert.affectedRows;
        }
        catch (err) {
            console.error('Error al actualizar la foto de perfil:', err);
            throw err;
        }
    }
}
export default PerfilController;
