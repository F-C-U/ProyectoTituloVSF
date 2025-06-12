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
    patente: string;
    modelo: string;
    anio: number;
    tipoCombustible: string;
  }[] = [];

  obtenerVehiculos() {
    this.firebase.getCollection('vehiculos').subscribe((data: any[]) => {
      this.registroVehiculos = data.map((vehiculo) => ({
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
    this.firebase.deleteDocument('vehiculos/' + vehiculoId);
  }
}
