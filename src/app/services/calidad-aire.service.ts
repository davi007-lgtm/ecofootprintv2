import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CalidadAire } from '../models/huella.model'; 

@Injectable({
  providedIn: 'root'
})
export class CalidadAireService {
  private readonly API_TOKEN = 'e43c2c07dcc8c6f8a687c900542b79585fee8599';
  private readonly BASE_URL = 'https://api.waqi.info/feed';

  constructor(private http: HttpClient) {}

  obtenerCalidadAire(ciudad: string = 'san-jose'): Observable<CalidadAire> {
    return this.http.get<CalidadAire>(
      `${this.BASE_URL}/${ciudad}/?token=${this.API_TOKEN}`
    );
  }

  obtenerIndiceTexto(aqi: number): { texto: string; color: string } {
    if (aqi <= 50)  return { texto: 'Buena',                          color: '#22c55e' };
    if (aqi <= 100) return { texto: 'Moderada',                       color: '#eab308' };
    if (aqi <= 150) return { texto: 'No saludable (grupos sensibles)', color: '#f97316' };
    if (aqi <= 200) return { texto: 'No saludable',                   color: '#ef4444' };
    if (aqi <= 300) return { texto: 'Muy no saludable',               color: '#a855f7' };
    return                 { texto: 'Peligrosa',                      color: '#7f1d1d' };
  }
}