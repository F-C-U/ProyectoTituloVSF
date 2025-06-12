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
import { NavigationExtras } from '@angular/router';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-editar-kilometraje',
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule, ReactiveFormsModule],
  templateUrl: './editar-kilometraje.page.html',
  styleUrls: ['./editar-kilometraje.page.scss'],
})
export class EditarKilometrajePage {
  formularioKilometraje!: FormGroup;
  fechaActual: string = new Date().toISOString().split('T')[0];
  kilometrajeId: any;
  kilometraje: any;
  constructor(
    private fb: FormBuilder,
    private firebase: FirebaseService,
    private utils: UtilsService
  ) {
    // Formateamos la fecha actual en formato DD-MM-YYYY
    const fecha = new Date();
    const dia = String(fecha.getDate()).padStart(2, '0');
    const mes = String(fecha.getMonth() + 1).padStart(2, '0');
    const anio = fecha.getFullYear();
    this.fechaActual = `${dia}-${mes}-${anio}`;

    // Inicializamos el formulario con validaciones
  }

  // Valor simulado por ahora
  vehiculoAsignado = 'Toyota Corolla 2020 - ABCD12';

  // Método que se ejecuta al enviar el formulario
  async editarKilometraje() {
    if (this.formularioKilometraje.valid) {
      try {
        await this.firebase.updateDocument(
          'kilometraje/' + this.kilometrajeId,
          this.formularioKilometraje.value
        );
      } catch (error) {
        console.error('Error al editar kilometraje:', error);
      }
    } else {
      this.formularioKilometraje.markAllAsTouched();
    }
  }

  // Getters para mostrar errores en la plantilla
  get fecha() {
    return this.formularioKilometraje.get('fecha');
  }

  get kilometros() {
    return this.formularioKilometraje.get('kilometros');
  }
  ngOnInit() {
    this.cargarDatosKilometraje();
  }
  async cargarDatosKilometraje() {
    let xtras = this.utils.routerLinkExtras();
    this.kilometrajeId = xtras?.['id'];
    this.kilometraje = await this.firebase.getDocument(
      'kilometraje/' + this.kilometrajeId
    );
    this.formularioKilometraje = this.fb.group({
      kilometros: [
        this.kilometraje.kilometros,
        [Validators.required, Validators.min(0)],
      ],
    });
  }
}
