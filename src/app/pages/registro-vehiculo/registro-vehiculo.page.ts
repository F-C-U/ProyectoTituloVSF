// src/app/pages/registro-vehiculo.page.ts
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
import { VehiculoAPIService } from 'src/app/services/vehiculo-api.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-registro-vehiculo',
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule, ReactiveFormsModule],
  templateUrl: './registro-vehiculo.page.html',
  styleUrls: ['./registro-vehiculo.page.scss'],
})
export class RegistroVehiculoPage {
  vehiculoForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private firebase: FirebaseService,
    private utils: UtilsService,
    private vehicleService: VehiculoAPIService
  ) {
    // Inicializamos el formulario con validaciones
    this.vehiculoForm = this.fb.group({
      dueno: [''],
      patente: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[B-DF-HJ-NP-TV-Z]{4}[0-9]{2}$/),
        ],
      ],
      marca: ['', [Validators.required, Validators.maxLength(30)]], // Nuevo campo
      modelo: ['', [Validators.required, Validators.maxLength(50)]],
      anio: [
        '',
        [
          Validators.required,
          Validators.min(1900),
          Validators.max(new Date().getFullYear()),
        ],
      ],
      tipoCombustible: ['', Validators.required],
      activo: [false],
    });
  }

  async buscarDatosVehiculo() {
    const patente = this.vehiculoForm.get('patente')?.value;

    if (!patente || patente.length < 6) return;

    const loading = await this.utils.loading();
    await loading.present();

    try {
      const data = await firstValueFrom(
        this.vehicleService.getVehicleByPlate(patente)
      );

      if (!data) {
        throw new Error('No se recibió información del vehículo');
      }

      this.vehiculoForm.patchValue({
        marca: data.marca || '',
        modelo: data.modelo || '',
        anio: data.anio || '',
        tipoCombustible: data.tipoCombustible || '',
      });
    } catch (err: any) {
      this.utils.presentToast({
        message: err.message || 'No se pudo obtener información del vehículo',
        color: 'warning',
      });
    } finally {
      await loading.dismiss();
    }
  }

  // Métodos para el campo patente (existente)
  procesarPatente(event: any) {
    let valor = event.target.value
      .toUpperCase()
      .replace(/[^B-DF-HJ-NP-TV-Z0-9]/g, '')
      .slice(0, 6);

    // Solo actualiza el valor del formulario, no lo formatea aquí
    this.vehiculoForm.get('patente')?.setValue(valor, { emitEvent: false });
    this.vehiculoForm.get('patente')?.markAsTouched();
    this.vehiculoForm.get('patente')?.updateValueAndValidity();

    // Formatea solo para mostrar en el input
    let formateado = valor;
    if (valor.length >= 5) {
      formateado =
        valor.slice(0, 2) + '-' + valor.slice(2, 4) + '-' + valor.slice(4);
    } else if (valor.length >= 3) {
      formateado = valor.slice(0, 2) + '-' + valor.slice(2);
    }
    event.target.value = formateado;

    // Solo busca datos si la patente está completa
    if (valor.length === 6) {
      this.buscarDatosVehiculo();
    }
  }

  formatearPatente(valor: string): string {
    valor = valor
      .toUpperCase()
      .replace(/[^A-Z0-9]/g, '')
      .slice(0, 6);
    if (valor.length >= 5) {
      return valor.slice(0, 2) + '-' + valor.slice(2, 4) + '-' + valor.slice(4);
    } else if (valor.length >= 3) {
      return valor.slice(0, 2) + '-' + valor.slice(2);
    }
    return valor;
  }

  // Método para enviar el formulario
  async onSubmit() {
    if (this.vehiculoForm.valid) {
      const loading = await this.utils.loading();
      await loading.present();
      try {
        const currentUser = this.utils.getFromlocalStorage('usuario');
        console.log('Usuario actual:', currentUser);
        if (currentUser) {
          this.vehiculoForm.patchValue({ dueno: currentUser.uid });
          await this.firebase.setDocument(
            'vehiculos/' + this.vehiculoForm.value.patente,
            this.vehiculoForm.value
          );
          this.utils.saveInLocalStorage('vehiculo', this.vehiculoForm.value);
        }
      } catch (error) {
        this.utils.presentToast({
          message: 'Error al registrar el vehículo',
          color: 'danger',
        });
      } finally {
        await loading.dismiss();
        this.utils.presentAlert({
          header: 'Vehículo registrado correctamente',
          message:
            this.vehiculoForm.value.marca +
            ' ' +
            this.vehiculoForm.value.modelo +
            ' ' +
            this.vehiculoForm.value.patente,
          buttons: ['OK'],
        });
        this.vehiculoForm.reset();
      }
    }
  }

  // Métodos de acceso para el template (actualizados con marca)
  get patente() {
    return this.vehiculoForm.get('patente');
  }

  get marca() {
    return this.vehiculoForm.get('marca'); // Nuevo getter
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
