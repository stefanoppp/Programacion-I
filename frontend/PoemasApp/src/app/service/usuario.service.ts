import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})

export class UsuarioService {
  url = 'api/usuarios';
  url2 ='api/usuario/'
  headers = new HttpHeaders() || undefined
  
  constructor(
  private httpClient: HttpClient
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
}


