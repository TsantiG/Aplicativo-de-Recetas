import { Pool, ResultSetHeader } from 'mysql2/promise';
import { getPool } from '../config/db.js';
import { Comentar } from '../interfaces/comentar.interface.js';

class ComentarRecetaController {
  private pool: Pool;

  constructor() {
    this.pool = getPool();
  }

  // Agregar un comentario a una receta
  async comentarReceta(comentario: { id_usuario: number, id_receta: number, comentario: string }) {
    const sql = `
      INSERT INTO comentarReceta (id_usuario, id_receta, comentario)
      VALUES (?, ?, ?)
    `;
    try {
      const [result] = await this.pool.query<ResultSetHeader>(sql, [
        comentario.id_usuario, comentario.id_receta, comentario.comentario
      ]);
      return result.insertId;  // Retorna el ID del comentario
    } catch (err) {
      console.error("Error al agregar el comentario:", err);
      throw err;
    }
  }

  // Obtener todos los comentarios de una receta
  async getComentariosByReceta(id_receta: number) {
    const sql = `
      SELECT c.*, u.nombre as usuario_nombre 
      FROM comentarReceta c
      JOIN usuarios u ON c.id_usuario = u.id
      WHERE c.id_receta = ?
    `;
    try {
      const [rows] = await this.pool.query(sql, [id_receta]);
      return rows;
    } catch (err) {
      console.error("Error al obtener los comentarios de la receta:", err);
      throw err;
    }
  }
  async getComentarById(id: number):Promise<Comentar | null>{
    const sql = "SELECT * FROM comentarReceta WHERE id = ?";
    try {
      const [rows] = await this.pool.query<Comentar[]>(sql, [id]);
      if (rows.length === 0) {
        throw new Error('comentario compartido no encontrado');
      }
      return rows[0] || null;
    } catch (err) {
      console.error("Error al obtener el comentario:", err);
      throw err;
    }
  }

  // Eliminar un comentario por ID
  async deleteComentario(id: number) {
    const sql = "DELETE FROM comentarReceta WHERE id = ?";
    try {
      const [result] = await this.pool.query<ResultSetHeader>(sql, [id]);
      return result.affectedRows;  // Retorna el número de filas eliminadas
    } catch (err) {
      console.error("Error al eliminar el comentario:", err);
      throw err;
    }
  }
}

export default ComentarRecetaController;
