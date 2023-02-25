import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Paginado } from '../models/paginado.model';
import { Poema } from '../models/poema.model';

@Injectable({
  providedIn: 'root'
})
export class PoemaService {

  url = 'api/poemas';
  url2 ='api/poema/'
  
  constructor(
  private httpClient: HttpClient,
  ) { } 
  
  getPoemas() {
    return this.httpClient.get(this.url);
  }

  getPoemasPaginado(paginado:Paginado): Observable<any> {
    let params = new HttpParams();
    if(paginado.page)
      params = params.append('page', paginado.page);
    if(paginado.per_page)
      params = params.append('per_page', paginado.per_page);
    if(paginado.order_by)
      params = params.append('order_by', paginado.order_by);
    return this.httpClient.get(this.url, { params: params });
  }

  /*seleccionar poema en particular*/
  getPoema(id: string): Observable<Poema> {
    return this.httpClient.get(this.url2+id);
  }
  
  
  /*crear poema */
  crearPoema(usuarioId:number,titulo: string, contenido: string): Observable<any> {
    let auth_token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth_token}`
    });
    const body = { usuarioId,titulo, contenido};
    const requestOptions = { headers: headers };
    return this.httpClient.post(this.url, body, requestOptions);
  }

  buscarPoemas(titulo: string, paginado:Paginado): Observable<any> {
    let params = new HttpParams();
    if(paginado.page)
      params = params.append('page', paginado.page);
    if(paginado.per_page)
      params = params.append('per_page', paginado.per_page);
    if(paginado.order_by)
      params = params.append('order_by', paginado.order_by);
    if(titulo)
      params = params.append('titulo', titulo);
    return this.httpClient.get(`${this.url}`, { params: params });
  }
  
  
}
