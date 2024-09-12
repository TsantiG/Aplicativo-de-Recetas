import { getPool } from '../config/db.js';
class ComentarRecetaController {
    pool;
    constructor() {
        this.pool = getPool();
    }
    // Agregar un comentario a una receta
    async comentarReceta(comentario) {
        const sql = `
      INSERT INTO comentarReceta (id_usuario, id_receta, comentario)
      VALUES (?, ?, ?)
    `;
        try {
            const [result] = await this.pool.query(sql, [
                comentario.id_usuario, comentario.id_receta, comentario.comentario
            ]);
            return result.insertId; // Retorna el ID del comentario
        }
        catch (err) {
            console.error("Error al agregar el comentario:", err);
            throw err;
        }
    }
    // Obtener todos los comentarios de una receta
    async getComentariosByReceta(id_receta) {
        const sql = `
      SELECT c.*, u.nombre as usuario_nombre 
      FROM comentarReceta c
      JOIN usuarios u ON c.id_usuario = u.id
      WHERE c.id_receta = ?
    `;
        try {
            const [rows] = await this.pool.query(sql, [id_receta]);
            return rows;
        }
        catch (err) {
            console.error("Error al obtener los comentarios de la receta:", err);
            throw err;
        }
    }
    // Eliminar un comentario por ID
    async deleteComentario(id) {
        const sql = "DELETE FROM comentarReceta WHERE id = ?";
        try {
            const [result] = await this.pool.query(sql, [id]);
            return result.affectedRows; // Retorna el número de filas eliminadas
        }
        catch (err) {
            console.error("Error al eliminar el comentario:", err);
            throw err;
        }
    }
}
export default ComentarRecetaController;
