import { Component } from '@angular/core';
import { 
  IonHeader, IonToolbar, IonTitle, IonContent, 
  IonItem, IonInput, IonButton, 
  IonCard, IonCardHeader, IonCardTitle, 
  IonCardContent, IonIcon, IonDatetime, AlertController } from '@ionic/angular/standalone';
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

  // ===== VARIABLES DEL FORMULARIO =====
  patente: string = '';
  mesConsulta: string = '';
  combustibleConsumido: number = 0;  // Nuevo campo (litros)
  ganancias: number = 0;             // Nuevo campo (pesos)
  kilometraje: number = 0;           // Nuevo campo (kilómetros)
  fechaMaxima: string = new Date().toISOString();

  // ===== FLAGS DE ESTADO =====
  datosConsultados: boolean = false;
  datosDisponibles: boolean = false;
  informeGenerado: boolean = false;
  informeHTML: string = '';

  // ===== DATOS DEL VEHÍCULO =====
  vehiculo = {
    marca: '',
    modelo: '',
    kilometrajeTotal: 0,
    gastoCombustible: 0,
    rendimiento: 0,
    gananciasTotales: 0
  };

  // ===== VALIDACIONES =====
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

  // ===== LÓGICA PRINCIPAL =====
  consultarDatosVehiculo() {
    // Validación de campos obligatorios
    if (!this.patente || !this.mesConsulta || 
        !this.combustibleConsumido || !this.ganancias || !this.kilometraje) {
      this.mostrarAlerta('Datos incompletos', 'Debe completar todos los campos');
      return;
    }

    // Validación de valores numéricos positivos
    if (this.combustibleConsumido <= 0 || this.ganancias <= 0 || this.kilometraje <= 0) {
      this.mostrarAlerta('Valores inválidos', 'Los valores numéricos deben ser mayores a cero');
      return;
    }

    // Validación de fecha futura
    if (new Date(this.mesConsulta) > new Date()) {
      this.mostrarAlertaFechaInvalida();
      return;
    }

    // Simulación de datos (actualizada con nuevos campos)
    this.vehiculo = {
      marca: 'Toyota',
      modelo: 'Hilux',
      kilometrajeTotal: this.kilometraje,
      gastoCombustible: this.combustibleConsumido * 1200, // Simula precio por litro
      rendimiento: parseFloat((this.kilometraje / this.combustibleConsumido).toFixed(2)),
      gananciasTotales: this.ganancias
    };

    this.datosConsultados = true;
    this.datosDisponibles = true;
    this.informeGenerado = false;
  }

  generarInforme() {
    if (!this.datosDisponibles) return;

    // Cálculo de métricas adicionales
    const costoPorKm = this.vehiculo.gastoCombustible / this.vehiculo.kilometrajeTotal;
    const gananciaNeta = this.vehiculo.gananciasTotales - this.vehiculo.gastoCombustible;

    this.informeHTML = `
      <div class="report-section">
        <h3>📊 Informe de Rendimiento Mensual</h3>
        
        <div class="vehicle-info">
          <p><strong>🚗 Vehículo:</strong> ${this.vehiculo.marca} ${this.vehiculo.modelo}</p>
          <p><strong>🔢 Patente:</strong> ${this.patente}</p>
          <p><strong>📅 Período:</strong> ${new Date(this.mesConsulta).toLocaleDateString('es-CL', { month: 'long', year: 'numeric' })}</p>
        </div>
        
        <div class="data-grid">
          <div class="data-item highlight">
            <span class="data-label">⛽ Combustible consumido:</span>
            <span class="data-value">${this.combustibleConsumido} L</span>
          </div>
          
          <div class="data-item highlight">
            <span class="data-label">💰 Ganancias:</span>
            <span class="data-value">$${this.ganancias.toLocaleString('es-CL')}</span>
          </div>
          
          <div class="data-item highlight">
            <span class="data-label">🛣️ Kilometraje:</span>
            <span class="data-value">${this.kilometraje.toLocaleString('es-CL')} km</span>
          </div>
          
          <div class="data-item">
            <span class="data-label">⚡ Rendimiento:</span>
            <span class="data-value">${this.vehiculo.rendimiento} km/L</span>
          </div>
          
          <div class="data-item">
            <span class="data-label">💵 Costo por km:</span>
            <span class="data-value">$${costoPorKm.toFixed(2)}</span>
          </div>
          
          <div class="data-item ${gananciaNeta >= 0 ? 'positive' : 'negative'}">
            <span class="data-label">🏆 Ganancia neta:</span>
            <span class="data-value">$${gananciaNeta.toLocaleString('es-CL')}</span>
          </div>
        </div>
      </div>
    `;

    this.informeGenerado = true;
  }

  // ===== FUNCIONES AUXILIARES =====
  private async mostrarAlerta(titulo: string, mensaje: string) {
    const alert = await this.alertController.create({
      header: titulo,
      message: mensaje,
      buttons: ['OK']
    });
    await alert.present();
  }
}