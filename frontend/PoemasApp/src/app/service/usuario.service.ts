import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Paginado } from '../models/paginado.model';


@Injectable({
  providedIn: 'root'
})

export class UsuarioService {
  url = 'api/usuarios';
  url2 ='api/usuario/'
  headers = new HttpHeaders() || undefined
  
  constructor(
  private httpClient: HttpClient,
  
  ) { } 
  
  getUsuarios() {
    return this.httpClient.get(this.url);
  } 
  getUsuariosPaginado(paginado:Paginado): Observable<any> {
    let params = new HttpParams();
    if(paginado.page)
      params = params.append('page', paginado.page);
    if(paginado.per_page)
      params = params.append('per_page', paginado.per_page);
    if(paginado.order_by)
      params = params.append('order_by', paginado.order_by);
    return this.httpClient.get(this.url, { params: params });
  }
  
  getUsuario(id:string){
    let auth_token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth_token}`
    });
    const requestOptions = { headers: headers };
    return this.httpClient.get(this.url2+id,requestOptions);
  }
  
  
  //update usuario
  updateUsuario(id: number, nombre: string, email: string, contrasena: string){
    let auth_token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth_token}`
    });
    const body = { id, nombre, email, contrasena};
    const requestOptions = { headers: headers };
    return this.httpClient.put(this.url2+id,body,requestOptions);
  }

  //eliminar usuario
  deleteUsuario(id: number) {
    let auth_token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth_token}`
    });
    const requestOptions = { headers: headers };
    return this.httpClient.delete(`${this.url2}${id}`, requestOptions);
  }

  //buscar usuario con el buscador(key=nombre)
  buscarUsuarios(termino: string): Observable<any> {
    return this.httpClient.get(`${this.url}?nombre=${termino}`);
  }
  //crear usuario
  crearUsuario(nombre: string, email: string, contrasena: string): Observable<any> {
    let auth_token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth_token}`
    });
    const body = { nombre, email, contrasena };
    const requestOptions = { headers: headers };
    return this.httpClient.post(this.url, body, requestOptions);
  }

  registrarUsuario(nombre: string, email: string, contrasena: string): Observable<any> {
    let auth_token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth_token}`
    });
    const body = { nombre, email, contrasena };
    const requestOptions = { headers: headers };
    return this.httpClient.post(this.url, body, requestOptions);
  }
  updateEstadoAprobado(id: number, aprobado:boolean){
    let auth_token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth_token}`
    });
    const body = { aprobado};
    const requestOptions = { headers: headers };
    return this.httpClient.put(this.url2+id,body,requestOptions);
  }
}


