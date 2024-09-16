import { Pool, ResultSetHeader } from 'mysql2/promise';
import { getPool } from '../config/db.js';  // Asegúrate de que getPool esté correctamente configurado
import { Receta }  from '../interfaces/recetas.interface.js';
 

class RecetasController {
  private pool: Pool;

  constructor() {
    this.pool = getPool();  // Inicializa el pool de conexiones
  }

  // Crear una nueva receta
    async createReceta(receta: {
      nombre: string,
      descripcion: string,
      ingredientes: string,
      instrucciones: string,
      imagen_url: string,
      video_url: string,
      id_usuario: number
    }) {
      const sql = `
        INSERT INTO recetas (nombre, descripcion, ingredientes, instrucciones, imagen_url, video_url, id_usuario)
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `;
  
      try {
        const [result] = await this.pool.execute(sql, [
          receta.nombre,
          receta.descripcion,
          receta.ingredientes,
          receta.instrucciones,
          receta.imagen_url,
          receta.video_url,
          receta.id_usuario
        ]);
        return result;
      } catch (err) {
        console.error('Error al crear la receta:', err);
        throw err;  // Lanzar el error para que sea capturado en la ruta
      }
    }
  
  
  
  // Obtener todas las recetas
  async getAllRecetas() {
    const sql = "SELECT * FROM recetas";
    try {
      const [rows] = await this.pool.query(sql);
      return rows;
    } catch (err) {
      console.error("Error al obtener las recetas:", err);
      throw err;
    }
  }

  // Obtener una receta por ID
  async getRecetaById(id: number):Promise<Receta | null>{
    const sql = "SELECT * FROM recetas WHERE id = ?";
    try {
      const [rows] = await this.pool.query<Receta[]>(sql, [id]);
      if (rows.length === 0) {
        throw new Error('Receta no encontrada');
      }
      return rows[0] || null;
    } catch (err) {
      console.error("Error al obtener la receta:", err);
      throw err;
    }
  }

  // Actualizar una receta
  async updateReceta(id: number, receta: { nombre?: string, descripcion?: string, instrucciones?: string, ingredientes?: string, imagen_url?: string, video_url?: string }) {
    const sql = `
      UPDATE recetas
      SET nombre = ?, descripcion = ?, instrucciones = ?, ingredientes = ?, imagen_url = ?, video_url = ?
      WHERE id = ?
    `;
    try {
      const [result] = await this.pool.query<ResultSetHeader>(sql, [
        receta.nombre, receta.descripcion, receta.instrucciones, receta.ingredientes, receta.imagen_url, receta.video_url, id
      ]);
      return result.affectedRows;  // Retorna el número de filas afectadas
    } catch (err) {
      console.error("Error al actualizar la receta:", err);
      throw err;
    }
  }
// Obtener todas las recetas de un usuario específico
async getRecetasByUsuario(id_usuario: number) {
  const sql = `
    SELECT * FROM recetas 
    WHERE id_usuario = ?
  `;
  try {
    const [rows] = await this.pool.query<Receta[]>(sql, [id_usuario]);
    return rows;
  } catch (err) {
    console.error("Error al obtener las recetas del usuario:", err);
    throw err;
  }
}



  // Eliminar una receta por ID
  async deleteReceta(id: number) {
    const sql = "DELETE FROM recetas WHERE id = ?";
    try {
      const [result] = await this.pool.query<ResultSetHeader>(sql, [id]);
      return result.affectedRows;  // Retorna el número de filas eliminadas
    } catch (err) {
      console.error("Error al eliminar la receta:", err);
      throw err;
    }
  }
}

export default RecetasController;
