import { Pool, ResultSetHeader } from 'mysql2/promise';
import { Usuario } from '../interfaces/login.interface';


import bcrypt from 'bcryptjs';


class QueryAsync {
  private database: Pool;

  constructor(database: Pool) {
    this.database = database;
  }

  // Obtener usuario por correo (para login)
  async getUserByEmail(correo: string): Promise<Usuario | null> {
    const sql = "SELECT * FROM usuarios WHERE correo = ?";
    try {
      const [rows] = await this.database.query<Usuario[]>(sql, [correo]);
      return rows[0] || null;
    } catch (err) {
      console.error("Error getting user by email: ", err);
      throw err;
    }
  }

  // Obtener todos los usuarios (opcional)
  async getAllUsers(): Promise<Usuario[]> {
    const sql = "SELECT * FROM usuarios";
    try {
      const [rows] = await this.database.query<Usuario[]>(sql);    
      return rows;
    } catch (err) {
      console.error("Error getting users: ", err);
      throw err;
    }
  }

// Obtener usuario por ID junto con su foto de perfil
async getUserById(userid: number): Promise<Usuario | null> {
  const sql = `
    SELECT u.*, uf.url_foto 
    FROM usuarios u
    LEFT JOIN usuarios_fotos uf ON u.id = uf.id_usuario
    WHERE u.id = ?
  `;

  try {
    const [rows] = await this.database.query<Usuario[]>(sql, [userid]);
    return rows[0] || null;
  } catch (err) {
    console.error("Error getting user by id: ", err);
    throw err;
  }
}


  // Crear usuario (para registro)
  async createUser(user: { nombre: string; correo: string; password_hash: string }): Promise<number> {
    const sql = "INSERT INTO usuarios (nombre, correo, password_hash) VALUES (?, ?, ?)";
    try {
      const [result] = await this.database.query<ResultSetHeader>(sql, [user.nombre, user.correo, user.password_hash]);
      return result.insertId;  // Retorna el ID del nuevo usuario
    } catch (err) {
      console.error("Error creando usuario:", err);
      throw err;
    }
  }

  // Actualizar usuario (si es necesario modificar nombre o contraseña)
  async updateUser(userid: number, user: { nombre: string; correo: string; password_hash?: string }): Promise<number> {
    const sql = `
      UPDATE usuarios 
      SET nombre = ?, correo = ?, password_hash = COALESCE(?, password_hash) 
      WHERE id = ?
    `;
    try {
      const [result] = await this.database.query<ResultSetHeader>(sql, [
        user.nombre, 
        user.correo, 
        user.password_hash || null,  // Actualizar la contraseña solo si se proporciona
        userid
      ]);
      return result.affectedRows;
    } catch (err) {
      console.error("Error updating user:", err);
      throw err;
    }
  }
  

  // Eliminar usuario
  async deleteUser(userid: number): Promise<number> {
    const sql = "DELETE FROM usuarios WHERE id = ?";
    try {
      const [result] = await this.database.query<ResultSetHeader>(sql, [userid]);
      return result.affectedRows;  // Retorna la cantidad de filas eliminadas
    } catch (err) {
      console.error("Error deleting user: ", err);
      throw err;
    }
  }

  async validatePassword(password: string, hashedPassword: string): Promise<boolean> {
    try {
      return await bcrypt.compare(password, hashedPassword);
    } catch (err) {
      console.error("Error comparando contraseña:", err);
      throw err;
    }
  }
}

export default QueryAsync;
