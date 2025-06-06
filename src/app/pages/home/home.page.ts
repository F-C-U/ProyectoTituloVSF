import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';

/**
 * Componente standalone para la página de inicio.
 * - Implementa temas claro/oscuro con variables CSS personalizadas.
 * - Usa routerLink para navegación entre páginas.
 */
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, IonicModule],
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {
  // Servicio Router inyectado para navegación programática (opcional)
  private router = inject(Router);

  /**
   * Navegación programática alternativa a routerLink.
   * @param ruta Nombre de la ruta (ej: 'registro-vehiculo')
   */
  navegarA(ruta: string): void {
    this.router.navigate([`/${ruta}`]);
  }
}
