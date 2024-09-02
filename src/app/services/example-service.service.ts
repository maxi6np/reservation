import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment.development';
import { Reserve } from '../models/reserve.model';
import { Cliente } from '../models/cliente.model';

@Injectable({
  providedIn: 'root'
})
export class ExampleService {

  private headers = new HttpHeaders({
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  });

  reserves: Reserve[] = [];
  private numOfReserves = new BehaviorSubject<Reserve[]>([]);
  reservesUpdate = this.numOfReserves.asObservable();

  constructor(private http: HttpClient) {
    this.getReservas();
  }

  getExampleData(): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/api/index`, { headers: this.headers })
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    // Puedes personalizar el manejo de errores aquí
    console.error('An error occurred:', error);
    const err = new Error('Something went wrong; please try again later.');
    return throwError(() => err);
  }

  getReservas(): void {
    this.http.get<any>(`${environment.apiUrl}/api/getReservas`, { headers: this.headers })
      .pipe(
        catchError(this.handleError)
      ).subscribe(data => {
        data.data.forEach((reserve: any) => {
          this.reserves.push(new Reserve(
            reserve.id_reserva,
            new Cliente(reserve.cliente.nombre, reserve.cliente.email),
            reserve.fecha_reserva,
            reserve.hora_reserva,
            reserve.cantidad_personas,
            reserve.comment));
        });
        this.numOfReserves.next(this.reserves);
      });
    console.log(this.reserves)
  }

  addReserve(reserve: Reserve) {

    const body = {
      id_reserva: reserve.id_reserva,
      cliente: reserve.cliente,
      fecha_reserva: reserve.fecha_reserva,
      hora_reserva: reserve.hora_reserva,
      cantidad_personas: reserve.cantidad_personas
    }

    this.http.post<any>(`${environment.apiUrl}/api/createReserva`, body, { headers: this.headers })
      .pipe(
        catchError(this.handleError)
      ).subscribe(data => {
        if (data.message == 'Reserva creada correctamente') {
          this.reserves.push(reserve);
          this.numOfReserves.next(this.reserves);
        } else {
          alert('Something went wrong!')
        }
      })
  }

  deleteReserve(reserve: Reserve) {
    this.http.delete<any>(`${environment.apiUrl}/api/deleteReserva/${reserve.id_reserva}`, { headers: this.headers })
      .pipe(
        catchError(this.handleError)
      ).subscribe(data => {
        if (data.message == 'Reserva eliminada correctamente') {
          this.reserves = this.reserves.filter(r => r.id_reserva !== reserve.id_reserva)
          this.numOfReserves.next(this.reserves);
        } else {
          alert('Something went wrong!')
        }
      })
  }

  editReserve(reserve: Reserve, newReserve: Reserve) {
    this.deleteReserve(reserve);
    this.addReserve(newReserve);
  }

  getReserve(email: string) {
    return this.reserves.find(r => r.cliente.email === email);
  }

}
