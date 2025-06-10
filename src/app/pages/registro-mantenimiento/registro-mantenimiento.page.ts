import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-registro-mantenimiento',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, IonicModule],
  templateUrl: './registro-mantenimiento.page.html',
  styleUrls: ['./registro-mantenimiento.page.scss'],
})

export class RegistroMantenimientoPage {
  formularioMantenimiento: FormGroup;
  mensajeError: string | null = null;
  archivoSeleccionado: File | null = null;
  fechaMin: string;
  fechaMax: string;

  constructor(private fb: FormBuilder,private firebase: FirebaseService) {
    const hoy = new Date();
    const haceDiezAnios = new Date();
    haceDiezAnios.setFullYear(hoy.getFullYear() - 10);
    this.fechaMin = haceDiezAnios.toISOString().split('T')[0];
    this.fechaMax = hoy.toISOString().split('T')[0];

    this.formularioMantenimiento = this.fb.group({
      tipo: [{ value: 'Cambio de aceite', disabled: true }, Validators.required],
      fecha: ['', [Validators.required, this.fechaValida()]],
      costo: ['', [Validators.required, Validators.pattern(/^\$?\d+(\.\d{1,2})?$/)]],
    });
  }

  // Validador personalizado para la fecha
  fechaValida(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const valor = control.value;
      if (!valor) return null;

      const fecha = new Date(valor);
      const hoy = new Date();
      const haceDiezAnios = new Date();
      haceDiezAnios.setFullYear(hoy.getFullYear() - 10);

      if (fecha > hoy) {
        return { fechaMayorAHoy: true };
      }

      if (fecha < haceDiezAnios) {
        return { fechaMuyAntigua: true };
      }

      return null;
    };
  }

  // Formatea el costo a CLP al escribir
  formatearCosto(event: any) {
    let valor = event.target.value.replace(/[^\d]/g, '');
    if (valor) {
      const numero = parseInt(valor, 10).toLocaleString('es-CL');
      this.formularioMantenimiento.get('costo')?.setValue(`$${numero}`, { emitEvent: false });
    }
  }

  manejarArchivo(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const archivo = input.files[0];
      const formatosPermitidos = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png', 'image/heic'];

      if (!formatosPermitidos.includes(archivo.type)) {
        this.mensajeError = 'Formato de archivo no permitido.';
        this.archivoSeleccionado = null;
        return;
      }

      this.archivoSeleccionado = archivo;
      this.mensajeError = null;
    }
  }

  registrarMantenimiento() {
    if (this.formularioMantenimiento.invalid || !this.archivoSeleccionado) {
      this.mensajeError = 'Todos los campos deben estar completos y el archivo debe ser válido.';
      return;
    }
    this.firebase.setDocument("mantenimientos/"+this.formularioMantenimiento.value.fecha,this.formularioMantenimiento.value)
    console.log('Datos enviados:', this.formularioMantenimiento.getRawValue(), this.archivoSeleccionado);
    this.mensajeError = null;
  }
}