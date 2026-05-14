import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'huella-calculador',
    loadComponent: () => import('./huella-calculador/huella-calculador.page').then( m => m.HuellaCalculadorPage)
  },
  {
    path: 'calidad-aire',
    loadComponent: () => import('./calidad-aire/calidad-aire.page').then( m => m.CalidadAirePage)
  },
];
