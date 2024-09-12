
import { RowDataPacket } from 'mysql2';

export interface Compartir  extends RowDataPacket {
  id: number;
  id_usuario: number;
  id_receta: number;
  id_region: number;
  id_tipo: number;
}

