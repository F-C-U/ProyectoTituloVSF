import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, Event, NavigationStart } from '@angular/router';
import { 
  IonicModule,
  MenuController, 
  Platform,
  NavController 
} from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    IonicModule
  ]
})
export class AppComponent {
  // Estado de la UI
  showBackButton: boolean = false;
  currentPageTitle: string = 'Menú Flota';
  excludedPages: string[] = ['/login', '/crear-usuario'];

  constructor(
    private router: Router,
    private menuCtrl: MenuController,
    private platform: Platform,
    private navCtrl: NavController
  ) {
    this.setupRouterEvents();
    this.setupBackButton();
  }

  // ====================== MANEJO DE RUTAS ======================
  private setupRouterEvents(): void {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
        const url = event.url;
        this.showBackButton = !this.isExcludedPage(url) && !url.includes('/home');
        this.updatePageTitle(url);
      }
    });
  }

  private isExcludedPage(url: string): boolean {
    return this.excludedPages.some(page => url.startsWith(page));
  }

  private updatePageTitle(url: string): void {
    const titleMap: Record<string, string> = {
      '/home': 'Inicio',
      '/lista-vehiculos': 'Vehículos',
      '/registro-vehiculo': 'Nuevo Vehículo',
      '/editar-vehiculo': 'Editar Vehículo',
      '/mantenimiento': 'Mantenimiento',
      '/informes': 'Reportes',
      '/configuracion': 'Ajustes',
      '/lista-combustible': 'Registros Combustible',
      '/crud-esquema-pago': 'Esquemas de Pago'
    };
    this.currentPageTitle = titleMap[url.split('?')[0]] || 'Menú Flota';
  }

  // ====================== BOTÓN ATRÁS ======================
  private async setupBackButton(): Promise<void> {
    this.platform.backButton.subscribeWithPriority(10, async () => {
      try {
        const isMenuOpen = await this.menuCtrl.isOpen('start');
        
        if (isMenuOpen) {
          await this.menuCtrl.close('start');
          return;
        }

        if (!this.isExcludedPage(this.router.url) && !this.router.url.includes('/home')) {
          this.navCtrl.navigateBack('/home');
        }
      } catch (error) {
        console.error('Error al manejar el botón atrás:', error);
        if (!this.router.url.includes('/home')) {
          this.navCtrl.navigateBack('/home');
        }
      }
    });
  }

  // ====================== CONTROL DEL MENÚ ======================
  async closeMenu(): Promise<void> {
    try {
      const isOpen = await this.menuCtrl.isOpen('start');
      if (isOpen) {
        await this.menuCtrl.close('start');
      }
    } catch (error) {
      console.error('Error al cerrar el menú:', error);
    }
  }

  async openMenu(): Promise<void> {
    try {
      await this.menuCtrl.open('start');
    } catch (error) {
      console.error('Error al abrir el menú:', error);
    }
  }

  async toggleMenu(): Promise<void> {
    const isOpen = await this.menuCtrl.isOpen('start');
    isOpen ? await this.closeMenu() : await this.openMenu();
  }

  // ====================== CONDICIONALES DE UI ======================
  shouldShowMenu(): boolean {
    const allowedRoutes = [
      '/home',
      '/lista-vehiculos',
      '/registro-vehiculo',
      '/informes',
      '/mantenimiento',
      '/lista-combustible',
      '/crud-esquema-pago'
    ];
    return allowedRoutes.includes(this.router.url.split('?')[0]) && !this.showBackButton;
  }

  isExcludedRoute(): boolean {
    return this.excludedPages.some(page => this.router.url.startsWith(page));
  }
}