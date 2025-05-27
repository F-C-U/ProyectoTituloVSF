import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';

@Component({
  selector: 'app-lista-vehiculos',
  templateUrl: './lista-vehiculos.page.html',
  styleUrls: ['./lista-vehiculos.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class ListaVehiculosPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
