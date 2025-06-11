import { Component } from '@angular/core';
import { 
  IonHeader, IonToolbar, IonTitle, IonContent,
  IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent,
  IonItem, IonLabel, IonInput, IonButton, 
  IonNote, IonGrid, IonRow, IonCol, IonIcon } from '@ionic/angular/standalone';
import { FormsModule } from '@angular/forms';
import { CommonModule, DatePipe } from '@angular/common';
import { addIcons } from 'ionicons';
import { search, pencil, eye } from 'ionicons/icons';

@Component({
  selector: 'app-lista-ganancia',
  templateUrl: './lista-ganancia.page.html',
  styleUrls: ['./lista-ganancia.page.scss'],
  standalone: true,
  imports: [IonIcon, 
    IonHeader, IonToolbar, IonTitle, IonContent,
    IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent,
    IonItem, IonLabel, IonInput, IonButton,
    IonNote, IonGrid, IonRow, IonCol,
    FormsModule, CommonModule, DatePipe
  ]
})
export class ListaGananciaPage {
  registros = [
    {
      id: 1,
      patente: 'FGHI70',
      ganancia: 150000,
      fecha: '2025-06-10',
      detalles: 'Servicio completo + lavado'
    },
    {
      id: 2,
      patente: 'BRDE30',
      ganancia: 98000,
      fecha: '2025-06-09',
      detalles: 'Servicio básico'
    }
  ];

  gananciasFiltradas = [...this.registros];
  filtro = {
    desde: '',
    hasta: ''
  };

  constructor() {
    addIcons({ search, pencil, eye });
  }

  aplicarFiltros() {
    this.gananciasFiltradas = this.registros.filter(registro => {
      const cumpleFechaDesde = !this.filtro.desde || registro.fecha >= this.filtro.desde;
      const cumpleFechaHasta = !this.filtro.hasta || registro.fecha <= this.filtro.hasta;
      return cumpleFechaDesde && cumpleFechaHasta;
    });
  }

  limpiarFiltros() {
    this.filtro = { desde: '', hasta: '' };
    this.aplicarFiltros();
  }

  editarRegistro(registro: any) {
    console.log('Editar registro:', registro);
    // Lógica para edición aquí
  }

  verDetalle(registro: any) {
    console.log('Ver detalle:', registro);
    // Lógica para ver detalle aquí
  }
}