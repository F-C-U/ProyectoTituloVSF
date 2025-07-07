import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UtilsService } from 'src/app/services/utils.service';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-seleccionar-vehiculo',
  templateUrl: './seleccionar-vehiculo.page.html',
  styleUrls: ['./seleccionar-vehiculo.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SeleccionarVehiculoPage {
  vehiculos: any[] = [];

  vehiculoSeleccionado: any = null;

  constructor(private utils: UtilsService, private firebase: FirebaseService) {}

  ngOnInit() {
    this.cargarVehiculos();
  }
  async cargarVehiculos() {
    // Obtiene el usuario actual desde localStorage
    const usuario = this.utils.getFromlocalStorage('usuario');
    if (!usuario || !usuario.uid) {
      this.vehiculos = [];
      return;
    }

    // Consulta los vehículos cuyo campo 'dueno' coincide con el UID del usuario
    this.firebase
      .getCollectionWhere('vehiculos', 'dueno', '==', usuario.uid)
      .subscribe((vehiculos: any[]) => {
        this.vehiculos = vehiculos;
      });
  }
  async confirmarSeleccion() {
    const v = this.vehiculoSeleccionado;
    this.utils.saveInLocalStorage('vehiculo', v);
    await this.utils.presentToast({
      message: `Vehículo seleccionado: ${v.patente} ${v.marca} ${v.modelo}`,
      duration: 3000,
      position: 'bottom',
      color: 'success',
    });
    this.utils.routerLink('home');
  }
}
