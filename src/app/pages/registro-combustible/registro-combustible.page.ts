// src/app/pages/registro-combustible.page.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-registro-combustible',
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule, ReactiveFormsModule],
  templateUrl: './registro-combustible.page.html',
  styleUrls: ['./registro-combustible.page.scss']
})
export class RegistroCombustiblePage {
  formularioCombustible: FormGroup;
  vehiculoAsignado: string = 'Toyota Corolla 2020 - ABCD12';
  archivoAdjunto: File | null = null;

  constructor(private fb: FormBuilder) {
    // Inicialización del formulario con validaciones básicas
    this.formularioCombustible = this.fb.group({
      fecha: ['', Validators.required],
      monto: ['', [Validators.required, Validators.min(0)]],
      archivo: [null]
    });
  }

  // Manejar la carga de archivos
  manejarArchivo(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.archivoAdjunto = input.files[0];
      this.formularioCombustible.patchValue({ archivo: this.archivoAdjunto });
    }
  }

  // Acción al enviar el formulario
  registrarCombustible() {
    if (this.formularioCombustible.valid) {
      console.log('Datos registrados:', this.formularioCombustible.value);
      // Aquí se puede conectar a una API o guardar localmente
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
} 