import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./pages/home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'alertas',
    loadComponent: () => import('./pages/alertas/alertas.page').then( m => m.AlertasPage)
  },
  {
    path: 'crud-esquema-pago',
    loadComponent: () => import('./pages/crud-esquema-pago/crud-esquema-pago.page').then( m => m.CrudEsquemaPagoPage)
  },
  {
    path: 'escaneo-boleta',
    loadComponent: () => import('./pages/escaneo-boleta/escaneo-boleta.page').then( m => m.EscaneoBoletaPage)
  },
  {
    path: 'ganancias',
    loadComponent: () => import('./pages/ganancias/ganancias.page').then( m => m.GananciasPage)
  },
  {
    path: 'informes',
    loadComponent: () => import('./pages/informes/informes.page').then( m => m.InformesPage)
  },
  {
    path: 'lista-combustible',
    loadComponent: () => import('./pages/lista-combustible/lista-combustible.page').then( m => m.ListaCombustiblePage)
  },
  {
    path: 'lista-kilometraje',
    loadComponent: () => import('./pages/lista-kilometraje/lista-kilometraje.page').then( m => m.ListaKilometrajePage)
  },
  {
    path: 'lista-vehiculos',
    loadComponent: () => import('./pages/lista-vehiculos/lista-vehiculos.page').then( m => m.ListaVehiculosPage)
  },
  {
    path: 'mantenimiento',
    loadComponent: () => import('./pages/mantenimiento/mantenimiento.page').then( m => m.MantenimientoPage)
  },
  {
    path: 'registro-combustible',
    loadComponent: () => import('./pages/registro-combustible/registro-combustible.page').then( m => m.RegistroCombustiblePage)
  },
  {
    path: 'registro-esquema-pago',
    loadComponent: () => import('./pages/registro-esquema-pago/registro-esquema-pago.page').then( m => m.RegistroEsquemaPagoPage)
  },
  {
    path: 'registro-kilometraje',
    loadComponent: () => import('./pages/registro-kilometraje/registro-kilometraje.page').then( m => m.RegistroKilometrajePage)
  },
  {
    path: 'registro-vehiculo',
    loadComponent: () => import('./pages/registro-vehiculo/registro-vehiculo.page').then( m => m.RegistroVehiculoPage)
  },  {
    path: 'ganancias-vehiculo',
    loadComponent: () => import('./pages/ganancias-vehiculo/ganancias-vehiculo.page').then( m => m.GananciasVehiculoPage)
  },


];
