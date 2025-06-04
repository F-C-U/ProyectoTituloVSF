import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-kilometraje',
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule],
  templateUrl: './lista-kilometraje.page.html',
  styleUrls: ['./lista-kilometraje.page.scss'],
})
export class ListaKilometrajePage {
  // Lista de registros de kilometraje
  kilometrajes: { fecha: string; kilometraje: number }[] = [
    { fecha: '2025-06-01', kilometraje: 12000 },
    { fecha: '2025-07-15', kilometraje: 12500 },
    { fecha: '2025-07-28', kilometraje: 12800 },
  ];

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
}