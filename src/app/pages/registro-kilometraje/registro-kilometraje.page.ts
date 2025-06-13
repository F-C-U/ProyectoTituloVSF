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
  selector: 'app-registro-kilometraje',
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule, ReactiveFormsModule],
  templateUrl: './registro-kilometraje.page.html',
  styleUrls: ['./registro-kilometraje.page.scss'],
})
export class RegistroKilometrajePage {
  formularioKilometraje: FormGroup;
  fechaActual: Date = new Date(); // Fecha automática
  vehiculoAsignado: any;

  constructor(
    private fb: FormBuilder,
    private firebase: FirebaseService,
    private utils: UtilsService
  ) {
    // Formulario simplificado (sin campo fecha editable)
    this.formularioKilometraje = this.fb.group({
      kilometros: ['', [Validators.required, Validators.min(0)]],
    });
  }

  ngOnInit() {
    this.vehiculoAsignado = this.utils.getFromlocalStorage('vehiculo');
  }
  async registrarKilometraje() {
    if (this.formularioKilometraje.valid) {
      const loading = await this.utils.loading();
      await loading.present();
      // Paquete de datos con fecha automática
      console.log('Vehículo asignado:', this.vehiculoAsignado);
      const registro = {
        ...this.formularioKilometraje.value,
        fecha: this.fechaActual.toISOString(), // Formato ISO para Firebase
        vehiculo: this.vehiculoAsignado.patente, // Agrega referencia al vehículo
      };
      // Firebase: Usamos timestamp como ID del documento
      try {
        this.firebase.setDocument(
          `kilometraje/${this.fechaActual.getTime()}`, // ID único
          registro
        );
      } catch (error) {
        this.utils.presentToast({
          message: 'Error al registrar el kilometraje',
          duration: 2000,
          color: 'danger',
        });
      } finally {
        loading.dismiss();
        this.formularioKilometraje.reset();
        this.utils.presentToast({
          message: 'Kilometraje registrado correctamente',
          duration: 2000,
          color: 'success',
        });
      }
    }
  }

  // Getter simplificado (solo para kilómetros)
  get kilometros() {
    return this.formularioKilometraje.get('kilometros');
  }
}
