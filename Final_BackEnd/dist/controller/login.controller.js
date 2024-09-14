import bcrypt from 'bcryptjs';
class QueryAsync {
    database;
    constructor(database) {
        this.database = database;
    }
    // Obtener usuario por correo (para login)
    async getUserByEmail(correo) {
        const sql = "SELECT * FROM usuarios WHERE correo = ?";
        try {
            const [rows] = await this.database.query(sql, [correo]);
            return rows[0] || null;
        }
        catch (err) {
            console.error("Error getting user by email: ", err);
            throw err;
        }
    }
    // Obtener todos los usuarios (opcional)
    async getAllUsers() {
        const sql = "SELECT * FROM usuarios";
        try {
            const [rows] = await this.database.query(sql);
            return rows;
        }
        catch (err) {
            console.error("Error getting users: ", err);
            throw err;
        }
    }
    // Obtener usuario por ID (para perfil o uso interno)
    async getUserById(userid) {
        const sql = "SELECT * FROM usuarios WHERE id = ?";
        try {
            const [rows] = await this.database.query(sql, [userid]);
            return rows[0] || null;
        }
        catch (err) {
            console.error("Error getting user by id: ", err);
            throw err;
        }
    }
    // Crear usuario (para registro)
    async createUser(user) {
        const sql = "INSERT INTO usuarios (nombre, correo, password_hash) VALUES (?, ?, ?)";
        try {
            const [result] = await this.database.query(sql, [user.nombre, user.correo, user.password_hash]);
            return result.insertId; // Retorna el ID del nuevo usuario
        }
        catch (err) {
            console.error("Error creando usuario:", err);
            throw err;
        }
    }
    // Actualizar usuario (si es necesario modificar nombre o contraseña)
    async updateUser(userid, user) {
        const sql = "UPDATE usuarios SET nombre = ?, password_hash = ? WHERE id = ?";
        try {
            const [result] = await this.database.query(sql, [user.nombre, user.password_hash, userid]);
            return result.affectedRows; // Retorna la cantidad de filas afectadas
        }
        catch (err) {
            console.error("Error updating user: ", err);
            throw err;
        }
    }
    // Eliminar usuario
    async deleteUser(userid) {
        const sql = "DELETE FROM usuarios WHERE id = ?";
        try {
            const [result] = await this.database.query(sql, [userid]);
            return result.affectedRows; // Retorna la cantidad de filas eliminadas
        }
        catch (err) {
            console.error("Error deleting user: ", err);
            throw err;
        }
    }
    async validatePassword(password, hashedPassword) {
        try {
            return await bcrypt.compare(password, hashedPassword);
        }
        catch (err) {
            console.error("Error comparando contraseña:", err);
            throw err;
        }
    }
}
export default QueryAsync;
