import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UsuarioService } from 'src/app/service/usuario.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-modal-user',
  templateUrl: './modal-user.component.html',
  styleUrls: ['./modal-user.component.css']
})
export class ModalComponent implements OnInit {
  id!: number;
  nombre: string='';
  email: string='';
  contrasena: string='';

  nombreRegex = /^[a-zA-Z\s]+$/; // Expresión regular para validar solo letras y espacios en blanco en el nombre
  emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/; // Expresión regular para validar el formato de correo electrónico
  contrasenaRegex = /^(?=.*\d)(?=.*[A-Z])(?=.*\W)(?=.*[a-z])[^\s]{8,}$/; // Expresión regular para validar una contraseña segura

  nombreErrorMsg = '';
  emailErrorMsg = '';
  contrasenaErrorMsg = '';
  
  constructor(private usuarioService: UsuarioService, private route: ActivatedRoute) { }
  
  nombreError = false;
  emailError = false;
  contrasenaError = false;

  onSubmit(miFormulario: NgForm) {
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
    this.contrasenaErrorMsg = 'Ingrese una contraseña segura (8 caracteres, al menos una mayúscula, una minúscula y un número).';
    return;
  }

    // Si el formulario es válido, envía la petición PUT para actualizar el usuario
    this.usuarioService.updateUsuario(this.id, miFormulario.value.nombre, miFormulario.value.email, miFormulario.value.contrasena).subscribe(() => {
      
      // La petición PUT fue exitosa
      // Actualiza los valores de los campos del formulario con los nuevos valores

      this.nombre = miFormulario.value.nombre;
      this.email = miFormulario.value.email;
      this.contrasena = miFormulario.value.contrasena;
      
      Swal.fire({
        icon: 'success',
        title: 'Actualización Exitosa',
        text: 'El usuario ha sido actualizado correctamente',
        confirmButtonText: 'Aceptar'
      })
      .then((result) => {
        // Recargar la página si el usuario da click en el botón de aceptar
        if (result.isConfirmed) {
          location.reload();
        }
      });
      
    },error=>{
      if (error.status === 400) {
        Swal.fire({
          icon: 'error',
          title: 'Email duplicado',
          text: 'Error al actualizar el usuario',
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

  resetFormulario(miFormulario: NgForm) {
    miFormulario.resetForm();
    this.resetErrors();
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

  /*reseteo los valores del formulario cuando le doy al boton cerrar*/ 
  resetForm(miFormulario: NgForm) {
    miFormulario.resetForm();
    this.nombre = '';
    this.email = '';
    this.contrasena = '';
    this.resetErrors();
  }
  ngOnInit(): void {
    // Obtiene el id de la ruta y lo asigna a la variable 'id' del componente
    this.route.params.subscribe((params: { [x: string]: number; }) => {
      this.id = params['id'];
    });
  }

}

