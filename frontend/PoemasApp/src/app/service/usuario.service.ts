import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


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
}


