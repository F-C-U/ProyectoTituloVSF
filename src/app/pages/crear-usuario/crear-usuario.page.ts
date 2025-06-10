import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicModule, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-crear-usuario',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, IonicModule],
  templateUrl: './crear-usuario.page.html',
  styleUrls: ['./crear-usuario.page.scss']
})
export class CrearUsuarioPage {
  formularioUsuario: FormGroup;

  constructor(private fb: FormBuilder, private toastController: ToastController) {
    // Creamos el formulario con validaciones necesarias
    this.formularioUsuario = this.fb.group({
      nombre: ['', [Validators.required, Validators.maxLength(50)]],
      apellido: ['', [Validators.required, Validators.maxLength(50)]],
      correo: ['', [Validators.required, Validators.email]],
      contrasena: ['', [Validators.required, Validators.minLength(6)]],
      esDueno: [false],
      esConductor: [false]
    });
  }

  async mostrarMensaje(mensaje: string, color: string = 'primary') {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2500,
      color,
      position: 'bottom'
    });
    toast.present();
  }

  // Método para manejar el envío del formulario
  onSubmit() {
    if (this.formularioUsuario.invalid) {
      this.mostrarMensaje('Por favor completa todos los campos correctamente.', 'danger');
      return;
    }

    const { esDueno, esConductor } = this.formularioUsuario.value;

    // Validación adicional: debe seleccionarse al menos un rol
    if (!esDueno && !esConductor) {
      this.mostrarMensaje('Debes seleccionar al menos un rol (Dueño o Conductor).', 'warning');
      return;
    }

    // Aquí se procesaría el formulario (por ejemplo, llamado a un servicio HTTP)
    console.log('Datos del formulario:', this.formularioUsuario.value);
    this.mostrarMensaje('Usuario creado exitosamente.');
    this.formularioUsuario.reset();
  }
} 
