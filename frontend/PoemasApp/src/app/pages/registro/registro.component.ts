import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/service/usuario.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  nombre: string = '';
  email: string = '';
  contrasena: string = '';

  nombreRegex = /^[a-zA-Z\s]+$/; // Expresión regular para validar solo letras y espacios en blanco en el nombre
  emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/; // Expresión regular para validar el formato de correo electrónico
  contrasenaRegex = /^(?=.*\d)(?=.*[A-Z])(?=.*\W)(?=.*[a-z])[^\s]{8,}$/; // Expresión regular para validar una contraseña segura
  
  nombreErrorMsg = '';
  emailErrorMsg = '';
  contrasenaErrorMsg = '';

  nombreError = false;
  emailError = false;
  contrasenaError = false;

  constructor(private usuarioService: UsuarioService, private router:Router) { }

  ngOnInit(): void {
  }

  registrarUsuario(miFormulario: NgForm) {
    // Validación del nombre
    if (!miFormulario.value.nombre || !this.nombreRegex.test(miFormulario.value.nombre)) {
      this.nombreError = true;
      this.nombreErrorMsg = 'Ingrese un nombre válido.';
      return;
    }

    // Validación del email
    if (!miFormulario.value.email || !this.emailRegex.test(miFormulario.value.email)) {
      this.emailError = true;
      this.emailErrorMsg = 'Ingrese un correo electrónico válido.';
      return;
    }

    // Validación de la contraseña
    if (!miFormulario.value.contrasena || !this.contrasenaRegex.test(miFormulario.value.contrasena)) {
      this.contrasenaError = true;
      this.contrasenaErrorMsg = 'Ingrese una contraseña segura (8 caracteres, al menos una mayúscula, un numero y un caracter especial).';
      return;
    }



    this.usuarioService.registrarUsuario(this.nombre, this.email, this.contrasena).subscribe((res: any) => {
      // Agregar el usuario recién creado al array de usuarios
      this.nombre = '';
      this.email = '';
      this.contrasena = '';

      // Mostramos alerta de SweetAlert indicando que se ha creado el usuario correctamente
      Swal.fire({
        title: 'Usuario creado',
        text: 'El usuario se ha creado correctamente.',
        icon: 'success'
      })
      .then((result) => {
        // Recargar la página si el usuario da click en el botón de aceptar
        this.router.navigate(['/login'])
      });
    }, error=>{
      if (error.status === 400) {
        Swal.fire({
          icon: 'error',
          title: 'Email duplicado',
          text: 'Correo electronico en uso',
          confirmButtonText: 'Aceptar'
        })
      }
    })
 
  }
  resetErrors() {
    this.nombreError = false;
    this.emailError = false;
    this.contrasenaError = false;
  }
 
  onChangeNombre() {
    this.resetErrors();
  }

  onChangeEmail() {
    this.resetErrors();
  }

  onChangeContrasena() {
    this.resetErrors();
  }

}
