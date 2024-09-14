import { RowDataPacket } from 'mysql2';

export interface Receta extends RowDataPacket {
    id: number;
    nombre: string;
    descripcion: string;
    instrucciones: string;
    ingredientes: string;
    imagen_url?: string;
    video_url?: string;
    creado_en: Date;
    id_usuario: number;
  }
  