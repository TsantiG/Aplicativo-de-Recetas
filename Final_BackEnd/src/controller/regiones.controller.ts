import { getPool } from '../config/db.js'; 
import { Pool, ResultSetHeader } from 'mysql2/promise';
// controlador de regiones
class RegionesController {
    private pool: Pool;
  
    constructor() {
      this.pool = getPool(); 
    }
  
    async getAllRegiones() {
      const sql = "SELECT * FROM regiones";  // Consulta para obtener todas las regiones
      try {
        const [rows] = await this.pool.query(sql);
        return rows;
      } catch (err) {
        console.error("Error al obtener las regiones:", err);
        throw err;
      }
    }
  }
  
  export default RegionesController;
  