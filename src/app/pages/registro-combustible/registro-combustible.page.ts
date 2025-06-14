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
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-registro-combustible',
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule, ReactiveFormsModule],
  templateUrl: './registro-combustible.page.html',
  styleUrls: ['./registro-combustible.page.scss'],
})
export class RegistroCombustiblePage {
  formularioCombustible: FormGroup;
  vehiculoAsignado: string = 'Toyota Corolla 2020 - ABCD12';
  archivoAdjunto: File | null = null;
  montoFormateado: String = ''; // Monto mostrado con puntos

  constructor(
    private fb: FormBuilder,
    private firebase: FirebaseService,
    private utils: UtilsService
  ) {
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

          this.formularioCombustible.patchValue({
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
    this.formularioCombustible.patchValue({ archivo: null });
    this.archivo?.setErrors({ tipoInvalido: true });
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
    if (this.formularioCombustible.valid && this.archivoAdjunto) {
      const loading = await this.utils.loading();
      await loading.present();
      try {
        // Convertir a Base64 si es imagen
        const archivoParaGuardar = this.archivoAdjunto.type.startsWith('image/')
          ? await this.utils.imageToBase64(this.archivoAdjunto)
          : this.archivoAdjunto;

        const datosCombustible = {
          ...this.formularioCombustible.value,
          vehiculo: this.vehiculoAsignado,
          archivo: archivoParaGuardar,
          tipoArchivo: this.archivoAdjunto.type,
          nombreArchivo: this.archivoAdjunto.name,
        };

        await this.firebase.setDocument(
          `combustible/${this.formularioCombustible.value.fecha.replace(
            /-/g,
            ''
          )}`,
          datosCombustible
        );
      } catch (error) {
        console.error('Error al registrar:', error);
        this.utils.presentToast({
          message: 'Error al guardar el registro de combustible.',
          duration: 2000,
          color: 'danger',
        });
      } finally {
        loading.dismiss();
        this.utils.presentToast({
          message: 'Registro de combustible guardado exitosamente.',
          duration: 2000,
          color: 'success',
        });
        this.formularioCombustible.reset();
        this.archivoAdjunto = null;
        this.montoFormateado = '';
      }
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
