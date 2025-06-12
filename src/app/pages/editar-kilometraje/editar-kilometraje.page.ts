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
  kilometrajeId: any;
  kilometraje: any;
  constructor(
    private fb: FormBuilder,
    private firebase: FirebaseService,
    private utils: UtilsService
  ) {}

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
    console.log('ID del kilometraje:', this.kilometrajeId);
  }
  async cargarDatosKilometraje() {
    let xtras = this.utils.routerLinkExtras();
    console.log('Extras de navegación:', xtras);
    this.kilometrajeId = xtras?.['id'];
    this.kilometraje = await this.firebase.getDocument(
      'kilometraje/' + this.kilometrajeId
    );
    this.formularioKilometraje = this.fb.group({
      kilometros: ['', [Validators.required, Validators.min(0)]],
      fecha: [this.kilometraje.fecha],
    });
  }
}
