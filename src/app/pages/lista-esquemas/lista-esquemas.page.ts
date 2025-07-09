import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { FirebaseService } from 'src/app/services/firebase.service'; // <--- Importa tu servicio
import { UtilsService } from 'src/app/services/utils.service';

interface EsquemaPago {
  id?: string;
  nombre: string;
  montoFijo?: number;
  porcentaje?: number;
  tipo?: string;
  conductor?: string;
}

@Component({
  selector: 'app-lista-esquemas',
  templateUrl: './lista-esquemas.page.html',
  styleUrls: ['./lista-esquemas.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class ListaEsquemasPage implements OnInit {
  esquemasDePago: EsquemaPago[] = [];
  cargando: boolean = true;
  errorCarga: boolean = false;
  mensajeError: string = '';

  constructor(
    private router: Router,
    private alertController: AlertController,
    private toastController: ToastController,
    private firebase: FirebaseService, // <--- Inyecta el servicio
    private utils: UtilsService
  ) {}

  ngOnInit() {
    this.obtenerEsquemasDePago();
  }

  obtenerEsquemasDePago(event?: any) {
    this.cargando = true;
    this.errorCarga = false;
    this.mensajeError = '';

    // Obtén el usuario actual desde localStorage
    const uid = this.utils.getFromlocalStorage('usuario')?.uid;

    if (!uid) {
      this.esquemasDePago = [];
      this.cargando = false;
      this.errorCarga = true;
      this.mensajeError = 'No se pudo identificar el usuario actual.';
      if (event) event.target.complete();
      return;
    }

    // Filtra por el campo 'dueno' igual al UID del usuario actual
    this.firebase
      .getCollectionWhere('esquema_pago', 'dueno', '==', uid)
      .subscribe({
        next: (data: any[]) => {
          this.esquemasDePago = data.map((item) => ({
            id: item.id,
            nombre: item.nombreEsquema,
            montoFijo: item.montoMensual,
            porcentaje: item.porcentajeGanancia,
            tipo: item.tipo,
            conductor: item.conductor,
          }));
          this.cargando = false;
          if (event) {
            event.target.complete();
          }
        },
        error: (error) => {
          this.errorCarga = true;
          this.mensajeError =
            'Hubo un error al cargar los esquemas de pago. Por favor, inténtelo de nuevo más tarde.';
          console.error('Error al cargar esquemas de pago:', error);
          this.cargando = false;
          if (event) {
            event.target.complete();
          }
        },
      });
  }

  async refrescarEsquemas(event?: any) {
    this.obtenerEsquemasDePago(event);
  }

  formatearMontoFijo(monto: number): string {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP',
    }).format(monto);
  }

  formatearPorcentaje(porcentaje: number): string {
    return `${porcentaje}%`;
  }

  asignarEsquema(esquema: EsquemaPago) {
    this.router.navigate(['/asignar-esquema-pago'], {
      queryParams: {
        esquema: JSON.stringify(esquema),
      },
    });
  }

  editarEsquema(esquema: EsquemaPago) {
    this.presentToast(`Editar esquema: ${esquema.nombre}`, 'warning');
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
            // Cancelado
          },
        },
        {
          text: 'Eliminar',
          cssClass: 'danger',
          handler: async () => {
            // Elimina de Firebase usando el id
            if (esquema.id) {
              await this.firebase.deleteDocument(`esquemasPago/${esquema.id}`);
              this.esquemasDePago = this.esquemasDePago.filter(
                (e) => e.id !== esquema.id
              );
              await this.presentToast(
                `Esquema "${esquema.nombre}" eliminado correctamente.`,
                'success'
              );
            }
          },
        },
      ],
    });

    await alert.present();
  }

  async presentToast(
    message: string,
    color: string = 'primary',
    duration: number = 2000
  ) {
    const toast = await this.toastController.create({
      message: message,
      duration: duration,
      color: color,
      position: 'bottom',
    });
    toast.present();
  }
}
