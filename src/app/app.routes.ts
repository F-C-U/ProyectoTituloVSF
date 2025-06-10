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
  },
  {
    path: 'asignar-esquema-pago',
    loadComponent: () => import('./pages/asignar-esquema-pago/asignar-esquema-pago.page').then( m => m.AsignarEsquemaPagoPage)
  },
  {
    path: 'editar-vehiculo',
    loadComponent: () => import('./pages/editar-vehiculo/editar-vehiculo.page').then( m => m.EditarVehiculoPage)
  },
  {
    path: 'editar-kilometraje',
    loadComponent: () => import('./pages/editar-kilometraje/editar-kilometraje.page').then( m => m.EditarKilometrajePage)
  },
  {
    path: 'editar-combustible',
    loadComponent: () => import('./pages/editar-combustible/editar-combustible.page').then( m => m.EditarCombustiblePage)
  },
  {
    path: 'lista-esquema-conductor',
    loadComponent: () => import('./pages/lista-esquema-conductor/lista-esquema-conductor.page').then( m => m.ListaEsquemaConductorPage)
  },
  {
    path: 'ganancias-vehiculo',
    loadComponent: () => import('./pages/ganancias-vehiculo/ganancias-vehiculo.page').then( m => m.GananciasVehiculoPage)
  },
  {
    path: 'listar-alertas',
    loadComponent: () => import('./pages/listar-alertas/listar-alertas.page').then( m => m.ListarAlertasPage)
  },
  {
    path: 'confirmar-mantencion',
    loadComponent: () => import('./pages/confirmar-mantencion/confirmar-mantencion.page').then( m => m.ConfirmarMantencionPage)
  },
  {
    path: 'crear-usuario',
    loadComponent: () => import('./pages/crear-usuario/crear-usuario.page').then( m => m.CrearUsuarioPage)
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.page').then( m => m.LoginPage)
  },
    {
    path: 'lista-esquemas',
    loadComponent: () => import('./pages/lista-esquemas/lista-esquemas.page').then( m => m.ListaEsquemasPage)
  },

  {
    path: 'generar-informe',
    loadComponent: () => import('./pages/generar-informe/generar-informe.page').then( m => m.GenerarInformePage)
  },  {
    path: 'editar-esquema-pago',
    loadComponent: () => import('./pages/editar-esquema-pago/editar-esquema-pago.page').then( m => m.EditarEsquemaPagoPage)
  },
  {
    path: 'registro-mantenimiento',
    loadComponent: () => import('./pages/registro-mantenimiento/registro-mantenimiento.page').then( m => m.RegistroMantenimientoPage)
  },

];
