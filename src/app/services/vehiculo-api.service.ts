import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

interface VehicleResponse {
  marca: string;
  modelo: string;
  vin: string;
  numeroMotor: string;
  anio: string;
  tipoCombustible: string;
}
@Injectable({
  providedIn: 'root',
})
export class VehiculoAPIService {
  private baseUrl = 'https://chile.getapi.cl/v1/vehicles/plate';
  constructor(private http: HttpClient) {}
  getVehicleByPlate(plate: string): Observable<VehicleResponse> {
    const url = `${this.baseUrl}/${encodeURIComponent(plate)}`;

    // Si necesitas usar un token, reemplaza esto por el real:
    const headers = new HttpHeaders({
      accept: 'application/json',
      // 'apikey': 'TU_API_KEY'  // Si es requerida
    });

    return this.http.get<any>(url, { headers }).pipe(
      map((response) => {
        if (!response.success || !response.data) {
          throw new Error('Respuesta inválida de la API');
        }

        return {
          marca: response.data.model.brand.name,
          modelo: response.data.model.name,
          vin: response.data.vinNumber,
          numeroMotor: response.data.engineNumber,
          anio: response.data.year,
          tipoCombustible: response.data.fuel,
        };
      }),
      catchError((error) => this.handleError(error)) // <-- Fix: preserve 'this' context
    );
  }

  private handleError(error: HttpErrorResponse) {
    let mensaje = 'Ocurrió un error desconocido';

    if (error.error instanceof ErrorEvent) {
      mensaje = `Error de red: ${error.error.message}`;
    } else if (error.status === 404) {
      mensaje = 'Patente no encontrada';
    } else if (error.status === 429) {
      mensaje = 'Límite de solicitudes excedido';
    } else {
      mensaje = `Error ${error.status}: ${error.message}`;
    }

    return throwError(() => new Error(mensaje));
  }
}
