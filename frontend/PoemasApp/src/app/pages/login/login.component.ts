import { Component, OnInit } from '@angular/core';
import { Auth1Service } from 'src/app/service/auth1.service';
import {Router} from '@angular/router'
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

//import{}            

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup

  constructor(
    private authService: Auth1Service,
    private router: Router,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['',Validators.required],
      contrasena: ['',Validators.required]
    }) 
  }
  login(dataLogin:any) {
    console.log('Comprobando credenciales..');
    this.authService.login(dataLogin).subscribe({          //me conecto con el servicio 
                          
        next: (rta) => {
          console.log('login exitoso!',rta.access_token);
          console.log('login exitoso!',rta.admin); //muestro el admin
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
  submit(){
    if(this.loginForm.valid){
      console.log(this.loginForm.value)
      let email = this.loginForm.value.email
      let contrasena = this.loginForm.value.contrasena
      // console.log('credenciales:',{email,contrasena})
      this.login({email,contrasena})
    }else{
      alert("formulario invalido")
    }
  }
}
