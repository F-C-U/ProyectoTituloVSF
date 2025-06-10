import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
// <--- Importar ToastController
import { AlertController, ToastController } from '@ionic/angular';

interface EsquemaPago {
  nombre: string;
  montoFijo?: number;
  porcentaje?: number;
}

@Component({
  selector: 'app-lista-esquemas',
  templateUrl: './lista-esquemas.page.html',
  styleUrls: ['./lista-esquemas.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class ListaEsquemasPage implements OnInit {
  esquemasDePago: EsquemaPago[] = [];
  cargando: boolean = true;
  errorCarga: boolean = false;
  mensajeError: string = '';

  // <--- Inyectar ToastController
  constructor(
    private router: Router,
    private alertController: AlertController,
    private toastController: ToastController // <-- Inyección del ToastController
  ) { }

  ngOnInit() {
    setTimeout(() => {
      try {
        this.esquemasDePago = this.generarEsquemasDePagoFalsos();
        this.cargando = false;
      } catch (error) {
        this.errorCarga = true;
        this.mensajeError = 'Hubo un error al cargar los esquemas de pago. Por favor, inténtelo de nuevo más tarde.';
        console.error('Error al cargar esquemas de pago:', error);
        this.cargando = false;
      }
    }, 1500);
  }

  private generarEsquemasDePagoFalsos(): EsquemaPago[] {
    return [
      { nombre: '$ Juanito', montoFijo: 50000 },
      { nombre: '% Vito', porcentaje: 30 },
      { nombre: '$ Pancho', montoFijo: 15000 },
      { nombre: '% Fran', porcentaje: 15 },
      { nombre: '$ Zed', montoFijo: 120000 }, // Corregido 'montoFonto' a 'montoFijo'
      { nombre: '% Sofia', porcentaje: 5 },
      { nombre: '$ Miguel', montoFijo: 25000 }
    ];
  }

  async refrescarEsquemas(event?: any) {
    this.cargando = true;
    this.errorCarga = false;
    this.mensajeError = '';

    setTimeout(() => {
      try {
        this.esquemasDePago = this.generarEsquemasDePagoFalsos();
        this.cargando = false;
        if (event) {
          event.target.complete();
        }
      } catch (error) {
        this.errorCarga = true;
        this.mensajeError = 'Hubo un error al refrescar los esquemas de pago.';
        console.error('Error al refrescar esquemas de pago:', error);
        this.cargando = false;
        if (event) {
          event.target.complete();
        }
      }
    }, 1000);
  }

  formatearMontoFijo(monto: number): string {
    return new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(monto);
  }

  formatearPorcentaje(porcentaje: number): string {
    return `${porcentaje}%`;
  }

  asignarEsquema(esquema: EsquemaPago) {
    console.log('Asignar esquema:', esquema);
    this.router.navigate(['/asignar-esquema-pago'], {
      queryParams: {
        esquema: JSON.stringify(esquema)
      }
    });
  }

  editarEsquema(esquema: EsquemaPago) {
    console.log('Editar esquema:', esquema);
    // En una aplicación real, esto redirigiría a una página de edición o abriría un modal
    this.presentToast(`Editar esquema: ${esquema.nombre}`, 'warning');
    // Ejemplo de redirección a una página de edición (asumiendo que existe una ruta /editar-esquema-pago)
    // this.router.navigate(['/editar-esquema-pago'], {
    //   queryParams: { esquema: JSON.stringify(esquema) }
    // });
  }

  async eliminarEsquema(esquema: EsquemaPago, index: number) {
    const alert = await this.alertController.create({
      header: 'Confirmar eliminación',
      message: `¿Estás seguro de que quieres eliminar el esquema "${esquema.nombre}"? Esta acción no se puede deshacer.`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Eliminación cancelada');
          }
        },
        {
          text: 'Eliminar',
          cssClass: 'danger',
          handler: async () => { // <--- Convertir handler a async para usar await en presentToast
            console.log('Eliminar esquema:', esquema);
            // Simular eliminación del array (en una app real, aquí llamarías a un servicio)
            this.esquemasDePago.splice(index, 1);
            // <--- Usar presentToast en lugar de alert()
            await this.presentToast(`Esquema "${esquema.nombre}" eliminado correctamente.`, 'success');
          }
        }
      ]
    });

    await alert.present();
  }

  /**
   * Método de utilidad para presentar un Toast (mensaje temporal).
   * @param message El mensaje a mostrar.
   * @param color El color del toast (primary, success, warning, danger, etc.).
   * @param duration Duración en milisegundos (defecto: 2000).
   */
  async presentToast(message: string, color: string = 'primary', duration: number = 2000) {
    const toast = await this.toastController.create({
      message: message,
      duration: duration,
      color: color,
      position: 'bottom' // Puedes cambiar la posición (top, middle, bottom)
    });
    toast.present();
  }
}