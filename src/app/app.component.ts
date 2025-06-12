import { Component, effect, inject, signal, DestroyRef, ViewChild, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, NavigationEnd } from '@angular/router';
import { IonicModule, MenuController, IonMenu } from '@ionic/angular';
import { filter } from 'rxjs/operators';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
  ]
})
export class AppComponent {
  public router = inject(Router);
  private menuCtrl = inject(MenuController);
  private destroyRef = inject(DestroyRef);
  private cdRef = inject(ChangeDetectorRef);

  @ViewChild('mainMenu') menuRef!: IonMenu;

  // Señal para controlar la visibilidad del menú
  mostrarMenu = signal<boolean>(true);
  
  // Estado para controlar si el menú está abierto
  menuAbierto = signal<boolean>(false);

  // Lista de páginas para el menú (datos falsos)
  paginas = signal<Array<{ titulo: string, url: string, icono: string }>>([
    { titulo: 'Inicio', url: '/home', icono: '' },
    { titulo: 'Vehiculos', url: '/lista-vehiculos', icono: '' },
    { titulo: 'Configurar intervalos', url: '/mantenimiento', icono: '' },
    { titulo: 'Esquemas de pago', url: '/lista-esquemas', icono: '' },
    { titulo: 'Alertas', url: '/listar-alertas', icono: '' },
    { titulo: 'Combustible', url: '/lista-combustible', icono: '' },
    { titulo: 'Kilometraje', url: '/lista-kilometraje', icono: '' },
    { titulo: 'Ganancias', url: '/lista-ganancias-duenio', icono: '' },
    { titulo: 'Informes', url: '/generar-informe', icono: '' },
  ]);

  constructor() {
    // Efecto reactivo para mostrar/ocultar menú según la ruta
    effect(() => {
      const rutaActual = this.router.url;
      this.actualizarVisibilidadMenu(rutaActual);
    });

    // Suscripción a eventos de navegación
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe((event: any) => {
        this.actualizarVisibilidadMenu(event.url);
        this.cerrarMenu(); // Cerrar menú al cambiar de ruta
      });
  }

  // Actualiza la visibilidad del menú basado en la ruta actual - CORREGIDO
  private actualizarVisibilidadMenu(url: string): void {
    const rutasOcultarMenu = ['/login', '/crear-usuario'];
    const debeOcultar = rutasOcultarMenu.some(ruta => url.startsWith(ruta));
    this.mostrarMenu.set(!debeOcultar);
    
    // Resetear estado cuando se oculta el menú
    if (debeOcultar) {
      this.menuAbierto.set(false);
    }
    
    this.cdRef.detectChanges(); // Forzar detección de cambios
  }

  // Método para cerrar el menú - CORREGIDO
  async cerrarMenu() {
    // Solo cerrar si el menú está abierto Y existe en el DOM
    if (this.menuAbierto() && this.mostrarMenu()) {
      try {
        if (this.menuRef) {
          await this.menuRef.close();
        } else {
          await this.menuCtrl.close('main-menu');
        }
        this.menuAbierto.set(false);
      } catch (error) {
        console.debug('Error al cerrar el menú:', error);
      }
    }
  }

  // Método para abrir el menú - CORREGIDO
  async abrirMenu() {
    // Solo abrir si el menú está cerrado Y existe en el DOM
    if (!this.menuAbierto() && this.mostrarMenu()) {
      try {
        if (this.menuRef) {
          await this.menuRef.open();
        } else {
          await this.menuCtrl.open('main-menu');
        }
        this.menuAbierto.set(true);
      } catch (error) {
        console.debug('Error al abrir el menú:', error);
      }
    }
  }

  // Manejar evento de apertura/cierre del menú - SIN CAMBIOS
  async toggleMenu() {
    if (this.menuAbierto()) {
      await this.cerrarMenu();
    } else {
      await this.abrirMenu();
    }
  }

  // Método para navegar cerrando el menú primero - SIN CAMBIOS
  async navegar(url: string) {
    await this.cerrarMenu();
    this.router.navigateByUrl(url);
  }

  // Manejar evento de cambio de estado del menú - CORREGIDO
  onMenuChange(event: CustomEvent) {
    // Verificación segura para evitar errores con eventos nulos
    if (event.detail) {
      this.menuAbierto.set(event.detail.visible);
    }
  }
}