import { Component, Input } from '@angular/core';
import { 
  IonHeader, IonToolbar, IonTitle, IonContent, 
  IonItem, IonLabel, IonInput, IonButton, 
  IonTextarea, IonIcon, IonBadge } from '@ionic/angular/standalone';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-confirmar-mantencion',
  templateUrl: './confirmar-mantencion.page.html',
  styleUrls: ['./confirmar-mantencion.page.scss'],
  standalone: true,
  imports: [IonBadge, 
    IonHeader, IonToolbar, IonTitle, IonContent,
    IonItem, IonLabel, IonInput, IonButton,
    IonTextarea, IonIcon,
    FormsModule, CommonModule
  ]
})
export class ConfirmarMantencionPage {
  @Input() alerta: any; // Recibe la alerta desde la página anterior

  mantencion = {
    fecha: '',
    costo: null as number | null,
    factura: null as File | null,
    comentarios: ''
  };

  // Validación de campos obligatorios
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
      // Aquí iría la lógica para enviar a tu API/servicio
    }
  }
}