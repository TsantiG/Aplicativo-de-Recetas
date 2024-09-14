
import { RowDataPacket } from 'mysql2';

export interface Comentar  extends RowDataPacket {
  id: number;
  id_usuario: number;
  id_receta: number;
  comentario: string;
}

