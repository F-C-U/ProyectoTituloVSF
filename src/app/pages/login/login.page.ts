import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  FormsModule,
} from '@angular/forms';
import { IonicModule, ToastController } from '@ionic/angular';
import { FirebaseService } from 'src/app/services/firebase.service';
import { User } from 'src/app/models/user.model';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, IonicModule],
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  formularioLogin: FormGroup;

  constructor(
    private fb: FormBuilder,
    private toastController: ToastController,
    private firebase: FirebaseService,
    private utils: UtilsService
  ) {
    // Creamos el formulario con validaciones necesarias
    this.formularioLogin = this.fb.group({
      correo: ['', [Validators.required, Validators.email]],
      contrasena: ['', [Validators.required]],
    });
  }

  ngOninit() {
    if (this.utils.getFromlocalStorage('usuario') !== null) {
      this.utils.routerLink('/home');
    }
  }

  async mostrarMensaje(mensaje: string, color: string = 'primary') {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2500,
      color,
      position: 'bottom',
    });
    toast.present();
  }

  // Método para manejar el envío del formulario
  onSubmit() {
    if (this.formularioLogin.valid) {
      this.firebase.signIn(this.formularioLogin.value as User).then((res) => {
        this.getUserInfo(res.user.uid);
      });
    }
  }

  async getUserInfo(uid: string) {
    if (this.formularioLogin.valid) {
      const loading = await this.utils.loading();
      await loading.present();
      try {
        let path = `usuarios/${uid}`;
        await this.firebase.getDocument(path).then((user: any | null) => {
          if (user) {
            this.utils.saveInLocalStorage('usuario', user);
            this.utils.routerLink('seleccionar-vehiculo');
            this.formularioLogin.reset();
          }
        });
      } catch (error) {
        console.error('Error al obtener la información del usuario:', error);
        this.utils.presentToast({
          message: 'Error al iniciar sesión. Inténtalo de nuevo.',
          duration: 3000,
          color: 'danger',
        });
      } finally {
        loading.dismiss();
      }
    }
  }
}
