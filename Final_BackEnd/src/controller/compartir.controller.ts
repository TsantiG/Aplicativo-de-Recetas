import { Pool, ResultSetHeader } from 'mysql2/promise';
import { getPool } from '../config/db.js';  // Asegúrate de que getPool esté configurado correctamente

class CompartirRecetasController {
  private pool: Pool;

  constructor() {
    this.pool = getPool();  // Inicializa el pool de conexiones
  }

  // Compartir una receta
  async compartirReceta(compartir: { id_usuario: number, id_receta: number, id_region: number, id_tipo: number }) {
    const sql = `
      INSERT INTO compartirRecetas (id_usuario, id_receta, id_region, id_tipo)
      VALUES (?, ?, ?, ?)
    `;
    try {
      const [result] = await this.pool.query<ResultSetHeader>(sql, [
        compartir.id_usuario, compartir.id_receta, compartir.id_region, compartir.id_tipo
      ]);
      return result.insertId;  // Retorna el ID de la receta compartida
    } catch (err) {
      console.error("Error al compartir la receta:", err);
      throw err;
    }
  }

  // Obtener todas las recetas compartidas
  async getAllCompartidas() {
    const sql = `
      SELECT cr.*, u.nombre as usuario_nombre, r.nombre as receta_nombre 
      FROM compartirRecetas cr
      JOIN usuarios u ON cr.id_usuario = u.id
      JOIN recetas r ON cr.id_receta = r.id
    `;
    try {
      const [rows] = await this.pool.query(sql);
      return rows;
    } catch (err) {
      console.error("Error al obtener las recetas compartidas:", err);
      throw err;
    }
  }

  // Obtener las recetas compartidas por un usuario
  async getCompartidasByUsuario(id_usuario: number) {
    const sql = `
      SELECT cr.*, r.nombre as receta_nombre 
      FROM compartirRecetas cr
      JOIN recetas r ON cr.id_receta = r.id
      WHERE cr.id_usuario = ?
    `;
    try {
      const [rows] = await this.pool.query(sql, [id_usuario]);
      return rows;
    } catch (err) {
      console.error("Error al obtener las recetas compartidas por el usuario:", err);
      throw err;
    }
  }

  // Eliminar una receta compartida
  async deleteCompartir(id: number) {
    const sql = "DELETE FROM compartirRecetas WHERE id = ?";
    try {
      const [result] = await this.pool.query<ResultSetHeader>(sql, [id]);
      return result.affectedRows;  // Retorna el número de filas eliminadas
    } catch (err) {
      console.error("Error al eliminar la receta compartida:", err);
      throw err;
    }
  }
}

export default CompartirRecetasController;
