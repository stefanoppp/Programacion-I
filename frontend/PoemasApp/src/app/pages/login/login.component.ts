import { Component, OnInit } from '@angular/core';
import { Auth1Service } from 'src/app/service/auth1.service';
//import{}            

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private authService: Auth1Service
  ) { }

  ngOnInit(): void {  
  }
  login() {
    console.log('Comprobando credenciales..');
    this.authService.login().subscribe({          //me conecto con el servicio 
                          
        next: (rta) => {
          console.log('login exitoso!',rta.access_token);
          localStorage.setItem('token',rta.access_token);

      }, error: (error) => {
          alert('credenciales incorrectas');        //puedo colocar algun swiss alert
          console.log('error',error);
          localStorage.removeItem('token');

      }, complete: () =>{
          console.log('termino')
      }
    })
  }
}
