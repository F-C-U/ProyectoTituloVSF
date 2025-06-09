import { Component, Input } from '@angular/core';
import { 
  IonHeader, IonToolbar, IonTitle, IonContent, 
  IonItem, IonLabel, IonInput, IonButton, 
  IonTextarea, IonIcon, IonBadge, IonNote } from '@ionic/angular/standalone';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-confirmar-mantencion',
  templateUrl: './confirmar-mantencion.page.html',
  styleUrls: ['./confirmar-mantencion.page.scss'],
  standalone: true,
  imports: [IonNote, IonBadge, 
    IonHeader, IonToolbar, IonTitle, IonContent,
    IonItem, IonLabel, IonInput, IonButton,
    IonTextarea, IonIcon,
    FormsModule, CommonModule
  ]
})
export class ConfirmarMantencionPage {
  @Input() alerta: any;

  mantencion = {
    fecha: '',
    costo: null as number | null,
    factura: null as File | null,
    comentarios: ''
  };

  // *** Nueva función para validar costo positivo ***
  actualizarCosto(event: any) {
    const valor = parseFloat(event.target.value);
    this.mantencion.costo = isNaN(valor) ? null : Math.max(0, valor); // Fuerza mínimo 0
  }

  get formValido(): boolean {
    return !!this.mantencion.fecha && this.mantencion.costo !== null;
  }

  onFileSelected(event: any) {
    this.mantencion.factura = event.target.files[0];
  }

  guardar() {
    if (this.formValido) {
      console.log('Datos guardados:', { 
        ...this.alerta, 
        ...this.mantencion,
        estado: 'resuelto'
      });
    }
  }
}