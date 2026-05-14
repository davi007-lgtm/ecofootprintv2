import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import {
  IonHeader, IonToolbar, IonTitle, IonContent,
  IonCard, IonCardHeader, IonCardTitle, IonCardContent,
  IonButton, IonButtons, IonItem, IonLabel,
  IonSelect, IonSelectOption, IonIcon, IonSpinner,IonRow, IonCol,IonGrid
} from '@ionic/angular/standalone';

import { addIcons } from 'ionicons';
import {
  arrowBackOutline, leafOutline, cloudOutline,
  thermometerOutline, waterOutline, speedometerOutline,
  locationOutline, analyticsOutline, globeOutline,
} from 'ionicons/icons';

import { CalidadAireService } from '../services/calidad-aire.service';
import { CalidadAire } from '../models/huella.model';

interface Pais {
  nombre: string;
  ciudad: string;
  icono: string;
}

@Component({
  selector: 'app-calidad-aire',
  templateUrl: './calidad-aire.page.html',
  styleUrls: ['./calidad-aire.page.scss'],
  standalone: true,
  imports: [
    CommonModule, FormsModule,
    IonHeader, IonToolbar, IonTitle, IonContent,
    IonCard, IonCardHeader, IonCardTitle, IonCardContent,
    IonButton, IonButtons, IonItem, IonLabel,
    IonSelect, IonSelectOption, IonIcon, IonSpinner,IonRow, IonCol,IonGrid
  ],
})
export class CalidadAirePage implements OnInit, OnDestroy {

  datos: CalidadAire | null = null;
  estado: string = '';
  color: string  = '';
  ciudadSeleccionada: string = 'san-jose';

  paises: Pais[] = [
    { nombre: 'Costa Rica',     ciudad: 'San Pedro',     icono: 'leaf-outline'      },
    { nombre: 'México',          ciudad: 'mexico-city',  icono: 'globe-outline'     },
    { nombre: 'Estados Unidos',  ciudad: 'new-york',     icono: 'globe-outline'     },
    { nombre: 'España',          ciudad: 'madrid',       icono: 'globe-outline'     },
    { nombre: 'Colombia',        ciudad: 'bogota',       icono: 'globe-outline'     },
    { nombre: 'Argentina',       ciudad: 'buenos-aires', icono: 'globe-outline'     },
    { nombre: 'Brasil',          ciudad: 'sao-paulo',    icono: 'globe-outline'     },
    { nombre: 'Chile',           ciudad: 'santiago',     icono: 'globe-outline'     },
    { nombre: 'Perú',            ciudad: 'lima',         icono: 'globe-outline'     },
    { nombre: 'China',           ciudad: 'beijing',      icono: 'globe-outline'     },
    { nombre: 'India',           ciudad: 'delhi',        icono: 'globe-outline'     },
    { nombre: 'Japón',           ciudad: 'tokyo',        icono: 'globe-outline'     },
    { nombre: 'Reino Unido',     ciudad: 'london',       icono: 'globe-outline'     },
    { nombre: 'Alemania',        ciudad: 'berlin',       icono: 'globe-outline'     },
    { nombre: 'Francia',         ciudad: 'paris',        icono: 'globe-outline'     },
  ];

  private destroy$ = new Subject<void>();

  constructor(
    private calidadAireService: CalidadAireService,
    private router: Router,
  ) {
    addIcons({
      arrowBackOutline, leafOutline, cloudOutline,
      thermometerOutline, waterOutline, speedometerOutline,
      locationOutline, analyticsOutline, globeOutline,
    });
  }

  ngOnInit(): void {
    this.cargarDatos();
  }

  cargarDatos(): void {
    this.datos = null;
    this.calidadAireService
      .obtenerCalidadAire(this.ciudadSeleccionada)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (respuesta) => {
          const data   = respuesta as CalidadAire;
          this.datos   = data;
          const info   = this.calidadAireService.obtenerIndiceTexto(data.data.aqi);
          this.estado  = info.texto;
          this.color   = info.color;
        },
        error: (err) => console.error('Error al obtener calidad del aire:', err),
      });
  }

  botonVolver(): void {
    this.router.navigate(['/home']);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}