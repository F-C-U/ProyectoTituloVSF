import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicModule, ToastController } from '@ionic/angular';
import { FirebaseService } from 'src/app/services/firebase.service';
import { User } from 'src/app/models/user.model';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-crear-usuario',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, IonicModule],
  templateUrl: './crear-usuario.page.html',
  styleUrls: ['./crear-usuario.page.scss']
})
export class CrearUsuarioPage {
  formularioUsuario: FormGroup;
  showPassword: boolean = false; // Controla la visibilidad de la contraseña

  constructor(private fb: FormBuilder, private toastController: ToastController,private firebase:FirebaseService,private utils:UtilsService) {
    // Creamos el formulario con validaciones necesarias
    this.formularioUsuario = this.fb.group({
      uid: [''],
      nombre: ['', [Validators.required, Validators.maxLength(50)]],
      apellido: ['', [Validators.required, Validators.maxLength(50)]],
      correo: ['', [Validators.required, Validators.email]],
      contrasena: ['', [Validators.required, Validators.minLength(6)]],
      esDueno: [false],
      esConductor: [false]
    });
  }

  // Alterna la visibilidad de la contraseña
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  toggleRole(roleName: 'esDueno' | 'esConductor') {
    const currentValue = this.formularioUsuario.get(roleName)?.value;
    this.formularioUsuario.get(roleName)?.setValue(!currentValue);
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
    this.firebase.signUp(this.formularioUsuario.value as User).then(async res => {
        await this.firebase.updateUser(this.formularioUsuario.value.nombre)
        console.log("uid",res.user.uid);
        let uid = res.user.uid;
        this.formularioUsuario.controls['uid'].setValue(uid);
        this.setUserInfo(uid);})
    this.firebase.setDocument('usuarios/'+this.formularioUsuario.value,this.formularioUsuario.value)
    this.mostrarMensaje('Usuario creado exitosamente.');
  }

  setUserInfo(uid:string){
    let path = 'usuarios/' + uid;
    delete this.formularioUsuario.value.contrasena;

    this.firebase.setDocument(path,this.formularioUsuario.value).then(()=>{
      this.utils.saveInLocalStorage('usuario',this.formularioUsuario.value)
      this.formularioUsuario.reset();
    })
  }
} 
