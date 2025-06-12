import { Component, inject } from '@angular/core';
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

  constructor(private utils:UtilsService,private firebase: FirebaseService){

  }
  // Lista de registros de kilometraje
  kilometrajes: {id:string, fecha: string; kilometraje: number; patenteVehiculo: String }[] = [];
  async obtenerKilometrajes() {
    this.firebase.getCollection('kilometrajes').subscribe((data: any[]) => {
      this.kilometrajes = data.map((kilometraje) => ({
        id: kilometraje.id,
        fecha: kilometraje.fecha,
        kilometraje: kilometraje.kilometraje,
        patenteVehiculo: kilometraje.patenteVehiculo
      }));
    })
  }
  // Valores seleccionados en el filtro
  mesSeleccionado: string = '';
  anioSeleccionado: string = '';

  // Getters para filtros únicos de año y mes
  get aniosDisponibles(): string[] {
    const anios = new Set(this.kilometrajes.map(k => k.fecha.split('-')[0]));
    return Array.from(anios).sort();
  }

  get mesesDisponibles(): string[] {
    const meses = new Set(this.kilometrajes.map(k => k.fecha.split('-')[1]));
    return Array.from(meses).sort();
  }

  // Filtra los datos según el mes y año seleccionados
  get kilometrajesFiltrados() {
    return this.kilometrajes.filter(k => {
      const [anio, mes] = k.fecha.split('-');
      return (
        (!this.mesSeleccionado || mes === this.mesSeleccionado) &&
        (!this.anioSeleccionado || anio === this.anioSeleccionado)
      );
    });
  }

  // Método para editar un registro (futura funcionalidad)
  editarRegistro(id: String ) {
    let xtras : NavigationExtras = {
      state:{
        id:id
      }
    }
    this.utils.routerLinkWithExtras('editar-kilometraje', xtras);
  }
}