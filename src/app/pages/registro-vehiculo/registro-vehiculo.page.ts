import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';

@Component({
  selector: 'app-registro-vehiculo',
  templateUrl: './registro-vehiculo.page.html',
  styleUrls: ['./registro-vehiculo.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class RegistroVehiculoPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
