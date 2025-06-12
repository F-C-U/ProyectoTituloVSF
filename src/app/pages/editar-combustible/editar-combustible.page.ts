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
  selector: 'app-editar-combustible',
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule, ReactiveFormsModule],
  templateUrl: './editar-combustible.page.html',
  styleUrls: ['./editar-combustible.page.scss'],
})
export class EditarCombustiblePage {
  formularioCombustible!: FormGroup;
  vehiculoAsignado: string = 'Toyota Corolla 2020 - ABCD12';
  archivoAdjunto: File | null = null;
  combustibleId: any;
  montoFormateado: String = ''; // Monto mostrado con puntos
  combustible:any;
  constructor(private fb: FormBuilder,private firebase: FirebaseService,private utils: UtilsService) {
  }

  ngOnInit() {
    this.cargarDatosCombustible();
  }

  async cargarDatosCombustible() {
    let xtras = this.utils.routerLinkExtras();
    this.combustibleId = xtras?.['id'];
    console.log('ID del combustible:', xtras?.['id']);
    this.combustible = await this.firebase.getDocument('combustible/' + this.combustibleId);
    console.log('Datos del combustible:', this.combustible);
     this.formularioCombustible = this.fb.group({
      fecha: [this.combustible.fecha || ''],
      monto: [this.combustible.monto || '', [Validators.required, Validators.min(0)]],
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
            
          this.formularioCombustible.patchValue({ archivo: this.archivoAdjunto });
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
  // Manejar errores de archivo
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
          nombreArchivo: this.archivoAdjunto.name
        };

        await this.firebase.setDocument(
          `combustible/${this.formularioCombustible.value.fecha.replace(/-/g, '')}`,
          datosCombustible
        );

        console.log('Registro completado con archivo optimizado');
      } catch (error) {
        console.error('Error al registrar:', error);
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
