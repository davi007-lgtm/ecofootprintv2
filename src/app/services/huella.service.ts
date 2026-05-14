import { Injectable } from "@angular/core";
import { Huella } from "../models/huella.model";

@Injectable({
  providedIn: 'root'
})

export class HuellaService {

  calculador: Huella[] = [];

  constructor(){ }

  agregarHuella(calc: Huella) {

    this.calculador.push(calc);

  }

  obtenerHuella() {

    return this.calculador;

  }

  obtenerTotalImpacto(): number {

    return this.calculador.reduce(
      (total, item) => total + item.impacto,
      0
    );

  }

  obtenerEstado(): string {

    const total = this.obtenerTotalImpacto();

    if (total <= 20) {

      return 'En buen estado';

    } else {

      return 'En mal estado';

    }

  }

}