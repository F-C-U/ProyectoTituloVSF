import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormsModule,
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-editar-kilometraje',
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule, ReactiveFormsModule],
  templateUrl: './editar-kilometraje.page.html',
  styleUrls: ['./editar-kilometraje.page.scss'],
})
export class EditarKilometrajePage {
  formularioKilometraje: FormGroup;
  fechaActual: string = new Date().toISOString().split('T')[0];

  constructor(private fb: FormBuilder) {
    // Formateamos la fecha actual en formato DD-MM-YYYY
    const fecha = new Date();
    const dia = String(fecha.getDate()).padStart(2, '0');
    const mes = String(fecha.getMonth() + 1).padStart(2, '0');
    const anio = fecha.getFullYear();
    this.fechaActual = `${dia}-${mes}-${anio}`;

    // Inicializamos el formulario con validaciones
    this.formularioKilometraje = this.fb.group({
      kilometros: ['', [Validators.required, Validators.min(0)]],
    });
  }

  // Valor simulado por ahora
  vehiculoAsignado = 'Toyota Corolla 2020 - ABCD12';

  // Método que se ejecuta al enviar el formulario
  editarKilometraje() {
    if (this.formularioKilometraje.valid) {
      const datos = {
        vehiculo: this.vehiculoAsignado,
        ...this.formularioKilometraje.value,
        fecha: this.fechaActual
      };

      try {
        console.log('Cambios guardados:', datos);
      } catch (error) {
        console.error('Error al editar kilometraje:', error);
      }
    } else {
      this.formularioKilometraje.markAllAsTouched();
    }
  }

  // Getters para mostrar errores en la plantilla
  get fecha() {
    return this.formularioKilometraje.get('fecha');
  }

  get kilometros() {
    return this.formularioKilometraje.get('kilometros');
  }
}