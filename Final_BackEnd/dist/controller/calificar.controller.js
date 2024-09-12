import { getPool } from '../config/db.js';
class CalificarRecetaController {
    pool;
    constructor() {
        this.pool = getPool();
    }
    // Agregar una calificación a una receta
    async calificarReceta(calificacion) {
        const sql = `
      INSERT INTO calificarReceta (id_usuario, id_receta, calificacion)
      VALUES (?, ?, ?)
      ON DUPLICATE KEY UPDATE calificacion = VALUES(calificacion)
    `;
        try {
            const [result] = await this.pool.query(sql, [
                calificacion.id_usuario, calificacion.id_receta, calificacion.calificacion
            ]);
            return result.insertId; // Retorna el ID de la calificación
        }
        catch (err) {
            console.error("Error al calificar la receta:", err);
            throw err;
        }
    }
    // Obtener todas las calificaciones de una receta
    async getCalificacionesByReceta(id_receta) {
        const sql = `
      SELECT c.*, u.nombre as usuario_nombre 
      FROM calificarReceta c
      JOIN usuarios u ON c.id_usuario = u.id
      WHERE c.id_receta = ?
    `;
        try {
            const [rows] = await this.pool.query(sql, [id_receta]);
            return rows;
        }
        catch (err) {
            console.error("Error al obtener las calificaciones de la receta:", err);
            throw err;
        }
    }
    // Obtener la calificación promedio de una receta
    async getPromedioCalificacion(id_receta) {
        const sql = `
      SELECT AVG(calificacion) as promedio_calificacion
      FROM calificarReceta
      WHERE id_receta = ?
    `;
        try {
            const [rows] = await this.pool.query(sql, [id_receta]);
            return rows[0].promedio_calificacion;
        }
        catch (err) {
            console.error("Error al obtener la calificación promedio:", err);
            throw err;
        }
    }
    // Eliminar una calificación por ID
    async deleteCalificacion(id) {
        const sql = "DELETE FROM calificarReceta WHERE id = ?";
        try {
            const [result] = await this.pool.query(sql, [id]);
            return result.affectedRows; // Retorna el número de filas eliminadas
        }
        catch (err) {
            console.error("Error al eliminar la calificación:", err);
            throw err;
        }
    }
}
export default CalificarRecetaController;
