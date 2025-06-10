import { Component } from '@angular/core';
import { 
  IonHeader, IonToolbar, IonTitle, IonContent, 
  IonItem, IonLabel, IonInput, IonButton, 
  IonCard, IonCardHeader, IonCardTitle, 
  IonCardContent, IonIcon, IonDatetime, AlertController, IonList, IonCardSubtitle } from '@ionic/angular/standalone';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-generar-informe',
  templateUrl: './generar-informe.page.html',
  styleUrls: ['./generar-informe.page.scss'],
  standalone: true,
  imports: [ 
    IonHeader, IonToolbar, IonTitle, IonContent,
    IonItem, IonInput, IonButton, 
    IonCard, IonCardHeader, IonCardTitle, IonCardContent, 
    IonIcon, IonDatetime, FormsModule, CommonModule
  ]
})
export class GenerarInformePage {
  constructor(private alertController: AlertController) {}

  // Variables para el formulario
  patente: string = '';
  mesConsulta: string = '';
  fechaMaxima: string = new Date().toISOString();

  // Flags de estado
  datosConsultados: boolean = false;
  datosDisponibles: boolean = false;
  informeGenerado: boolean = false;
  informeHTML: string = '';

  // Datos simulados del vehículo
  vehiculo = {
    marca: '',
    modelo: '',
    kilometraje: 0,
    gastoCombustible: 0,
    rendimiento: 0
  };

  // === VALIDACIONES ===
  formatearPatente() {
    if (this.patente.length >= 4) {
      this.patente = this.patente.toUpperCase().replace(/([A-Za-z]{2})(\d{3})([A-Za-z]{2})/, '$1-$2-$3');
    }
  }

  validarPatente(event: KeyboardEvent) {
    const teclasPermitidas = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab', 'Home', 'End'];
    if (!/[A-Za-z0-9-]/.test(event.key) && !teclasPermitidas.includes(event.key)) {
      event.preventDefault();
    }
  }

  validarFecha() {
    if (!this.mesConsulta) return;
    
    const fechaSeleccionada = new Date(this.mesConsulta);
    const hoy = new Date();
    
    if (fechaSeleccionada > hoy) {
      this.mostrarAlertaFechaInvalida();
      this.mesConsulta = '';
    }
  }

  private async mostrarAlertaFechaInvalida() {
    const alert = await this.alertController.create({
      header: 'Fecha no válida',
      message: '⚠️ No puedes seleccionar una fecha futura para el informe',
      buttons: ['Entendido']
    });
    await alert.present();
  }

  // === LÓGICA PRINCIPAL ===
  consultarDatosVehiculo() {
    // Validación de fecha futura
    if (new Date(this.mesConsulta) > new Date()) {
      this.mostrarAlertaFechaInvalida();
      return;
    }

    if (!this.patente || !this.mesConsulta) {
      this.mostrarAlerta('Datos incompletos', 'Debe ingresar patente y mes de consulta');
      return;
    }

    // Simulación de datos
    this.vehiculo = {
      marca: 'Toyota',
      modelo: 'Hilux',
      kilometraje: 15000 + Math.floor(Math.random() * 5000),
      gastoCombustible: 500000 + Math.floor(Math.random() * 200000),
      rendimiento: 10 + Math.floor(Math.random() * 5)
    };

    this.datosConsultados = true;
    this.datosDisponibles = true;
    this.informeGenerado = false;
  }

  generarInforme() {
    if (!this.datosDisponibles) return;

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
          <!-- Resto del HTML del informe -->
        </div>
      </div>
    `;

    this.informeGenerado = true;
  }

  // === FUNCIONES AUXILIARES ===
  private async mostrarAlerta(titulo: string, mensaje: string) {
    const alert = await this.alertController.create({
      header: titulo,
      message: mensaje,
      buttons: ['OK']
    });
    await alert.present();
  }
}