import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { FirebaseService } from '../../services/firebase.service';
import { UtilsService } from '../../services/utils.service';

/**
 * Página principal de la aplicación
 * @remarks
 * - Implementa navegación mediante routerLink y programática
 * - Maneja autenticación y temas de Ionic
 * - Incluye cierre de sesión con redirección al login
 */
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, IonicModule],
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {
  // ================ SERVICIOS ================
  private router = inject(Router);
  private firebaseSvc = inject(FirebaseService);
  private utilsSvc = inject(UtilsService);

  // ================ MÉTODOS ================
  /**
   * Navegación programática con validación de ruta
   * @param ruta - Ruta destino (ej: 'registro-vehiculo')
   * @throws Error si la ruta no existe
   */
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

  /**
   * Cierra sesión con manejo de errores y redirección al login
   * @async
   * @remarks
   * - Limpia el historial de navegación con replaceUrl
   * - Muestra feedback visual mediante Toast
   */
  async signOut(): Promise<void> {
    try {
      this.utilsSvc.clearLocalStorage(); // Limpia el almacenamiento local
      await this.firebaseSvc.signOut();
      
      await this.utilsSvc.presentToast({
        message: 'Sesión cerrada correctamente',
        duration: 1500,
        color: 'success'
      });

      // Redirección con limpieza de historial
      this.router.navigate(['/login'], { 
        replaceUrl: true,
        state: { sessionClosed: true } // Opcional: estado para el login
      });

    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
      await this.utilsSvc.presentToast({
        message: `Error al cerrar sesión: ${errorMessage}`,
        duration: 3000,
        color: 'danger'
      });
    }
  }

  // ================ GETTERS ================
  /** Obtiene el usuario actual de Firebase */
  get user() {
    return this.firebaseSvc.getCurrentUser();
  }
}