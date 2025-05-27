import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';

@Component({
  selector: 'app-registro-esquema-pago',
  templateUrl: './registro-esquema-pago.page.html',
  styleUrls: ['./registro-esquema-pago.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class RegistroEsquemaPagoPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
