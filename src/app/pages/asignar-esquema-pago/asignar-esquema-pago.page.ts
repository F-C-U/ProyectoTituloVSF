import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-asignar-esquema-pago',
  templateUrl: './asignar-esquema-pago.page.html',
  styleUrls: ['./asignar-esquema-pago.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule, ReactiveFormsModule],
})
export class AsignarEsquemaPagoPage implements OnInit {
  conductorSeleccionado: string = '';
  esquemaSeleccionado: string = '';
  conductores = ['Vito Bozzano', 'Vito 2', 'Vito 3']; // Demo
  esquemas = ['Cuota fija', 'Porcentaje']; // Demo

  constructor(private toastController: ToastController) {}

  ngOnInit() {}

  async asignarEsquema() {
    if (!this.conductorSeleccionado || !this.esquemaSeleccionado) {
      const toast = await this.toastController.create({
        message: 'Debe seleccionar un conductor y un esquema de pago.',
        duration: 2000,
        color: 'warning',
        position: 'bottom'
      });
      toast.present();
      return;
    }

    console.log('Conductor seleccionado:', this.conductorSeleccionado);
    console.log('Esquema seleccionado:', this.esquemaSeleccionado);

    const toast = await this.toastController.create({
      message: 'Esquema asignado con éxito',
      duration: 2000,
      color: 'success',
      position: 'bottom'
    });
    toast.present();
  }
}