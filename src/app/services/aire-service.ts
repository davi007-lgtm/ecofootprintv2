import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Huella } from '../models/huella.model';

@Injectable({
  providedIn: 'root',
})
export class AireService {
  private huellas: Huella[] = [
    { id: 1, accion: 'Usar transporte público',  impacto: 30,  tipo: 'positivo' },
    { id: 2, accion: 'Usar automóvil privado',   impacto: 50,  tipo: 'negativo' },
    { id: 3, accion: 'Plantar un árbol',          impacto: 20,  tipo: 'positivo' },
    { id: 4, accion: 'Usar aerosoles',            impacto: 15,  tipo: 'negativo' },
    { id: 5, accion: 'Andar en bicicleta',        impacto: 25,  tipo: 'positivo' },
    { id: 6, accion: 'Quemar basura',             impacto: 70,  tipo: 'negativo' },
  ];

  private huellasSubject = new BehaviorSubject<Huella[]>(this.huellas);
  huellas$: Observable<Huella[]> = this.huellasSubject.asObservable();

  obtenerHuellas(): Huella[] {
    return this.huellas;
  }

  obtenerPorTipo(tipo: 'positivo' | 'negativo'): Huella[] {
    return this.huellas.filter(h => h.tipo === tipo);
  }

  calcularBalanceTotal(): number {
    return this.huellas.reduce((acc, h) => {
      return h.tipo === 'positivo' ? acc + h.impacto : acc - h.impacto;
    }, 0);
  }

  agregarHuella(huella: Omit<Huella, 'id'>): void {
    const nueva: Huella = { ...huella, id: Date.now() };
    this.huellas = [...this.huellas, nueva];
    this.huellasSubject.next(this.huellas);
  }

  eliminarHuella(id: number): void {
    this.huellas = this.huellas.filter(h => h.id !== id);
    this.huellasSubject.next(this.huellas);
  }
}