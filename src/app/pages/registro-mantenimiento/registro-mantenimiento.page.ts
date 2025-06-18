import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormsModule,
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-registro-mantenimiento',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, IonicModule],
  templateUrl: './registro-mantenimiento.page.html',
  styleUrls: ['./registro-mantenimiento.page.scss'],
})
export class RegistroMantenimientoPage {
  formularioMantenimiento: FormGroup;
  vehiculoAsignado: string = 'Toyota Corolla 2020 - ABCD12'; 
  mensajeError: string | null = null;
  archivoAdjunto: File | null = null;
  fechaMin: string;
  fechaMax: string;

  constructor(
    private fb: FormBuilder,
    private firebase: FirebaseService,
    private utils: UtilsService
  ) {
    const hoy = new Date();
    const haceDiezAnios = new Date();
    haceDiezAnios.setFullYear(hoy.getFullYear() - 10);
    this.fechaMin = haceDiezAnios.toISOString().split('T')[0];
    this.fechaMax = hoy.toISOString().split('T')[0];

    this.formularioMantenimiento = this.fb.group({
      tipo: [
        { value: 'Cambio de aceite', disabled: true },
        Validators.required,
      ],
      fecha: ['', [Validators.required, this.fechaValida()]],
      costo: [
        '',
        [Validators.required, Validators.pattern(/^\$?\d+(\.\d{3})*$/)],
      ],
      archivo: [null, Validators.required],
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
      this.formularioMantenimiento
        .get('costo')
        ?.setValue(`$${numero}`, { emitEvent: false });
    }
  }

  async manejarArchivo(event: Event) {
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
        try {
          // Optimizamos solo imágenes (no PDFs)
          this.archivoAdjunto = archivo.type.startsWith('image/')
            ? await this.utils.optimizeImage(archivo)
            : archivo;

          this.formularioMantenimiento.patchValue({
            archivo: this.archivoAdjunto,
          });
          this.archivo?.setErrors(null);
        } catch (error) {
          console.error('Error al optimizar imagen:', error);
          this.handleFileError();
        }
      } else {
        this.handleFileError();
      }
    }
  }
  private handleFileError() {
    this.archivoAdjunto = null;
    this.formularioMantenimiento.patchValue({ archivo: null });
    this.archivo?.setErrors({ tipoInvalido: true });
  }
  async registrarMantenimiento() {
    if (this.formularioMantenimiento.valid && this.archivoAdjunto) {
      try {
        // Convertir a Base64 si es imagen
        const archivoParaGuardar = this.archivoAdjunto.type.startsWith('image/')
          ? await this.utils.imageToBase64(this.archivoAdjunto)
          : this.archivoAdjunto;

        const datosMantenimiento = {
          ...this.formularioMantenimiento.value,
          archivo: archivoParaGuardar,
          tipoArchivo: this.archivoAdjunto.type,
          nombreArchivo: this.archivoAdjunto.name,
        };

        await this.firebase.setDocument(
          `combustible/${this.formularioMantenimiento.value.fecha.replace(
            /-/g,
            ''
          )}`,
          datosMantenimiento
        );
        this.formularioMantenimiento.reset();
        console.log('Registro completado con archivo optimizado');
      } catch (error) {
        console.error('Error al registrar:', error);
      }
    } else {
      this.formularioMantenimiento.markAllAsTouched();
    }
  }
  get tipo() {
    return this.formularioMantenimiento.get('tipo');
  }
  get fecha() {
    return this.formularioMantenimiento.get('fecha');
  }
  get costo() {
    return this.formularioMantenimiento.get('costo');
  }
  get archivo() {
    return this.formularioMantenimiento.get('archivo');
  }
}
