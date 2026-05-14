import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import {
  IonHeader, IonToolbar, IonTitle, IonContent,
  IonButton, IonIcon,
} from '@ionic/angular/standalone';

import { addIcons } from 'ionicons';
import {
  leafOutline, leaf, partlySunny, arrowForward,
  analyticsOutline, ellipse, trendingUpOutline,
  trendingDownOutline, checkmarkCircleOutline,
} from 'ionicons/icons';

import { HuellaService } from '../services/huella.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonHeader, IonToolbar, IonTitle, IonContent,
    IonButton, IonIcon,
  ],
})
export class HomePage {

  constructor(
    private router: Router,
    public huellaService: HuellaService,
  ) {
    addIcons({
      leafOutline, leaf, partlySunny, arrowForward,
      analyticsOutline, ellipse, trendingUpOutline,
      trendingDownOutline, checkmarkCircleOutline,
    });
  }

  funcionalidadHuella() {
    this.router.navigate(['/huella-calculador']);
  }

  funcionalidadWAQI() {
    this.router.navigate(['/calidad-aire']);
  }

  get totalImpacto(): number {
    return this.huellaService.obtenerTotalImpacto();
  }

  get estadoHuella(): string {
    return this.huellaService.obtenerEstado();
  }

  get tieneActividad(): boolean {
    return this.totalImpacto !== 0;
  }

  get impactoPositivo(): boolean {
    return this.totalImpacto <= 0;
  }
}