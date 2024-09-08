
import { RowDataPacket } from 'mysql2';

export interface Usuario  extends RowDataPacket {
  id: number;
  nombre: string;
  correo: string;
  password_hash: string;
  creado_en: Date;
}

