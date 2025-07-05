import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { NavigationExtras } from '@angular/router';
import { UtilsService } from 'src/app/services/utils.service';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-kilometraje',
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule],
  templateUrl: './lista-kilometraje.page.html',
  styleUrls: ['./lista-kilometraje.page.scss'],
})
export class ListaKilometrajePage {

  kilometrajes: { id: string; fecha: string; kilometraje: number; patenteVehiculo: string }[] = [];
  mesSeleccionado: string = '';
  anioSeleccionado: string = '';

  constructor(
    private utils: UtilsService,
    private firebase: FirebaseService
  ) {}

  ngOnInit() {
    this.obtenerKilometrajes();
  }

  async obtenerKilometrajes() {
    this.firebase.getCollection('kilometraje').subscribe((data: any[]) => {
      this.kilometrajes = data.map((kilometraje) => ({
        id: kilometraje.id,
        fecha: kilometraje.fecha,
        kilometraje: kilometraje.kilometros,
        patenteVehiculo: kilometraje.patenteVehiculo
      }));
    });
  }

  // Getters para filtros
  get aniosDisponibles(): string[] {
    const anios = new Set(this.kilometrajes.map(k => k.fecha.split('-')[0]));
    return Array.from(anios).sort();
  }

  get mesesDisponibles(): string[] {
    const meses = new Set(this.kilometrajes.map(k => k.fecha.split('-')[1]));
    return Array.from(meses).sort();
  }

  get kilometrajesFiltrados() {
    return this.kilometrajes.filter(k => {
      const [anio, mes] = k.fecha.split('-');
      return (
        (!this.mesSeleccionado || mes === this.mesSeleccionado) &&
        (!this.anioSeleccionado || anio === this.anioSeleccionado)
      );
    });
  }

  // Solo permite editar si la fecha del registro es igual a la de hoy
  editarRegistro(id: string) {
    const registro = this.kilometrajes.find(k => k.id === id);

    if (!registro) {
      this.utils.presentToast({
        message: 'Registro no encontrado',
        duration: 2000,
        color: 'danger'
      });
      return;
    }

    const hoy = new Date();
    const fechaHoy = hoy.toISOString().split('T')[0]; // e.g. '2025-07-05'
    const fechaRegistro = registro.fecha.split('T')[0]; // por si incluye hora

    if (fechaRegistro !== fechaHoy) {
      this.utils.presentToast({
        message: 'Solo puedes editar registros creados hoy',
        duration: 3000,
        color: 'warning'
      });
      return;
    }

    const xtras: NavigationExtras = {
      state: { id }
    };

    this.utils.routerLinkWithExtras('editar-kilometraje', xtras);
  }
}