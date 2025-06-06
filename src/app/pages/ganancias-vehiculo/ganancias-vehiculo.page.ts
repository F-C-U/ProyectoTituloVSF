import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonItem,
  IonLabel,
  IonNote
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-ganancias-vehiculo',
  templateUrl: './ganancias-vehiculo.page.html',
  styleUrls: ['./ganancias-vehiculo.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonItem,
    IonLabel,
    IonNote
  ]
})
export class GananciasVehiculoPage implements OnInit {
  vehiculoAsignado: string = 'Toyota Corolla 2020 - ABCD12';

  gananciaBruta: number = 100000;
  deduccionEsquema: number = 20000;
  deduccionCombustible: number = 15000;

  // comentario pa cerrar la tarea
  get gananciaNeta(): number {
    return this.gananciaBruta - this.deduccionEsquema - this.deduccionCombustible;
  }

  constructor() { }

  ngOnInit() {}
}