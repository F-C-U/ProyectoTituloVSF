import { Component, Input } from '@angular/core';
import { IonicModule, ModalController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';
import { NavigationExtras } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-ver-boleta-modal',
  template: `
    <ion-header>
      <ion-toolbar>
        <ion-title>Boleta</ion-title>
        <ion-buttons slot="end">
          <ion-button (click)="cerrar()">
            <ion-icon name="close"></ion-icon>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <img *ngIf="esImagen(ruta)" [src]="ruta" alt="Boleta" style="max-width: 100%; height: auto;" />
      <p *ngIf="!esImagen(ruta)">Formato no compatible para previsualización.</p>
    </ion-content>
  `,
  imports: [IonicModule, CommonModule],
})
export class VerBoletaModalComponent {
  @Input() ruta: string = '';

  constructor(private modalCtrl: ModalController) {}

  cerrar() {
    this.modalCtrl.dismiss();
  }

  esImagen(ruta: string): boolean {
    return ruta.startsWith('data:image') || /\.(png|jpe?g|heic)$/i.test(ruta);
  }
}

@Component({
  standalone: true,
  selector: 'app-lista-combustible',
  templateUrl: './lista-combustible.page.html',
  styleUrls: ['./lista-combustible.page.scss'],
  imports: [IonicModule, CommonModule, FormsModule, VerBoletaModalComponent]
})
export class ListaCombustiblePage {
  constructor(
    private firebase: FirebaseService,
    private modalCtrl: ModalController,
    private utils: UtilsService
  ) {
    this.obtenerRegistros();
  }

  registrosCombustible: {
    id: string,
    fecha: string,
    monto: number,
    patente: string,
    urlBoleta: string
  }[] = [];

  mesSeleccionado: string = '';
  anioSeleccionado: string = '';

  get mesesDisponibles(): string[] {
    const meses = new Set(this.registrosCombustible.map(r => r.fecha.split('-')[1]));
    return Array.from(meses).sort();
  }

  get aniosDisponibles(): string[] {
    const anios = new Set(this.registrosCombustible.map(r => r.fecha.split('-')[0]));
    return Array.from(anios).sort();
  }

  get registrosFiltrados() {
    return this.registrosCombustible.filter(r => {
      const [anio, mes] = r.fecha.split('-');
      return (
        (!this.mesSeleccionado || mes === this.mesSeleccionado) &&
        (!this.anioSeleccionado || anio === this.anioSeleccionado)
      );
    });
  }

  editarCombustible(id: string) {
    const registro = this.registrosCombustible.find(r => r.id === id);

    if (!registro) {
      this.utils.presentToast({
        message: 'Registro no encontrado',
        duration: 2000,
        color: 'danger'
      });
      return;
    }

    const hoy = new Date().toISOString().split('T')[0]; // formato: yyyy-mm-dd
    const fechaRegistro = registro.fecha.split('T')[0]; // por si viene con hora

    if (fechaRegistro !== hoy) {
      this.utils.presentToast({
        message: 'Solo puedes editar registros creados hoy',
        duration: 3000,
        color: 'warning'
      });
      return;
    }

    const xtras: NavigationExtras = {
      state: { id }
    };
    this.utils.routerLinkWithExtras('editar-combustible', xtras);
  }

  async eliminarCombustible(fecha: any) {
    this.utils.presentAlert({
      header: 'Confirmar Eliminación',
      message: `¿Estás seguro de eliminar el registro de combustible del ${fecha}?`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Eliminar',
          handler: () => {
            this.firebase.deleteDocument(`combustible/${fecha}`).then(() => {
              this.utils.presentToast({
                message: 'Registro eliminado correctamente.',
                duration: 2000,
                color: 'success'
              });
              this.obtenerRegistros();
            }).catch(error => {
              console.error('Error al eliminar el registro:', error);
              this.utils.presentToast({
                message: 'Error al eliminar el registro.',
                duration: 2000,
                color: 'danger'
              });
            });
          }
        }
      ]
    });
  }

  obtenerRegistros() {
    this.firebase.getCollection('combustible').subscribe((data: any[]) => {
      this.registrosCombustible = data.map(item => ({
        id: item.id,
        fecha: item.fecha,
        monto: item.monto,
        patente: item.patente,
        urlBoleta: item.archivo
      }));
    });
  }

  async verBoleta(ruta: string): Promise<void> {
    const modal = await this.modalCtrl.create({
      component: VerBoletaModalComponent,
      componentProps: { ruta }
    });
    await modal.present();
  }
}