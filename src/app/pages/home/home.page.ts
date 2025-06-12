import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { IonicModule, MenuController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, IonicModule],
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {
  private router = inject(Router);
  private menuCtrl = inject(MenuController);

  navegarA(ruta: string): void {
    const rutasValidas = [
      'registro-vehiculo',
      'mantenimiento',
      'alertas',
      'perfil'
    ];

    if (!rutasValidas.includes(ruta)) {
      throw new Error(`Ruta no válida: ${ruta}`);
    }
    this.router.navigate([`/${ruta}`]);
  }

  async openMenu(): Promise<void> {
    await this.menuCtrl.open('main-menu'); // Cambiado de 'start' a 'main-menu'
  }

  async closeMenu(): Promise<void> {
    await this.menuCtrl.close('main-menu'); // Asegurar consistencia
  }
}