import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { IonicModule, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, IonicModule],
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss']
})
export class LoginPage {
  formularioLogin: FormGroup;

  constructor(private fb: FormBuilder, private toastController: ToastController) {
    // Creamos el formulario con validaciones necesarias
    this.formularioLogin = this.fb.group({
      correo: ['', [Validators.required, Validators.email]],
      contrasena: ['', [Validators.required]]
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
    if (this.formularioLogin.invalid) {
      this.mostrarMensaje('Por favor completa todos los campos correctamente.', 'danger');
      return;
    }

    const { correo, contrasena } = this.formularioLogin.value;

    // Aquí se realizaría la lógica de autenticación (ej. llamada HTTP al backend)
    console.log('Intento de login:', correo, contrasena);
    this.mostrarMensaje('Inicio de sesión exitoso.');
    this.formularioLogin.reset();
  }
}