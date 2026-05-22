export interface Reporte {
    id: number;
    incidente: string;
    fecha:Date;
    descripcion: string;
    estado: 'Abierto' | 'En Proceso' | 'Cerrado';
}