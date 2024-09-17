import { getPool } from '../config/db.js'; 
import { Pool, ResultSetHeader } from 'mysql2/promise';
// controlador de tipos
class TiposController {
    private pool: Pool;
  
    constructor() {
      this.pool = getPool(); 
    }
  
    async getAllTipos() {
      const sql = "SELECT * FROM tipos";  // Consulta para obtener todos los tipos
      try {
        const [rows] = await this.pool.query(sql);
        return rows;
      } catch (err) {
        console.error("Error al obtener los tipos:", err);
        throw err;
      }
    }
  }
  
  export default TiposController;
  