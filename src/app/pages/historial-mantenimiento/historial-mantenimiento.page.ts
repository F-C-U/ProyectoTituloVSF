import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-historial-mantenimiento',
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule],
  templateUrl: './historial-mantenimiento.page.html',
  styleUrls: ['./historial-mantenimiento.page.scss']
})
export class HistorialMantenimientoPage {
  tipoSeleccionado: string = '';

  // Datos de ejemplo
  registros = [
    {
      patente: 'ABC123',
      fecha: '2025-05-01',
      tipo: 'Cambio de aceite',
      costo: 45000,
      facturaUrl: 'assets/facturas/factura1.jpg'
    },
    {
      patente: 'XYZ789',
      fecha: '2025-04-20',
      tipo: 'Frenos',
      costo: 70000,
      facturaUrl: 'assets/facturas/factura2.pdf'
    },
    {
      patente: 'JKL456',
      fecha: '2025-03-15',
      tipo: 'Cambio de aceite',
      costo: 43000,
      facturaUrl: ''
    }
  ];

  get registrosFiltrados() {
    if (!this.tipoSeleccionado) return this.registros;
    return this.registros.filter(r => r.tipo === this.tipoSeleccionado);
  }

  abrirFactura(url: string) {
    if (url) {
      window.open(url, '_blank');
    } else {
      alert('No hay factura disponible');
    }
  }

  editarRegistro(registro: any) {
    console.log('Editar:', registro);
    // Aquí podrías navegar a otra página o abrir un modal
  }

  esImagen(url: string): boolean {
    return /\.(jpg|jpeg|png|heic)$/i.test(url);
  }

  esPDF(url: string): boolean {
    return url.toLowerCase().endsWith('.pdf');
  }
}