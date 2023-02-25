import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable,take } from 'rxjs';
import { environment } from 'src/environments/environment';
import {Router} from '@angular/router'
import Swal from 'sweetalert2';


@Injectable({
  providedIn: 'root'
})
export class Auth1Service {

  constructor(
    private httpClient:HttpClient,
    private router: Router
  ) { }
  login(dataLogin:any): Observable<any> {
    //let dataLogin ={email:"pancho@gmail.com", contrasena: "12345"}
    console.log(environment.url)
    return this.httpClient.post("api/auth/login",dataLogin).pipe(take(1))

  }
  logout(){
    Swal.fire({
      title: 'Esta seguro que quiere cerrar sesion?',
      text: "Podrás volverte a logear",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, cerrar sesion',
      
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Sesión cerrada!',
          'Tu sesión fue cerrada',
          'success'
        ).then(()=>{
          localStorage.removeItem('token')
          localStorage.removeItem('admin')
          localStorage.removeItem('usuarioId')
          localStorage.removeItem('aprobado')
          this.router.navigate(['/'])
        })
      }
    })
    //localStorage.removeItem('token')
    //this.router.navigate(['/'])
  }
}
