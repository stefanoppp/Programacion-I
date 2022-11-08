import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable,take } from 'rxjs';
import { environment } from 'src/environments/environment';
import {Router} from '@angular/router'

@Injectable({
  providedIn: 'root'
})
export class Auth1Service {

  constructor(
    private httpClient:HttpClient,
    private router: Router
  ) { }
  login(): Observable<any> {
    let dataLogin ={email:"pancho@gmail.com", contrasena: "12345"}
    console.log(environment.url)
    return this.httpClient.post("api/auth/login",dataLogin).pipe(take(1))

  }
  logout(){
    localStorage.removeItem('token')
    this.router.navigate(['/'])
  }
}
