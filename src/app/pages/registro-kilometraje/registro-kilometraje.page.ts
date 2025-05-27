import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-registro-kilometraje',
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule, ReactiveFormsModule],
  templateUrl: './registro-kilometraje.page.html',
  styleUrls: ['./registro-kilometraje.page.scss']
})
export class RegistroKilometrajePage {
  formularioKilometraje: FormGroup;

  constructor(private fb: FormBuilder) {
    // Inicializamos el formulario con validaciones
    this.formularioKilometraje = this.fb.group({
      fecha: ['', Validators.required],
      kilometros: ['', [Validators.required, Validators.min(0)]]
    });
  }

  // Método que se ejecuta al enviar el formulario
  registrarKilometraje() {
    if (this.formularioKilometraje.valid) {
      console.log('Kilometraje registrado:', this.formularioKilometraje.value);
      // Aquí podrías enviar los datos a una API o servicio
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