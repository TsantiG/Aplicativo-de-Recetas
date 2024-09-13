import { Pool, ResultSetHeader } from 'mysql2/promise';
import { getPool } from '../config/db.js';
import { calificar } from '../interfaces/calificar.interface.js';

class CalificarRecetaController {
  private pool: Pool;

  constructor() {
    this.pool = getPool();
  }

  // Agregar una calificación a una receta
  async calificarReceta(calificacion: { id_usuario: number, id_receta: number, calificacion: number }) {
    const sql = `
      INSERT INTO calificarReceta (id_usuario, id_receta, calificacion)
      VALUES (?, ?, ?)
      ON DUPLICATE KEY UPDATE calificacion = VALUES(calificacion)
    `;
    try {
      const [result] = await this.pool.query<ResultSetHeader>(sql, [
        calificacion.id_usuario, calificacion.id_receta, calificacion.calificacion
      ]);
      return result.insertId;  // Retorna el ID de la calificación
    } catch (err) {
      console.error("Error al calificar la receta:", err);
      throw err;
    }
  }

  // Obtener todas las calificaciones de una receta
  async getCalificacionesByReceta(id_receta: number) {
    const sql = `
      SELECT c.*, u.nombre as usuario_nombre 
      FROM calificarReceta c
      JOIN usuarios u ON c.id_usuario = u.id
      WHERE c.id_receta = ?
    `;
    try {
      const [rows] = await this.pool.query(sql, [id_receta]);
      return rows;
    } catch (err) {
      console.error("Error al obtener las calificaciones de la receta:", err);
      throw err;
    }
  }

  // Obtener la calificación promedio de una receta
  async getPromedioCalificacion(id_receta: number) {
    const sql = `
      SELECT AVG(calificacion) as promedio_calificacion
      FROM calificarReceta
      WHERE id_receta = ?
    `;
    try {
      const [rows] = await this.pool.query<calificar[]>(sql, [id_receta]);
      return rows[0].promedio_calificacion;
    } catch (err) {
      console.error("Error al obtener la calificación promedio:", err);
      throw err;
    }
  }

  async getCalificarById(id: number):Promise<calificar | null>{
    const sql = "SELECT * FROM calificarReceta WHERE id = ?";
    try {
      const [rows] = await this.pool.query<calificar[]>(sql, [id]);
      if (rows.length === 0) {
        throw new Error('calificaion no encontrada');
      }
      return rows[0] || null;
    } catch (err) {
      console.error("Error al obtener la calificacion:", err);
      throw err;
    }
  }

  // Eliminar una calificación por ID
  async deleteCalificacion(id: number) {
    const sql = "DELETE FROM calificarReceta WHERE id = ?";
    try {
      const [result] = await this.pool.query<ResultSetHeader>(sql, [id]);
      return result.affectedRows;  // Retorna el número de filas eliminadas
    } catch (err) {
      console.error("Error al eliminar la calificación:", err);
      throw err;
    }
  }
}

export default CalificarRecetaController;
