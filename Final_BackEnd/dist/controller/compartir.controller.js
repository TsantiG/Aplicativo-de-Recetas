import { getPool } from '../config/db.js'; // Asegúrate de que getPool esté configurado correctamente
class CompartirRecetasController {
    pool;
    constructor() {
        this.pool = getPool(); // Inicializa el pool de conexiones
    }
    // Compartir una receta
    async compartirReceta(compartir) {
        const sql = `
      INSERT INTO compartirRecetas (id_usuario, id_receta, id_region, id_tipo)
      VALUES (?, ?, ?, ?)
    `;
        try {
            const [result] = await this.pool.query(sql, [
                compartir.id_usuario, compartir.id_receta, compartir.id_region, compartir.id_tipo
            ]);
            return result.insertId; // Retorna el ID de la receta compartida
        }
        catch (err) {
            console.error("Error al compartir la receta:", err);
            throw err;
        }
    }
    // Obtener todas las recetas compartidas
    async getAllCompartidas() {
        const sql = `
      SELECT cr.*, 
       u.nombre AS usuario_nombre, 
       r.nombre AS receta_nombre, 
       r.descripcion, 
       r.instrucciones, 
       r.ingredientes, 
       r.imagen_url, 
       r.video_url, 
       t.tipo AS tipo_receta, 
       rg.region AS region_receta
FROM compartirRecetas cr
JOIN usuarios u ON cr.id_usuario = u.id
JOIN recetas r ON cr.id_receta = r.id
JOIN tipos t ON cr.id_tipo = t.id
JOIN regiones rg ON cr.id_region = rg.id;
    `;
        try {
            const [rows] = await this.pool.query(sql);
            return rows;
        }
        catch (err) {
            console.error("Error al obtener las recetas compartidas:", err);
            throw err;
        }
    }
    // Obtener las recetas compartidas por un usuario
    async getCompartidasByUsuario(id_usuario) {
        const sql = `
    SELECT cr.*, 
           r.nombre AS receta_nombre, 
           r.imagen_url,
           t.tipo AS tipo_receta, 
           rg.region AS region_receta 
    FROM compartirRecetas cr
    JOIN recetas r ON cr.id_receta = r.id
    JOIN tipos t ON cr.id_tipo = t.id
    JOIN regiones rg ON cr.id_region = rg.id
    WHERE cr.id_usuario = ?
  `;
        try {
            const [rows] = await this.pool.query(sql, [id_usuario]);
            return rows;
        }
        catch (err) {
            console.error("Error al obtener las recetas compartidas por el usuario:", err);
            throw err;
        }
    }
    async getCompartidasById(id) {
        const sql = "SELECT * FROM compartirRecetas WHERE id = ?";
        try {
            const [rows] = await this.pool.query(sql, [id]);
            if (rows.length === 0) {
                throw new Error('Receta compartida no encontrada');
            }
            return rows[0] || null;
        }
        catch (err) {
            console.error("Error al obtener la receta compartida:", err);
            throw err;
        }
    }
    // Eliminar una receta compartida
    async deleteCompartir(id) {
        const sql = "DELETE FROM compartirRecetas WHERE id = ?";
        try {
            const [result] = await this.pool.query(sql, [id]);
            return result.affectedRows; // Retorna el número de filas eliminadas
        }
        catch (err) {
            console.error("Error al eliminar la receta compartida:", err);
            throw err;
        }
    }
}
export default CompartirRecetasController;
