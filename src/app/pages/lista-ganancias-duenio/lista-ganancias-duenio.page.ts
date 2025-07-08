// lista-ganancias-duenio.page.ts
import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { FirebaseService } from 'src/app/services/firebase.service';

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
  imports: [CommonModule, FormsModule, IonicModule],
})
export class ListaGananciasDuenioPage implements OnInit {
  // Señales reactivas para el estado del componente
  ganancias = signal<Ganancias[]>([]);
  gananciasFiltradas = signal<Ganancias[]>([]);
  patentes = signal<string[]>([]);
  patenteSeleccionada = signal<string>('todas');
  cargando = signal<boolean>(true);
  error = signal<string>('');

  constructor(private firebase: FirebaseService) {}

  ngOnInit(): void {
    this.cargarDatos();
  }

  // Carga los datos desde Firebase
  private cargarDatos(): void {
    this.cargando.set(true);
    this.firebase.getCollection('ganancias').subscribe({
      next: (datos: any[]) => {
        // Convierte fecha a Date si es string
        const ganancias: Ganancias[] = datos.map((item) => ({
          fecha: item.fecha instanceof Date ? item.fecha : new Date(item.fecha),
          patente: item.patente,
          gananciaBruta: item.gananciaBruta,
          gananciaNeta: item.gananciaNeta,
          gastosCombustible: item.gastosCombustible,
        }));

        this.ganancias.set(ganancias);
        this.gananciasFiltradas.set(ganancias);

        // Extraer patentes únicas
        const patentesUnicas = [
          ...new Set(ganancias.map((item) => item.patente)),
        ];
        this.patentes.set(['todas', ...patentesUnicas]);

        this.cargando.set(false);
      },
      error: (err) => {
        this.error.set(
          'Error al cargar los datos. Intente nuevamente más tarde.'
        );
        this.cargando.set(false);
        console.error('Error en carga de datos:', err);
      },
    });
  }

  // Aplicar filtro cuando cambia la selección de patente
  aplicarFiltro(): void {
    if (this.patenteSeleccionada() === 'todas') {
      this.gananciasFiltradas.set(this.ganancias());
    } else {
      const filtradas = this.ganancias().filter(
        (item) => item.patente === this.patenteSeleccionada()
      );
      this.gananciasFiltradas.set(filtradas);
    }
  }

  // Optimización de rendimiento para ngFor
  trackByPatente(index: number, item: Ganancias): string {
    return item.patente + item.fecha.toISOString();
  }
}
