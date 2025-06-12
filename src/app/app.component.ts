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

  private setupRouterEvents(): void {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
        const url = event.url;

        // Mostrar botón atrás en todas menos en páginas excluidas y home
        this.showBackButton = !this.isExcludedPage(url) && url !== '/home';

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

  private setupBackButton(): void {
    this.platform.backButton.subscribeWithPriority(10, async () => {
      try {
        const isMenuOpen = await this.menuCtrl.isOpen('main-menu');
        if (isMenuOpen) {
          await this.menuCtrl.close('main-menu');
          return;
        }

        if (!this.isExcludedPage(this.router.url) && this.router.url !== '/home') {
          this.navCtrl.navigateBack('/home');
        } else {
          // Si estamos en home o en página excluida, puedes añadir comportamiento aquí, o salir de la app
        }
      } catch (error) {
        console.error('Error al manejar el botón atrás:', error);
        if (this.router.url !== '/home') {
          this.navCtrl.navigateBack('/home');
        }
      }
    });
  }

  async closeMenu(): Promise<void> {
    try {
      const isOpen = await this.menuCtrl.isOpen('main-menu');
      if (isOpen) {
        await this.menuCtrl.close('main-menu');
      }
    } catch (error) {
      console.error('Error al cerrar el menú:', error);
    }
  }

  async openMenu(): Promise<void> {
    console.log('openMenu() llamado');  // <--- Este log
    try {
      await this.menuCtrl.open('main-menu');
      console.log('Menú abierto');
    } catch (error) {
      console.error('Error al abrir el menú:', error);
    }
  }

  isExcludedRoute(): boolean {
    return this.isExcludedPage(this.router.url);
  }
}
