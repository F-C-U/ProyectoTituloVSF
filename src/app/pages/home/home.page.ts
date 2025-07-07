import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { FirebaseService } from '../../services/firebase.service';
import { UtilsService } from '../../services/utils.service';

/**
 * Página principal con navegación robusta y gestión de sesión
 * @version 2.1
 * @features
 * - Navegación que funciona al primer intento
 * - Cierre de sesión completo con limpieza de estado
 * - Precarga inteligente de rutas
 * - Protección contra clics múltiples
 */
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, IonicModule],
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  // ================== INYECCIÓN DE DEPENDENCIAS ==================
  private router = inject(Router);
  private firebaseSvc = inject(FirebaseService);
  private utilsSvc = inject(UtilsService);
  usuario = this.utilsSvc.getFromlocalStorage('usuario')
  // ================== ESTADOS ==================
  private isNavigating = false;
  private navigationAttempts = new Map<string, number>();

  // ================== RUTAS CONFIGURADAS ==================
  private readonly rutasValidas = [
    'registro-vehiculo',
    'mantenimiento',
    'alertas',
    'perfil',
    'registro-kilometraje'
  ];

  // ================== LIFECYCLE HOOKS ==================
  async ngOnInit() {
    await this.preloadCriticalRoutes();
  }

  // ================== MÉTODOS PÚBLICOS ==================
  /**
   * Navegación protegida con reintento automático
   * @param ruta - Ruta destino (sin '/')
   */
  async navegarA(ruta: string): Promise<void> {
    if (this.isNavigating || !this.rutasValidas.includes(ruta)) return;
    
    this.isNavigating = true;
    const attemptKey = `nav_${ruta}_${Date.now()}`;

    try {
      await this.attemptNavigation(ruta, attemptKey);
    } catch (error) {
      await this.handleNavigationError(ruta, error, attemptKey);
    } finally {
      this.isNavigating = false;
    }
  }

  /**
   * Cierre de sesión completo con:
   * - Limpieza de Firebase
   * - Reset de estado local
   * - Redirección garantizada
   */
  async signOut(): Promise<void> {
    if (this.isNavigating) return;
    this.isNavigating = true;

    try {
      await this.performLogout();
    } finally {
      this.isNavigating = false;
    }
  }

  // ================== MÉTODOS PRIVADOS ==================
  private async preloadCriticalRoutes() {
    const routesToPreload = this.rutasValidas.filter(r => r !== 'perfil');
    await Promise.all(
      routesToPreload.map(route => 
        this.router.config.find(r => r.path === route)?.loadComponent!()
      )
    );
  }

  private async attemptNavigation(ruta: string, attemptKey: string) {
    const attempts = this.navigationAttempts.get(attemptKey) || 0;
    this.navigationAttempts.set(attemptKey, attempts + 1);

    if (attempts > 0) {
      await this.forceNavigation(ruta);
      return;
    }

    await this.router.navigate([`/${ruta}`], {
      state: { navId: attemptKey }
    });
  }

  private async forceNavigation(ruta: string) {
    // Solución definitiva para Ionic/Angular
    await this.router.navigateByUrl('/blank', {
      skipLocationChange: true,
      replaceUrl: true
    });
    
    await this.router.navigate([ruta], {
      state: { forced: true, timestamp: Date.now() }
    });
  }

  private async handleNavigationError(ruta: string, error: unknown, attemptKey: string) {
    console.error(`Navigation Error [${attemptKey}]:`, error);
    
    await this.utilsSvc.presentToast({
      message: 'Optimizando rutas...',
      duration: 800,
      color: 'medium'
    });

    await this.forceNavigation(ruta);
    this.navigationAttempts.delete(attemptKey);
  }

  private async performLogout() {
    // 1. Limpieza de Firebase
    await this.firebaseSvc.signOut();

    // 2. Limpieza local
    this.utilsSvc.clearLocalStorage();
    this.navigationAttempts.clear();

    // 3. Feedback visual
    await this.utilsSvc.presentToast({
      message: 'Sesión cerrada con éxito',
      duration: 1500,
      color: 'success',
      icon: 'exit-outline'
    });

    // 4. Redirección garantizada
    await this.router.navigate(['/login'], {
      replaceUrl: true,
      state: { logoutConfirmed: true }
    });
  }

  // ================== GETTERS ==================
  get user() {
    return this.firebaseSvc.getCurrentUser();
  }
}