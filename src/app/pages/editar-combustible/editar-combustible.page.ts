// src/app/pages/registro-combustible.page.ts
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
  selector: 'app-editar-combustible',
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule, ReactiveFormsModule],
  templateUrl: './editar-combustible.page.html',
  styleUrls: ['./editar-combustible.page.scss'],
})
export class EditarCombustiblePage {
  formularioCombustible: FormGroup;
  vehiculoAsignado: string = 'Toyota Corolla 2020 - ABCD12';
  archivoAdjunto: File | null = null;
  montoFormateado: String = ''; // Monto mostrado con puntos

  constructor(private fb: FormBuilder, private firebase: FirebaseService) {
    const hoy = new Date();
    const fechaFormateada = hoy.toLocaleDateString('es-CL'); // DD-MM-YYYY

    // Inicialización del formulario con validaciones básicas
    this.formularioCombustible = this.fb.group({
      fecha: [{ value: fechaFormateada, disabled: false }, Validators.required],
      monto: ['', [Validators.required, Validators.min(0)]],
      archivo: [null, Validators.required],
    });
  }

  // Manejar la carga de archivos
  manejarArchivo(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const archivo = input.files[0];
      const tiposPermitidos = [
        'image/png',
        'image/jpeg',
        'image/jpg',
        'image/heic',
        'application/pdf',
      ];

      if (tiposPermitidos.includes(archivo.type)) {
        this.archivoAdjunto = archivo;
        this.formularioCombustible.patchValue({ archivo: this.archivoAdjunto });
        this.archivo?.setErrors(null); // Limpia errores si los hubo
      } else {
        this.archivoAdjunto = null;
        this.formularioCombustible.patchValue({ archivo: null });
        this.archivo?.setErrors({ tipoInvalido: true });
      }
    }
  }

  agregarPuntos(valor: string): string {
    return valor.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  }

  formatearMonto(event: any) {
    const valorIngresado = event.target.value
      .replace(/\./g, '')
      .replace(/\D/g, '');
    if (valorIngresado) {
      this.montoFormateado = this.agregarPuntos(valorIngresado);
      this.formularioCombustible.patchValue({
        monto: parseInt(valorIngresado, 10),
      });
    } else {
      this.montoFormateado = '';
      this.formularioCombustible.patchValue({ monto: null });
    }
  }

  // Acción al enviar el formulario
  async registrarCombustible() {
    if (this.formularioCombustible.valid) {
      console.log('Datos registrados:', this.formularioCombustible.value);
      // Aquí se puede conectar a una API o guardar localmente
      try {
        await this.firebase.setDocument(
          'combustible/',
          this.formularioCombustible.value
        );
      } catch (error) {}
    } else {
      this.formularioCombustible.markAllAsTouched();
    }
  }

  get fecha() {
    return this.formularioCombustible.get('fecha');
  }

  get monto() {
    return this.formularioCombustible.get('monto');
  }

  get archivo() {
    return this.formularioCombustible.get('archivo');
  }
}