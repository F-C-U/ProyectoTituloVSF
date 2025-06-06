import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, ToastController } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-mantenimiento',
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule],
  templateUrl: './mantenimiento.page.html',
  styleUrls: ['./mantenimiento.page.scss']
})
export class MantenimientoPage {
  // Objeto para almacenar los valores ingresados por tipo de mantenimiento
  configuraciones: { [tipo: string]: number | null } = {
    'Cambio de aceite': null,
    'Filtro de aire': null,
    // Puedes agregar más tipos aquí según sea necesario
  };

  constructor(private toastController: ToastController) {}

  // Función para guardar el intervalo ingresado por tipo de mantenimiento
  async guardar(tipo: string) {
    const valor = this.configuraciones[tipo];

    // Validación de entrada
    if (valor === null || isNaN(valor) || valor <= 0) {
      this.mostrarToast('Por favor ingrese un kilometraje válido para ' + tipo, 'danger');
      return;
    }

    // Aquí puedes implementar lógica para guardar en almacenamiento local o enviar a un backend
    console.log(`Guardado: ${tipo} - Cada ${valor} km`);

    await this.mostrarToast(`Configuración guardada para ${tipo}`, 'success');
  }

  // Mostrar notificaciones tipo toast para retroalimentación
  async mostrarToast(mensaje: string, color: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000,
      color: color,
      position: 'bottom'
    });
    await toast.present();
  }

  get tiposMantenimiento(): string[] {
    return Object.keys(this.configuraciones);
  }
}