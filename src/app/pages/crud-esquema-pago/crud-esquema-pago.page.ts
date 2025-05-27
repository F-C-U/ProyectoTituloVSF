import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';

@Component({
  selector: 'app-crud-esquema-pago',
  templateUrl: './crud-esquema-pago.page.html',
  styleUrls: ['./crud-esquema-pago.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class CrudEsquemaPagoPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
