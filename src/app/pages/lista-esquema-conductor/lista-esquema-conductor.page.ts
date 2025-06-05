import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-lista-esquema-conductor',
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule],
  templateUrl: './lista-esquema-conductor.page.html',
  styleUrls: ['./lista-esquema-conductor.page.scss']
})
export class ListaEsquemaConductorPage {
  tipoSeleccionado: string = '';

  // Datos falsos de ejemplo
  registros = [
    { nombre: 'Juan Pérez', esquema: 'Cuota fija', monto: 20000 },
    { nombre: 'Ana Gómez', esquema: 'Porcentaje', monto: 15 },
    { nombre: 'Luis Soto', esquema: 'Cuota fija', monto: 18000 },
    { nombre: 'Claudia Rivas', esquema: 'Porcentaje', monto: 12 },
  ];

  get registrosFiltrados() {
    if (!this.tipoSeleccionado) return this.registros;
    return this.registros.filter(r => r.esquema === this.tipoSeleccionado);
  }

  editarEsquemaConductor(registro: any) {
    // Lógica para editar el registro
    console.log('Editar:', registro);
  }
}