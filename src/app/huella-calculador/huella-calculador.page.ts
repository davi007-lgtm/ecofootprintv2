import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import {
  IonContent, IonHeader, IonTitle, IonToolbar,
  IonButton, IonButtons, IonIcon,
  IonGrid, IonRow, IonCol,
} from '@ionic/angular/standalone';

import { addIcons } from 'ionicons';
import {
  arrowBack, car, refreshCircle,carOutline,
  analyticsOutline, ellipse, arrowBackOutline, addCircleOutline, carSportOutline, refreshCircleOutline } from 'ionicons/icons';

import { HuellaService } from '../services/huella.service';

@Component({
  selector: 'app-huella-calculador',
  templateUrl: './huella-calculador.page.html',
  styleUrls: ['./huella-calculador.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonContent, IonHeader, IonTitle, IonToolbar,
    IonButton, IonButtons, IonIcon,
    IonGrid, IonRow, IonCol,
  ],
})
export class HuellaCalculadorPage {

  constructor(
    private router: Router,
    public huellaService: HuellaService,
  ) {
    addIcons({carOutline,arrowBackOutline,addCircleOutline,carSportOutline,refreshCircleOutline,analyticsOutline,ellipse,arrowBack,car,refreshCircle});
  }

  botonVolver() {
    this.router.navigate(['/home']);
  }

  lavarAuto() {
    this.huellaService.agregarHuella({
      id: Date.now(),
      accion: 'Lavó el auto',
      impacto: 20,
      tipo: 'negativo',
    });
  }

  reciclar() {
    this.huellaService.agregarHuella({
      id: Date.now(),
      accion: 'Recicló basura',
      impacto: -10,
      tipo: 'positivo',
    });
  }
}