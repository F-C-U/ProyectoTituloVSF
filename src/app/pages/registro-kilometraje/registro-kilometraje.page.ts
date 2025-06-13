import { Component, OnInit } from '@angular/core';
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
  selector: 'app-registro-kilometraje',
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule, ReactiveFormsModule],
  templateUrl: './registro-kilometraje.page.html',
  styleUrls: ['./registro-kilometraje.page.scss'],
})
export class RegistroKilometrajePage implements OnInit {
  formularioKilometraje: FormGroup;
  fechaActual: Date = new Date();
  vehiculoAsignado: any = {
    marca: '--',
    modelo: '--',
    patente: '--'
  };

  constructor(
    private fb: FormBuilder,
    private firebase: FirebaseService,
    private utils: UtilsService
  ) {
    this.formularioKilometraje = this.fb.group({
      kilometros: ['', [Validators.required, Validators.min(0)]],
    });
  }

  async ngOnInit() {
    const vehiculoStorage = this.utils.getFromlocalStorage('vehiculo');
    
    if (vehiculoStorage && 
        vehiculoStorage.marca && 
        vehiculoStorage.modelo && 
        vehiculoStorage.patente) {
      this.vehiculoAsignado = vehiculoStorage;
    } else {
      console.warn('Vehículo no encontrado en localStorage:', vehiculoStorage);
      await this.utils.presentToast({
        message: 'No se encontró vehículo asignado válido',
        duration: 2500,
        color: 'warning'
      });
    }
  }

  async registrarKilometraje() {
    if (this.formularioKilometraje.valid) {
      const loading = await this.utils.loading();
      await loading.present();

      const registro = {
        ...this.formularioKilometraje.value,
        fecha: this.fechaActual.toISOString(),
        vehiculo: this.vehiculoAsignado.patente || 'N/A'
      };

      try {
        await this.firebase.setDocument(
          `kilometraje/${this.fechaActual.getTime()}`,
          registro
        );
        this.utils.presentToast({
          message: 'Kilometraje registrado correctamente',
          duration: 2000,
          color: 'success',
        });
      } catch (error) {
        let errorMessage = 'Error desconocido';
        if (error && typeof error === 'object' && 'message' in error) {
          errorMessage = 'Error al registrar: ' + (error as any).message;
        } else if (typeof error === 'string') {
          errorMessage = 'Error al registrar: ' + error;
        }
        this.utils.presentToast({
          message: errorMessage,
          duration: 3000,
          color: 'danger',
        });
      } finally {
        loading.dismiss();
        this.formularioKilometraje.reset();
      }
    }
  }

  get kilometros() {
    return this.formularioKilometraje.get('kilometros');
  }
}