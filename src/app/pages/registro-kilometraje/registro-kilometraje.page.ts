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
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-registro-kilometraje',
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule, ReactiveFormsModule],
  templateUrl: './registro-kilometraje.page.html',
  styleUrls: ['./registro-kilometraje.page.scss'],
})
export class RegistroKilometrajePage {
  formularioKilometraje: FormGroup;

  constructor(private fb: FormBuilder, private firebase: FirebaseService) {
    // Inicializamos el formulario con validaciones
    this.formularioKilometraje = this.fb.group({
      fecha: ['', Validators.required],
      kilometros: ['', [Validators.required, Validators.min(0)]],
    });
  }

  // Valor simulado por ahora
  vehiculoAsignado = 'Toyota Corolla 2020 - ABCD12';

  // Método que se ejecuta al enviar el formulario
  registrarKilometraje() {
    if (this.formularioKilometraje.valid) {
      console.log('Kilometraje registrado:', this.formularioKilometraje.value);
      // Aquí podrías enviar los datos a una API o servicio
      try {
        this.firebase.setDocument(
          'kilometraje/' + this.formularioKilometraje.value.fecha,
          this.formularioKilometraje.value
        );
      } catch (error) {}
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
