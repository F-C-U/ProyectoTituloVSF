import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';

@Component({
  selector: 'app-lista-kilometraje',
  templateUrl: './lista-kilometraje.page.html',
  styleUrls: ['./lista-kilometraje.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class ListaKilometrajePage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
