import { Component, OnInit } from '@angular/core';
import { UsuarioService } from './../../service/usuario.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-view-users',
  templateUrl: './view-users.component.html',
  styleUrls: ['./view-users.component.css']
})
export class ViewUsersComponent implements OnInit {

  arrayUsuarios: any[] = []; //guardo los datos del array original y el del buscador

  id!: number;
  aprobado!:boolean

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


  constructor(
    private postUsuario: UsuarioService,
    private router: Router,
    private usuarioService: UsuarioService
  ) { }


  ngOnInit(): void {

    this.postUsuario.getUsuarios().subscribe((data: any) => {
      console.log('JSON data:', data.usuarios);
      this.arrayUsuarios = data.usuarios;
    })

  }
  deleteUsuario(id: number) {
    if (confirm("¿Está seguro que desea eliminar este usuario?")) {
      this.postUsuario.deleteUsuario(id).subscribe(() => {
        // Eliminación exitosa, actualiza el array de usuarios
        this.arrayUsuarios = this.arrayUsuarios.filter(u => u.id !== id);
        this.router.navigate(['/admin']) //me redirige a la vista del admin
      });
    }
  }
  buscarUsuarios(termino: string) {
    this.usuarioService.buscarUsuarios(termino).subscribe((data: any) => {
      console.log(data);
      this.arrayUsuarios = data.usuarios // Asignamos los usuarios recibidos desde el servicio a la propiedad 'usuarios'
    });
  }
  crearUsuario(miFormulario: NgForm) {
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
    this.usuarioService.crearUsuario(this.nombre, this.email, this.contrasena).subscribe((res: any) => {
      // Agregar el usuario recién creado al array de usuarios
      this.arrayUsuarios.push(res.usuario);
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
        if (result.isConfirmed) {
          location.reload();
        }
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
 updateEstadoAprobado(id:number){
  this.aprobado=!this.aprobado

  const btn = document.getElementById(`aprobado-btn-${id}`);

  // verifica si btn no es null antes de agregar o eliminar una clase CSS
  if (btn) {
    if (this.aprobado) {
      btn.classList.add('true');
      btn.classList.remove('false');
    } else {
      btn.classList.add('false');
      btn.classList.remove('true');
    }

    btn.textContent = this.aprobado.toString(); // actualiza el texto del botón
  }

  console.log("El id del usuario seleccionado es: ", id);
  this.usuarioService.updateEstadoAprobado(id,this.aprobado).subscribe(
    (data: any) => {
      console.log(data); // muestra la respuesta del servidor si es necesario
    },
    (error: any) => {
      console.log(error); // muestra el error si ocurre alguno
    }
  ); 
 }
}
