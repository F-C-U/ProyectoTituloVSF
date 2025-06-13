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
  fechaActual: Date = new Date(); // Fecha automática
  vehiculoAsignado = 'Toyota Corolla 2020 - ABCD12'; // Valor simulado

  constructor(private fb: FormBuilder, private firebase: FirebaseService) {
    // Formulario simplificado (sin campo fecha editable)
    this.formularioKilometraje = this.fb.group({
      kilometros: ['', [Validators.required, Validators.min(0)]]
    });
  }

  registrarKilometraje() {
    if (this.formularioKilometraje.valid) {
      // Paquete de datos con fecha automática
      const registro = {
        ...this.formularioKilometraje.value,
        fecha: this.fechaActual.toISOString(), // Formato ISO para Firebase
        vehiculo: this.vehiculoAsignado // Agrega referencia al vehículo
      };

      console.log('Registrando:', registro);
      
      // Firebase: Usamos timestamp como ID del documento
      try {
        this.firebase.setDocument(
          `kilometraje/${this.fechaActual.getTime()}`, // ID único
          registro
        );
        this.mostrarConfirmacion();
      } catch (error) {
        console.error('Error en Firebase:', error);
      }
    } else {
      this.formularioKilometraje.markAllAsTouched();
    }
  }

  // Método auxiliar para feedback visual (opcional)
  private mostrarConfirmacion() {
    // Aquí puedes implementar un toast o alerta
    console.log('¡Registro exitoso!');
  }

  // Getter simplificado (solo para kilómetros)
  get kilometros() {
    return this.formularioKilometraje.get('kilometros');
  }

  // Eliminado el getter de fecha ya que no es necesario
}