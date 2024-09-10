import { Pool, ResultSetHeader }   from 'mysql2/promise';
import { Usuario } from '../interfaces/login.interface';
import bcrypt from 'bcryptjs';


class QueryAsync {
  private database: Pool;

  constructor(database: Pool) {
    this.database = database;
  }

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

  async getUserById(userid: number): Promise<Usuario | null> {
    const sql = "SELECT * FROM usuarios WHERE id = ?";
    try {
      const [rows] = await this.database.query<Usuario[]>(sql, [userid]);
      return rows[0] || null;
    } catch (err) {
      console.error("Error getting user by id: ", err);
      throw err;
    }
  }

  async getUserByUsername(username: string): Promise<Usuario | null> {
    const sql = "SELECT * FROM usuarios WHERE nombre = ?";
    try {
      const [rows] = await this.database.query<Usuario[]>(sql, [username]);
      return rows[0] || null;
    } catch (err) {
      console.error("Error getting user by username: ", err);
      throw err;
    }
  }



  async createUser(user: { nombre: string; password: string }): Promise<number> {
    const sql = "INSERT INTO usuarios (nombre, password_hash) VALUES (?, ?)";
    try {
      // Hashear la contraseña antes de almacenarla
      const hashedPassword = await bcrypt.hash(user.password, 10);

      const [result] = await this.database.query<ResultSetHeader>(sql, [user.nombre, hashedPassword]);
      return result.insertId;  // Retorna el ID del nuevo usuario
    } catch (err) {
      console.error("Error creating user: ", err);
      throw err;
    }
  }

  async updateUser(userid: number, user: { nombre: string; password_hash: string }): Promise<number> {
    const sql = "UPDATE usuarios SET nombre = ?, password_hash = ? WHERE id = ?";
    try {
      const [result] = await this.database.query<ResultSetHeader>(sql, [user.nombre, user.password_hash, userid]);
      return result.affectedRows;  // Retorna la cantidad de filas afectadas
    } catch (err) {
      console.error("Error updating user: ", err);
      throw err;
    }
  }

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
    return bcrypt.compare(password, hashedPassword);
  }
}

export default QueryAsync;
