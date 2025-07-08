import { Component } from '@angular/core';
import { 
        IonContent, 
        IonIcon, 
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-listar-alertas',
  templateUrl: './listar-alertas.page.html',
  styleUrls: ['./listar-alertas.page.scss'],
  standalone: true,
  imports: [
    IonContent, 
    IonIcon, 
  ]
})
export class ListarAlertasPage {
filtrarAlertas() {
throw new Error('Method not implemented.');
}
alertas = [
  {
    id: 1,
    titulo: 'Mantenimiento urgente',
    mensaje: 'Vehículo XYZ789: Revisión de frenos pendiente',
    fecha: '2025-06-10',
    prioridad: 'alta',
    icono: 'alert-circle' // Icono de Ionic
  },
  {
    id: 2,
    titulo: 'Notificación de taller',
    mensaje: 'Vehículo ABC123: Cambio de neumáticos programado',
    fecha: '2025-06-12',
    prioridad: 'media',
    icono: 'calendar'
  },
  {
    id: 3,
    titulo: 'Recordatorio de servicio',
    mensaje: 'Vehículo DEF456: Limpieza de filtro de aire requerida',
    fecha: '2025-06-15',
    prioridad: 'baja',
    icono: 'notifications'
  }
  ];
}