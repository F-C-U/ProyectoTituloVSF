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

  // Variables del formulario
  patente: string = '';
  mesConsulta: string = '';
  fechaMaxima: string = new Date().toISOString();

  // Flags de estado
  datosConsultados: boolean = false;
  datosDisponibles: boolean = false;
  informeGenerado: boolean = false;
  informeHTML: string = '';

  // === VALIDACIÓN PATENTE CHILENA NUEVA (4 letras + 2 números) ===
  validarPatente(event: KeyboardEvent) {
    const inputChar = event.key;
    const currentValue = this.patente;
    
    // Permitir teclas de control
    if (['Backspace', 'Delete', 'Tab', 'ArrowLeft', 'ArrowRight', 'Enter'].includes(inputChar)) {
      return;
    }

    // Convertir a mayúsculas
    if (/[a-z]/.test(inputChar)) {
      event.preventDefault();
      this.patente = currentValue + inputChar.toUpperCase();
      return;
    }

    // Validar según posición
    const position = currentValue.length;
    
    // Formato: BBBB99 (4 letras + 2 números)
    if (position < 4) {
      // Primeros 4 caracteres deben ser letras
      if (!/[A-Z]/.test(inputChar)) {
        event.preventDefault();
      }
    } 
    else if (position >= 4 && position < 6) {
      // Últimos 2 caracteres deben ser números
      if (!/[0-9]/.test(inputChar)) {
        event.preventDefault();
      }
    }
    else {
      // No permitir más de 6 caracteres
      event.preventDefault();
    }
  }

  // Autoformateo al perder foco (ej: BBRR85 → BBRR-85)
  formatearPatente() {
    if (this.patente.length === 6) {
      this.patente = this.patente.slice(0, 4) + '-' + this.patente.slice(4);
    }
  }

  // Validación completa de patente chilena nueva
  private validarFormatoPatente(patente: string): boolean {
    // Patrón exacto: 4 letras + 2 números (con o sin guión)
    const patronNuevo = /^[A-Z]{4}-?[0-9]{2}$/;
    return patronNuevo.test(patente);
  }

  // === VALIDACIÓN FECHA ===
  validarFecha() {
    if (this.mesConsulta) {
      const fechaSeleccionada = new Date(this.mesConsulta);
      const hoy = new Date();
      
      if (fechaSeleccionada > hoy) {
        this.mostrarAlertaFechaInvalida();
        this.mesConsulta = '';
      }
    }
  }

  // === LÓGICA PRINCIPAL ===
  consultarDatosVehiculo() {
    // Validación de campos obligatorios
    if (!this.patente || !this.mesConsulta) {
      this.mostrarAlerta('Datos incompletos', 'Debe ingresar patente y mes de consulta');
      return;
    }

    // Validación específica de patente
    if (!this.validarFormatoPatente(this.patente)) {
      this.mostrarAlerta(
        'Patente inválida', 
        'El formato debe ser 4 letras + 2 números (ej: BBRR85 o ABCD-12)'
      );
      return;
    }

    // Validación de fecha futura
    if (new Date(this.mesConsulta) > new Date()) {
      this.mostrarAlertaFechaInvalida();
      return;
    }

    // Consulta exitosa
    this.datosConsultados = true;
    this.datosDisponibles = true;
    this.informeGenerado = false;
  }

  generarInforme() {
    if (!this.datosDisponibles) return;

    const datos = this.generarDatosAleatorios();
    const rendimiento = (datos.kilometraje / datos.combustible).toFixed(2);
    const periodo = new Date(this.mesConsulta).toLocaleDateString('es-CL', { 
      month: 'long', 
      year: 'numeric' 
    }).toUpperCase();

    this.informeHTML = `
      <div class="reporte-vehiculo">
        <h2>📋 INFORME DE OPERACIÓN</h2>
        
        <div class="encabezado">
          <p><strong>Patente:</strong> ${this.patente}</p>
          <p><strong>Período:</strong> ${periodo}</p>
        </div>
        
        <table class="tabla-datos">
          <thead>
            <tr>
              <th>Indicador</th>
              <th>Valor</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>🛣️ Kilometraje recorrido</td>
              <td>${datos.kilometraje.toLocaleString('es-CL')} km</td>
            </tr>
            <tr>
              <td>⛽ Combustible consumido</td>
              <td>${datos.combustible} litros</td>
            </tr>
            <tr>
              <td>⚡ Rendimiento</td>
              <td>${rendimiento} km/l</td>
            </tr>
            <tr>
              <td>💰 Ganancias generadas</td>
              <td>$${datos.ganancias.toLocaleString('es-CL')}</td>
            </tr>
          </tbody>
        </table>
        
        <div class="resumen">
          <p>📅 Fecha de generación: ${new Date().toLocaleDateString('es-CL')}</p>
        </div>
      </div>
    `;

    this.informeGenerado = true;
  }

  // === FUNCIONES AUXILIARES ===
  private async mostrarAlertaFechaInvalida() {
    const alert = await this.alertController.create({
      header: 'Fecha no válida',
      message: 'No puedes seleccionar una fecha futura para el informe',
      buttons: ['Entendido']
    });
    await alert.present();
  }

  private async mostrarAlerta(titulo: string, mensaje: string) {
    const alert = await this.alertController.create({
      header: titulo,
      message: mensaje,
      buttons: ['OK']
    });
    await alert.present();
  }

  // Datos simulados
  private generarDatosAleatorios() {
    return {
      kilometraje: Math.floor(Math.random() * 5000) + 1000,
      combustible: Math.floor(Math.random() * 400) + 100,
      ganancias: Math.floor(Math.random() * 10000000) + 1000000
    };
  }
}