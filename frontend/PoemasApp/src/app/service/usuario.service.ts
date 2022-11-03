import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})

export class UsuarioService {
  //url = 'http://127.0.0.1:5000/usuarios';
  url = 'usuarios';
  
  constructor(
  private httpClient: HttpClient
  ) { } 
  getUsuarios() {
    return this.httpClient.get(this.url);
  } 
}
