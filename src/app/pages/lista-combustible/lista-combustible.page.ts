import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';

@Component({
  selector: 'app-lista-combustible',
  templateUrl: './lista-combustible.page.html',
  styleUrls: ['./lista-combustible.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class ListaCombustiblePage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
