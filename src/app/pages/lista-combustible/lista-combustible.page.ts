import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-lista-combustible',
  templateUrl: './lista-combustible.page.html',
  styleUrls: ['./lista-combustible.page.scss'],
  imports: [IonicModule, CommonModule, FormsModule]
})
export class ListaCombustiblePage {
  // Datos falsos con monto y patente
  registrosCombustible: { fecha: string; monto: number; patente: string; urlBoleta: string; }[] = [
    { fecha: '2025-06-01', monto: 25000, patente: 'ABC123', urlBoleta: 'assets/boletas/boleta1.jpg' },
    { fecha: '2025-07-10', monto: 28000, patente: 'XYZ789', urlBoleta: 'assets/boletas/boleta2.pdf' },
    { fecha: '2025-07-22', monto: 30000, patente: 'LMN456', urlBoleta: 'assets/boletas/boleta3.png' },
  ];

  mesSeleccionado: string = '';
  anioSeleccionado: string = '';

  get mesesDisponibles(): string[] {
    const meses = new Set(this.registrosCombustible.map(r => r.fecha.split('-')[1]));
    return Array.from(meses).sort();
  }

  get aniosDisponibles(): string[] {
    const anios = new Set(this.registrosCombustible.map(r => r.fecha.split('-')[0]));
    return Array.from(anios).sort();
  }

  get registrosFiltrados() {
    return this.registrosCombustible.filter(r => {
      const [anio, mes] = r.fecha.split('-');
      return (
        (!this.mesSeleccionado || mes === this.mesSeleccionado) &&
        (!this.anioSeleccionado || anio === this.anioSeleccionado)
      );
    });
  }

  esImagen(ruta: string): boolean {
    return /\.(png|jpe?g|heic)$/i.test(ruta);
  }

  verBoleta(ruta: string): void {
    // Abre la boleta en una nueva pestaña
    window.open(ruta, '_blank');
  }


  editarCombustible(registro: { fecha: string; monto: number; patente: string; urlBoleta: string }) {
    console.log('Editar registro:', registro);
    // Aquí podrías abrir un modal de edición
  }
}