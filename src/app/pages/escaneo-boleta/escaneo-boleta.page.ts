import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';

@Component({
  selector: 'app-escaneo-boleta',
  templateUrl: './escaneo-boleta.page.html',
  styleUrls: ['./escaneo-boleta.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class EscaneoBoletaPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
