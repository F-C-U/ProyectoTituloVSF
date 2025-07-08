import { Component, Input } from '@angular/core';
import { 
  AlertController
} from '@ionic/angular/standalone';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-registrar-ganancia',
  templateUrl: './registrar-ganancia.page.html',
  styleUrls: ['./registrar-ganancia.page.scss'],
  standalone: true,
  imports: [
    FormsModule, CommonModule
  ]
})
export class RegistrarGananciaPage {
  @Input() patente: string = '';
  ganancia: number | null = null;
  fechaRegistro: string = new Date().toISOString();

  constructor(private alertController: AlertController) {}

  // === MÉTODOS NUEVOS PARA BOTONES DE INCREMENTO ===
  ajustarMonto(incremento: number) {
    this.ganancia = (this.ganancia || 0) + incremento;
    this.validarMonto(); // Validación inmediata después del ajuste
  }

  validarMonto() {
    if (this.ganancia !== null && this.ganancia < 0) {
      this.ganancia = 0;
      this.mostrarAlerta(
        'Ajuste automático', 
        'El monto no puede ser negativo. Se estableció a $0'
      );
    }
  }

  // === VALIDACIÓN MEJORADA PARA NÚMEROS NEGATIVOS ===
  validarGanancia(event: KeyboardEvent) {
    const inputChar = event.key;
    const currentValue = (event.target as HTMLInputElement).value;

    // Permitir teclas de control
    if ([
      'Backspace', 'Delete', 'Tab', 
      'ArrowLeft', 'ArrowRight', 'Enter',
      '.', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'
    ].includes(inputChar)) {
      return;
    }

    // Bloquear signo negativo explícitamente
    if (inputChar === '-' || inputChar === '+') {
      event.preventDefault();
      return;
    }

    // Bloquear cualquier otro carácter no numérico
    if (!/\d/.test(inputChar)) {
      event.preventDefault();
    }

    // Validación adicional para el primer carácter
    if (currentValue === '' && inputChar === '0') {
      event.preventDefault();
    }
  }

  // Validación al perder foco
  formatearGanancia() {
    if (this.ganancia !== null) {
      // Eliminar ceros innecesarios al inicio
      this.ganancia = Number(this.ganancia.toString().replace(/^0+/, ''));
      this.validarMonto(); // Validación adicional
    }
  }

  registrarGanancia() {
    // Validación final reforzada
    if (this.ganancia === null || isNaN(this.ganancia) || this.ganancia <= 0) {
      this.mostrarAlerta(
        'Valor inválido', 
        'Debe ingresar una ganancia mayor a $0'
      );
      return;
    }

    // Lógica de registro
    const registro = {
      patente: this.patente,
      ganancia: this.ganancia,
      fecha: new Date(this.fechaRegistro).toLocaleDateString('es-CL'),
      timestamp: new Date().toISOString()
    };

    console.log('Registro exitoso:', registro);
    this.mostrarAlerta(
      'Registro exitoso', 
      `Se registró una ganancia de $${this.ganancia.toLocaleString('es-CL')} para ${this.patente}`
    );
    this.ganancia = null;
  }

  private async mostrarAlerta(titulo: string, mensaje: string) {
    const alert = await this.alertController.create({
      header: titulo,
      message: mensaje,
      buttons: ['OK']
    });
    await alert.present();
  }
}