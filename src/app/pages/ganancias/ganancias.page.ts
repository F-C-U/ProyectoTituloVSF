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
  selector: 'app-ganancias',
  templateUrl: './ganancias.page.html',
  styleUrls: ['./ganancias.page.scss'],
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
export class GananciasPage implements OnInit {
  conductor: string = 'Vito Bozzano';

  gananciaBruta: number = 100000;
  deduccionEsquema: number = 20000;
  deduccionCombustible: number = 15000;

  get gananciaNeta(): number {
    return this.gananciaBruta - this.deduccionEsquema - this.deduccionCombustible;
  }

  constructor() { }

  ngOnInit() {}
}