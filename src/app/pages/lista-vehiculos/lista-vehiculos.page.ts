import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, ToastController } from '@ionic/angular';
import { NavigationExtras, RouterModule } from '@angular/router';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-lista-vehiculos',
  standalone: true,
  imports: [CommonModule, IonicModule, RouterModule],
  templateUrl: './lista-vehiculos.page.html',
  styleUrls: ['./lista-vehiculos.page.scss'],
})
export class ListaVehiculosPage {
  cargando = signal(true); // Estado de carga de la vista
  toastCtrl = inject(ToastController);

  constructor(private firebase: FirebaseService, private utils: UtilsService) {
    this.obtenerVehiculos();
  }

  registroVehiculos: {
    id: string;
    patente: string;
    modelo: string;
    anio: number;
    tipoCombustible: string;
  }[] = [];

  obtenerVehiculos() {
    let dueno = this.utils.getFromlocalStorage('usuario');
    // BUG FIX: El campo correcto es 'dueno', no 'uid'
    this.firebase
      .getCollectionWhere('vehiculos', 'dueno', '==', dueno.uid)
      .subscribe((data: any[]) => {
        this.registroVehiculos = data.map((vehiculo) => ({
          id: vehiculo.id, // Asegúrate de guardar el id del documento
          patente: vehiculo.patente,
          modelo: vehiculo.modelo,
          anio: vehiculo.anio,
          tipoCombustible: vehiculo.tipoCombustible,
        }));
      });
  }

  async mostrarError(mensaje: string) {
    const toast = await this.toastCtrl.create({
      message: mensaje,
      duration: 3000,
      color: 'danger',
    });
    toast.present();
  }

  editarVehiculo(vehiculoId: string) {
    let xtras: NavigationExtras = {
      state: {
        vehiculoId: vehiculoId,
      },
    };
    this.utils.routerLinkWithExtras('editar-vehiculo', xtras);
  }

  eliminarVehiculo(vehiculoId: string) {
    // BUG FIX: Eliminar usando el id del documento, no la patente
    this.firebase
      .deleteDocument('vehiculos/' + vehiculoId)
      .then(() => {
        this.obtenerVehiculos();
        this.mostrarError('Vehículo eliminado correctamente.');
      })
      .catch(() => {
        this.mostrarError('Error al eliminar el vehículo.');
      });
  }
}
