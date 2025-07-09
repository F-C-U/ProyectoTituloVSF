// src/app/pages/registro-esquema-pago.page.ts
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
  selector: 'app-registro-esquema-pago',
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule, ReactiveFormsModule],
  templateUrl: './registro-esquema-pago.page.html',
  styleUrls: ['./registro-esquema-pago.page.scss'],
})
export class RegistroEsquemaPagoPage implements OnInit {
  formularioEsquema: FormGroup;
  tipos: string[] = ['Cuota fija', 'Porcentaje'];
  conductores: any[] = [];

  constructor(
    private fb: FormBuilder,
    private firebase: FirebaseService,
    private utils: UtilsService
  ) {
    this.formularioEsquema = this.fb.group({
      nombreEsquema: ['', Validators.required],
      tipo: ['', Validators.required],
      montoMensual: [''],
      porcentajeGanancia: [''],
      conductor: ['', Validators.required],
      dueno: [''],
    });

    // Escuchar cambios en el tipo para mostrar el campo correspondiente
    this.formularioEsquema.get('tipo')?.valueChanges.subscribe((tipo) => {
      if (tipo === 'Cuota fija') {
        this.formularioEsquema
          .get('montoMensual')
          ?.setValidators([Validators.required, Validators.min(0)]);
        this.formularioEsquema.get('porcentajeGanancia')?.clearValidators();
        this.formularioEsquema.get('porcentajeGanancia')?.setValue('');
      } else if (tipo === 'Porcentaje') {
        this.formularioEsquema
          .get('porcentajeGanancia')
          ?.setValidators([
            Validators.required,
            Validators.min(0),
            Validators.max(100),
          ]);
        this.formularioEsquema.get('montoMensual')?.clearValidators();
        this.formularioEsquema.get('montoMensual')?.setValue('');
      }
      this.formularioEsquema.get('montoMensual')?.updateValueAndValidity();
      this.formularioEsquema
        .get('porcentajeGanancia')
        ?.updateValueAndValidity();
    });
  }

  ngOnInit() {
    this.firebase
      .getCollectionWhere('usuarios', 'esConductor', '==', true)
      .subscribe((data: any[]) => {
        this.conductores = data;
      });
  }

  agregarPuntos(valor: string): string {
    return valor.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  }

  formatearMonto(event: any) {
    const valorIngresado = event.target.value
      .replace(/\./g, '')
      .replace(/\D/g, '');
    if (valorIngresado) {
      const conPuntos = this.agregarPuntos(valorIngresado);
      event.target.value = conPuntos;
      this.formularioEsquema.patchValue({
        montoMensual: parseInt(valorIngresado, 10),
      });
    } else {
      this.formularioEsquema.patchValue({ montoMensual: null });
    }
  }

  registrarEsquema() {
    if (this.formularioEsquema.valid) {
      console.log('Esquema de pago registrado:', this.formularioEsquema.value);
      try {
        this.formularioEsquema.patchValue({
          dueno: this.utils.getFromlocalStorage('usuario').uid,
        });
        this.firebase.setDocument(
          'esquema_pago/' + this.formularioEsquema.get('nombreEsquema')?.value,
          this.formularioEsquema.value
        );
        this.formularioEsquema.reset();
      } catch (error) {
        console.error('Error al registrar el esquema de pago:', error);
      }
      // Aquí se puede conectar a una API o guardar localmente
    } else {
      this.formularioEsquema.markAllAsTouched();
    }
  }

  get nombreEsquema() {
    return this.formularioEsquema.get('nombreEsquema');
  }

  get tipo() {
    return this.formularioEsquema.get('tipo');
  }

  get montoMensual() {
    return this.formularioEsquema.get('montoMensual');
  }

  get porcentajeGanancia() {
    return this.formularioEsquema.get('porcentajeGanancia');
  }

  get conductor() {
    return this.formularioEsquema.get('conductor');
  }
}
