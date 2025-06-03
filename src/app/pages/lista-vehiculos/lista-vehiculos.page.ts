import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, ToastController } from '@ionic/angular';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-lista-vehiculos',
  standalone: true,
  imports: [CommonModule, IonicModule, RouterModule],
  templateUrl: './lista-vehiculos.page.html',
  styleUrls: ['./lista-vehiculos.page.scss']
})
export class ListaVehiculosPage {
  vehiculos = signal<any[]>([]); // Lista de vehículos reactiva
  cargando = signal(true); // Estado de carga de la vista
  toastCtrl = inject(ToastController);

  constructor() {
    this.obtenerVehiculos();
  }

  // Método simulado para obtener vehículos (datos falsos)
  async obtenerVehiculos() {
    try {
      // Simulación de retardo de red
      await new Promise(res => setTimeout(res, 1000));

      // Datos simulados mientras no hay conexión a base de datos
      const datosFalsos = [
        { id: '1', patente: 'AB-C1-23', modelo: 'Toyota Corolla', anio: 2015 },
        { id: '2', patente: 'XY-Z7-89', modelo: 'Honda Civic', anio: 2018 },
        { id: '3', patente: 'LM-N4-56', modelo: 'Ford Fiesta', anio: 2020 },
      ];

      this.vehiculos.set(datosFalsos);
    } catch (error) {
      this.mostrarError('Error al cargar vehículos simulados');
    } finally {
      this.cargando.set(false);
    }
  }

  async mostrarError(mensaje: string) {
    const toast = await this.toastCtrl.create({
      message: mensaje,
      duration: 3000,
      color: 'danger'
    });
    toast.present();
  }

  editarVehiculo(vehiculoId: string) {
    // Redirección simulada a la página de edición (reemplazar cuando se conecte base de datos)
  }
} 