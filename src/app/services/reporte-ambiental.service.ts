import { Injectable } from "@angular/core";

export interface Reporte {
  id: number;
  incidente: string;
  fecha: Date;
  descripcion: string;
  estado: 'Abierto' | 'En Proceso' | 'Cerrado';
}

@Injectable({
  providedIn: 'root'
})
export class IncidenciaService {

  private reportes: Reporte[] = [
    {
      id: 1,
      incidente: 'Fuga de agua',
      fecha: new Date(),
      descripcion: 'Tubería rota en sector norte.',
      estado: 'Abierto'
    }
  ];

  private siguienteId = 2;

  // READ
  obtenerReportes(): Reporte[] {
    try {
      return this.reportes;
    } catch (error) {
      console.error('Error al obtener reportes:', error);
      return [];
    }
  }

  obtenerReportePorId(id: number): Reporte | undefined {
    try {
      return this.reportes.find(r => r.id === id);
    } catch (error) {
      console.error('Error al buscar reporte:', error);
      return undefined;
    }
  }

  // CREATE
  agregarReporte(datos: Omit<Reporte, 'id'>): void {
    try {
      const nuevoReporte: Reporte = {
        id: this.siguienteId++,
        ...datos
      };
      this.reportes.push(nuevoReporte);
    } catch (error) {
      console.error('Error al agregar reporte:', error);
    }
  }

  // UPDATE
  actualizarReporte(id: number, cambios: Partial<Omit<Reporte, 'id'>>): boolean {
    try {
      const indice = this.reportes.findIndex(r => r.id === id);
      if (indice === -1) return false;

      this.reportes[indice] = { ...this.reportes[indice], ...cambios };
      return true;
    } catch (error) {
      console.error('Error al actualizar reporte:', error);
      return false;
    }
  }

  // DELETE
  eliminarReporte(id: number): boolean {
    try {
      const indice = this.reportes.findIndex(r => r.id === id);
      if (indice === -1) return false;

      this.reportes.splice(indice, 1);
      return true;
    } catch (error) {
      console.error('Error al eliminar reporte:', error);
      return false;
    }
  }
}