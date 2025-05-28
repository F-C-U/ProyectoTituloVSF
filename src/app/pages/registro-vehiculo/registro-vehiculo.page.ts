// src/app/pages/registro-vehiculo.page.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-registro-vehiculo',
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule, ReactiveFormsModule],
  templateUrl: './registro-vehiculo.page.html',
  styleUrls: ['./registro-vehiculo.page.scss']
})
export class RegistroVehiculoPage {
  vehiculoForm: FormGroup;

  constructor(private fb: FormBuilder) {
    // Inicializamos el formulario con validaciones básicas
    this.vehiculoForm = this.fb.group({
      patente: ['', [Validators.required, Validators.pattern(/^[A-Z]{4}[0-9]{2}$/)]],
      modelo: ['', [Validators.required, Validators.maxLength(50)]],
      anio: ['', [Validators.required, Validators.min(1900), Validators.max(new Date().getFullYear())]],
      tipoCombustible: ['', Validators.required],
      activo: [false] // valor por defecto
    });
  }

  procesarPatente(event: any) {
    let valor = event.target.value.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 6);

    this.vehiculoForm.get('patente')?.setValue(valor);
    this.vehiculoForm.get('patente')?.markAsTouched();
    this.vehiculoForm.get('patente')?.updateValueAndValidity();

    let formateado = valor;
    if (valor.length >= 5) {
      formateado = valor.slice(0, 2) + '-' + valor.slice(2, 4) + '-' + valor.slice(4);
    } else if (valor.length >= 3) {
      formateado = valor.slice(0, 2) + '-' + valor.slice(2);
    }

    this.vehiculoForm.patchValue({ patente: valor }, { emitEvent: false });
    event.target.value = formateado;
  }

  formatearPatente(valor: string): string {
    valor = valor.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 6);
    if (valor.length >= 5) {
      return valor.slice(0, 2) + '-' + valor.slice(2, 4) + '-' + valor.slice(4);
    } else if (valor.length >= 3) {
      return valor.slice(0, 2) + '-' + valor.slice(2);
    }
    return valor;
  }

  // Método para manejar el envío del formulario
  onSubmit() {
    if (this.vehiculoForm.valid) {
      console.log('Formulario enviado:', this.vehiculoForm.value);
      // Aquí podrías enviar los datos a una API, por ejemplo
    } else {
      this.vehiculoForm.markAllAsTouched();
    }
  }

  // Métodos de ayuda para mostrar errores en la plantilla
  get patente() {
    return this.vehiculoForm.get('patente');
  }

  get modelo() {
    return this.vehiculoForm.get('modelo');
  }

  get anio() {
    return this.vehiculoForm.get('anio');
  }

  get tipoCombustible() {
    return this.vehiculoForm.get('tipoCombustible');
  }
}