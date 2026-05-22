import { Component, OnInit } from '@angular/core';
import {
  IonContent, IonHeader, IonToolbar, IonTitle,
  IonList, IonItem, IonIcon, IonButton,
  IonFab, IonFabButton, IonModal, IonInput,
  IonSelect, IonSelectOption, IonTextarea,
  AlertController, ToastController,
} from '@ionic/angular/standalone';
import { FormsModule } from '@angular/forms';
import { NgFor, NgIf, DatePipe } from '@angular/common';
import { addIcons } from 'ionicons';
import {
  warningOutline, addOutline, createOutline,
  trashOutline, alertCircleOutline, listOutline, closeOutline,
} from 'ionicons/icons';

import { IncidenciaService, Reporte } from '../services/reporte-ambiental.service';

@Component({
  selector: 'app-incidentes',
  templateUrl: './incidentes.page.html',
  styleUrls: ['./incidentes.page.scss'],
  standalone: true,
  imports: [
    IonContent, IonHeader, IonToolbar, IonTitle,
    IonList, IonItem, IonIcon, IonButton,
    IonFab, IonFabButton, IonModal, IonInput,
    IonSelect, IonSelectOption, IonTextarea,
    FormsModule, NgFor, NgIf, DatePipe,
  ],
})
export class IncidentesPage implements OnInit {

  reportes: Reporte[] = [];

  // Controla si el modal está abierto
  modalAbierto = false;

  // true = editando, false = creando
  modoEdicion = false;

  // Campos del formulario
  incidente = '';
  descripcion = '';
  estado: 'Abierto' | 'En Proceso' | 'Cerrado' = 'Abierto';

  // ID del reporte que se está editando
  idEditando = 0;

  constructor(
    public incidenciaService: IncidenciaService,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
  ) {
    addIcons({
      warningOutline, addOutline, createOutline,
      trashOutline, alertCircleOutline, listOutline, closeOutline,
    });
  }

  ngOnInit() {
    this.cargarReportes();
  }

  // READ
  cargarReportes() {
    try {
      this.reportes = this.incidenciaService.obtenerReportes();
    } catch (error) {
      console.error('Error al cargar reportes:', error);
    }
  }

  // Abre el modal en modo CREAR
  abrirModalCrear() {
    this.modoEdicion = false;
    this.incidente = '';
    this.descripcion = '';
    this.estado = 'Abierto';
    this.modalAbierto = true;
  }

  // Abre el modal en modo EDITAR con los datos del reporte
  abrirModalEditar(reporte: Reporte) {
    this.modoEdicion = true;
    this.idEditando = reporte.id;
    this.incidente = reporte.incidente;
    this.descripcion = reporte.descripcion;
    this.estado = reporte.estado;
    this.modalAbierto = true;
  }

  cerrarModal() {
    this.modalAbierto = false;
  }

  // CREATE o UPDATE según el modo
  guardar() {
    try {
      if (this.incidente.trim() === '' || this.descripcion.trim() === '') {
        this.mostrarToast('Completá todos los campos.', 'warning');
        return;
      }

      if (this.modoEdicion) {
        // UPDATE
        this.incidenciaService.actualizarReporte(this.idEditando, {
          incidente: this.incidente,
          descripcion: this.descripcion,
          estado: this.estado,
        });
        this.mostrarToast('Reporte actualizado.', 'success');
      } else {
        // CREATE
        this.incidenciaService.agregarReporte({
          incidente: this.incidente,
          descripcion: this.descripcion,
          estado: this.estado,
          fecha: new Date(),
        });
        this.mostrarToast('Reporte agregado.', 'success');
      }

      this.cerrarModal();
      this.cargarReportes();

    } catch (error) {
      console.error('Error al guardar reporte:', error);
      this.mostrarToast('Ocurrió un error al guardar.', 'danger');
    }
  }

  // DELETE con confirmación
  async confirmarEliminar(reporte: Reporte) {
    try {
      const alerta = await this.alertCtrl.create({
        header: 'Eliminar reporte',
        message: `¿Eliminar "${reporte.incidente}"?`,
        buttons: [
          { text: 'Cancelar', role: 'cancel' },
          {
            text: 'Eliminar',
            role: 'destructive',
            handler: () => {
              this.eliminar(reporte.id);
            },
          },
        ],
      });
      await alerta.present();
    } catch (error) {
      console.error('Error al mostrar alerta:', error);
    }
  }

  eliminar(id: number) {
    try {
      this.incidenciaService.eliminarReporte(id);
      this.cargarReportes();
      this.mostrarToast('Reporte eliminado.', 'success');
    } catch (error) {
      console.error('Error al eliminar:', error);
    }
  }

  // Clases CSS según estado
  claseCard(estado: string) {
    if (estado === 'Abierto') return 'card-abierto';
    if (estado === 'En Proceso') return 'card-proceso';
    return 'card-cerrado';
  }

  claseBadge(estado: string) {
    if (estado === 'Abierto') return 'badge-abierto';
    if (estado === 'En Proceso') return 'badge-proceso';
    return 'badge-cerrado';
  }

  async mostrarToast(mensaje: string, color: string) {
    const toast = await this.toastCtrl.create({
      message: mensaje,
      duration: 2000,
      color: color,
      position: 'bottom',
    });
    await toast.present();
  }
}