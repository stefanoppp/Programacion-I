import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CalificacionService {
  urlCalificacion= 'api/calificaciones';
  urlCalificacion2= 'api/calificacion/';
  constructor(
    private httpClient: HttpClient
  ) { }

  enviarCalificacion(usuarioId: number, poemaId: number, valoracion: number, comentario: string): Observable<any> {
    let auth_token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth_token}`
    });
    const body = { usuarioId, poemaId, valoracion, comentario };
    const requestOptions = { headers: headers };
    return this.httpClient.post(this.urlCalificacion, body, requestOptions);
  }
  eliminarCalificacion(id: number) {
    let auth_token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth_token}`
    });
    const requestOptions = { headers: headers };
    return this.httpClient.delete(`${this.urlCalificacion2}${id}`, requestOptions);
  }
}


