import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';

@Component({
  selector: 'app-mantenimiento',
  templateUrl: './mantenimiento.page.html',
  styleUrls: ['./mantenimiento.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class MantenimientoPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
