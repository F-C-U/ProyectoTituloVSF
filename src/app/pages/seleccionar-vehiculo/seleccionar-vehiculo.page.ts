import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-seleccionar-vehiculo',
  templateUrl: './seleccionar-vehiculo.page.html',
  styleUrls: ['./seleccionar-vehiculo.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
  ], schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class SeleccionarVehiculoPage {
  vehiculos = [
    { patente: 'AB-CD-12', marca: 'Toyota', modelo: 'Corolla' },
    { patente: 'XY-ZG-87', marca: 'Hyundai', modelo: 'Elantra' },
    { patente: 'DT-FX-56', marca: 'Chevrolet', modelo: 'Sail' },
  ];

  vehiculoSeleccionado: any = null;

  constructor(
    private router: Router,
    private utils: UtilsService,
  ) {}

  async confirmarSeleccion() {
    const v = this.vehiculoSeleccionado;
    console.log('Pasa la wea de auto', v)

    await this.utils.presentToast({
      message: `Vehículo seleccionado: ${v.patente} ${v.marca} ${v.modelo}`,
      duration: 3000,
      position: 'bottom',
      color: 'success'
    });
    this.router.navigate(['/home']);
  }
}
