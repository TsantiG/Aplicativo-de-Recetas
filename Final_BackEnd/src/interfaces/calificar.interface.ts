import { RowDataPacket } from 'mysql2';

export interface calificar  extends RowDataPacket {
  id: number;
  id_usuario: number;
  id_receta: number;
  calificacion: number;
}

