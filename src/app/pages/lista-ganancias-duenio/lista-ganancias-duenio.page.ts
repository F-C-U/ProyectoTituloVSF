// lista-ganancias-duenio.page.ts
import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

// Interfaz para tipar los datos de ganancias
interface Ganancias {
  fecha: Date;
  patente: string;
  gananciaBruta: number;
  gananciaNeta: number;
  gastosCombustible: number;
}

@Component({
  selector: 'app-lista-ganancias-duenio',
  templateUrl: './lista-ganancias-duenio.page.html',
  styleUrls: ['./lista-ganancias-duenio.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule]
})
export class ListaGananciasDuenioPage implements OnInit {
  // Señales reactivas para el estado del componente
  ganancias = signal<Ganancias[]>([]);
  gananciasFiltradas = signal<Ganancias[]>([]);
  patentes = signal<string[]>([]);
  patenteSeleccionada = signal<string>('todas');
  cargando = signal<boolean>(true);
  error = signal<string>('');

  ngOnInit(): void {
    this.cargarDatos();
  }

  // Genera datos de prueba para la demostración
  private cargarDatos(): void {
    try {
      // Simular retraso de carga
      setTimeout(() => {
        const datosFalsos: Ganancias[] = [
          { fecha: new Date(2023, 5, 15), patente: 'ABC123', gananciaBruta: 150000, gananciaNeta: 120000, gastosCombustible: 30000 },
          { fecha: new Date(2023, 5, 16), patente: 'XYZ789', gananciaBruta: 180000, gananciaNeta: 140000, gastosCombustible: 40000 },
          { fecha: new Date(2023, 5, 17), patente: 'DEF456', gananciaBruta: 200000, gananciaNeta: 160000, gastosCombustible: 40000 },
          { fecha: new Date(2023, 5, 18), patente: 'ABC123', gananciaBruta: 170000, gananciaNeta: 135000, gastosCombustible: 35000 },
          { fecha: new Date(2023, 5, 19), patente: 'XYZ789', gananciaBruta: 190000, gananciaNeta: 150000, gastosCombustible: 40000 },
          { fecha: new Date(2023, 5, 20), patente: 'GHI789', gananciaBruta: 220000, gananciaNeta: 180000, gastosCombustible: 40000 },
          { fecha: new Date(2023, 5, 21), patente: 'JKL012', gananciaBruta: 210000, gananciaNeta: 170000, gastosCombustible: 40000 },
          { fecha: new Date(2023, 5, 22), patente: 'MNO345', gananciaBruta: 195000, gananciaNeta: 155000, gastosCombustible: 40000 },
        ];

        this.ganancias.set(datosFalsos);
        this.gananciasFiltradas.set(datosFalsos);
        
        // Extraer patentes únicas
        const patentesUnicas = [...new Set(datosFalsos.map(item => item.patente))];
        this.patentes.set(['todas', ...patentesUnicas]);
        
        this.cargando.set(false);
      }, 1500);
    } catch (err) {
      this.error.set('Error al cargar los datos. Intente nuevamente más tarde.');
      this.cargando.set(false);
      console.error('Error en carga de datos:', err);
    }
  }

  // Aplicar filtro cuando cambia la selección de patente
  aplicarFiltro(): void {
    if (this.patenteSeleccionada() === 'todas') {
      this.gananciasFiltradas.set(this.ganancias());
    } else {
      const filtradas = this.ganancias().filter(
        item => item.patente === this.patenteSeleccionada()
      );
      this.gananciasFiltradas.set(filtradas);
    }
  }

  // Optimización de rendimiento para ngFor
  trackByPatente(index: number, item: Ganancias): string {
    return item.patente + item.fecha.toISOString();
  }
}