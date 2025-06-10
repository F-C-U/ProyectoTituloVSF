import { Component } from '@angular/core';
import { 
  IonHeader, IonToolbar, IonTitle, IonContent, 
  IonItem, IonInput, IonButton, 
  IonCard, IonCardHeader, IonCardTitle, 
  IonCardContent, IonIcon, IonDatetime, AlertController, IonCardSubtitle } from '@ionic/angular/standalone';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-generar-informe',
  templateUrl: './generar-informe.page.html',
  styleUrls: ['./generar-informe.page.scss'],
  standalone: true,
  imports: [IonCardSubtitle, 
    IonHeader, IonToolbar, IonTitle, IonContent,
    IonItem, IonInput, IonButton, 
    IonCard, IonCardHeader, IonCardTitle, IonCardContent, 
    IonIcon, IonDatetime, FormsModule, CommonModule
  ]
})
export class GenerarInformePage {
  constructor(private alertController: AlertController) {}

  // Variables para la consulta
  patente: string = '';
  mesConsulta: string = '';
  datosConsultados: boolean = false;
  informeGenerado: boolean = false;
  informeHTML: string = '';

  // Datos del vehículo (simulados)
  vehiculo = {
    marca: '',
    modelo: '',
    kilometraje: 0,
    gastoCombustible: 0,
    rendimiento: 0
  };

  // === VALIDACIONES BÁSICAS ===
  formatearPatente() {
    // Formato básico: AB123CD → AB-123-CD
    if (this.patente.length >= 4) {
      this.patente = this.patente.toUpperCase().replace(/([A-Za-z]{2})(\d{3})([A-Za-z]{2})/, '$1-$2-$3');
    }
  }

  validarPatente(event: KeyboardEvent) {
    const teclasPermitidas = [
      'Backspace', 'Delete', 'ArrowLeft', 'ArrowRight',
      'Tab', 'Home', 'End'
    ];

    // Permite letras, números y guiones
    if (!/[A-Za-z0-9-]/.test(event.key) && !teclasPermitidas.includes(event.key)) {
      event.preventDefault();
    }
  }

  // === CONSULTA SIMULADA ===
  consultarDatosVehiculo() {
    if (!this.patente || !this.mesConsulta) {
      this.mostrarAlerta('Datos incompletos', 'Debe ingresar patente y mes de consulta');
      return;
    }

    // Simulación de datos (en una implementación real harías una llamada HTTP aquí)
    this.vehiculo = {
      marca: 'Toyota',
      modelo: 'Hilux',
      kilometraje: 15000 + Math.floor(Math.random() * 5000),
      gastoCombustible: 500000 + Math.floor(Math.random() * 200000),
      rendimiento: 10 + Math.floor(Math.random() * 5)
    };

    this.datosConsultados = true;
    this.informeGenerado = false;
    this.mostrarAlerta('Consulta exitosa', 'Datos del vehículo cargados');
  }

  // === GENERACIÓN DE INFORME SIMPLE ===
  generarInforme() {
    if (!this.datosConsultados) return;

    // Genera HTML básico para el informe
    this.informeHTML = `
      <div class="report-section">
        <h3>Informe de Rendimiento</h3>
        <p><strong>Vehículo:</strong> ${this.vehiculo.marca} ${this.vehiculo.modelo}</p>
        <p><strong>Patente:</strong> ${this.patente}</p>
        <p><strong>Período:</strong> ${new Date(this.mesConsulta).toLocaleDateString('es-CL', { month: 'long', year: 'numeric' })}</p>
        
        <div class="data-grid">
          <div class="data-item">
            <span class="data-label">Kilometraje:</span>
            <span class="data-value">${this.vehiculo.kilometraje.toLocaleString('es-CL')} km</span>
          </div>
          <div class="data-item">
            <span class="data-label">Gasto combustible:</span>
            <span class="data-value">$${this.vehiculo.gastoCombustible.toLocaleString('es-CL')}</span>
          </div>
          <div class="data-item">
            <span class="data-label">Rendimiento:</span>
            <span class="data-value">${this.vehiculo.rendimiento} km/L</span>
          </div>
        </div>
      </div>
    `;

    this.informeGenerado = true;
  }

  // === FUNCIÓN AUXILIAR ===
  private async mostrarAlerta(titulo: string, mensaje: string) {
    const alert = await this.alertController.create({
      header: titulo,
      message: mensaje,
      buttons: ['OK'],
      cssClass: 'custom-alert'
    });
    await alert.present();
  }
}