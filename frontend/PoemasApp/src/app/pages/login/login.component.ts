import { Component, OnInit } from '@angular/core';
import { Auth1Service } from 'src/app/service/auth1.service';
import {Router} from '@angular/router'
import Swal from 'sweetalert2';

//import{}            

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private authService: Auth1Service,
    private router: Router
  ) { }

  ngOnInit(): void {  
  }
  login() {
    console.log('Comprobando credenciales..');
    this.authService.login().subscribe({          //me conecto con el servicio 
                          
        next: (rta) => {
          console.log('login exitoso!',rta.access_token);
          localStorage.setItem('token',rta.access_token);
          Swal.fire({
              title: 'Login exitoso!',
              text:'Bienvenido a miPoema',
              timer:2000,
              icon: 'success'
            })
          this.router.navigate(['/'])

      }, error: (error) => {
        Swal.fire({
          title: 'Credenciales incorrectas',
          text:'Intente nuevamente',
          icon: 'error'
        })       //puedo colocar algun swiss alert
          console.log('error',error);
          localStorage.removeItem('token');
          this.router.navigate(['/login'])

      }, complete: () =>{
          console.log('termino')
      }
    })
    
  }
}
