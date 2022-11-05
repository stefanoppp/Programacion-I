import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable,take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Auth1Service {

  constructor(
    private httpClient:HttpClient
  ) { }
  login(): Observable<any>{
    let dataLogin ={email:'dsdd', password: '123124'}
    return this this.httpClient.post

  }
}
