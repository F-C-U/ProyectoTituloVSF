import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  standalone: true,
  selector: 'app-lista-combustible',
  templateUrl: './lista-combustible.page.html',
  styleUrls: ['./lista-combustible.page.scss'],
  imports: [IonicModule, CommonModule, FormsModule]
})
export class ListaCombustiblePage {
  constructor(private firebase:FirebaseService){
    this.obtenerRegistros();
  }
  registrosCombustible: {id:string, fecha: string; monto: number; patente: string; urlBoleta: string; }[] = [];

  mesSeleccionado: string = '';
  anioSeleccionado: string = '';

  get mesesDisponibles(): string[] {
    const meses = new Set(this.registrosCombustible.map(r => r.fecha.split('-')[1]));
    return Array.from(meses).sort();
  }

  get aniosDisponibles(): string[] {
    const anios = new Set(this.registrosCombustible.map(r => r.fecha.split('-')[0]));
    return Array.from(anios).sort();
  }

  get registrosFiltrados() {
    return this.registrosCombustible.filter(r => {
      const [anio, mes] = r.fecha.split('-');
      return (
        (!this.mesSeleccionado || mes === this.mesSeleccionado) &&
        (!this.anioSeleccionado || anio === this.anioSeleccionado)
      );
    });
  }

  esImagen(ruta: string): boolean {
    return /\.(png|jpe?g|heic)$/i.test(ruta);
  }

  verBoleta(ruta: string): void {
    // Abre la boleta en una nueva pestaña
    window.open(ruta, '_blank');
  }


  editarCombustible(registro: { fecha: string; monto: number; patente: string; urlBoleta: string }) {
    console.log('Editar registro:', registro);
    // Aquí podrías abrir un modal de edición
  }

  eliminarCombustible(fecha:any){
    return this.firebase.deleteDocument('combustible/'+ fecha)
  }
  obtenerRegistros() {
    this.firebase.getCollection('combustible').subscribe((data: any[]) => {
      console.log('Datos obtenidos:', data);
      this.registrosCombustible = data.map(item => ({
        id: item.id,
        fecha: item.fecha,
        monto: item.monto,
        patente: item.patente,
        urlBoleta: item.archivo
      }));
      console.log('Registros de combustible obtenidos:', this.registrosCombustible);
    })
  }
}