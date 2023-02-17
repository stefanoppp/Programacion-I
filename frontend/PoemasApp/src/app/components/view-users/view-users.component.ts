import { Component, OnInit } from '@angular/core';
import { UsuarioService } from './../../service/usuario.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-view-users',
  templateUrl: './view-users.component.html',
  styleUrls: ['./view-users.component.css']
})
export class ViewUsersComponent implements OnInit {
    
    arrayUsuarios: any[] = []; //guardo los datos del array original y el del buscador

    nombre: string = '';
    email: string = '';
    contrasena: string = '';
   
    constructor(
      private postUsuario: UsuarioService,
      private router: Router,
      private usuarioService: UsuarioService
    ) { } 
  

  ngOnInit(): void {
    
    this.postUsuario.getUsuarios().subscribe((data:any) =>{
      console.log('JSON data:', data.usuarios);
      this.arrayUsuarios = data.usuarios})
     
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
    buscarUsuarios(termino:string){
      this.usuarioService.buscarUsuarios(termino).subscribe((data:any) => {
       console.log(data);
       this.arrayUsuarios = data.usuarios // Asignamos los usuarios recibidos desde el servicio a la propiedad 'usuarios'
     });
   }
   crearUsuario() {
    if (!this.nombre || !this.email || !this.contrasena) {
      Swal.fire({
        title: 'Campos obligatorios',
        text: 'Por favor, complete todos los campos para poder crear un usuario.',
        icon: 'warning'
      });
    } else {
      this.usuarioService.crearUsuario(this.nombre, this.email, this.contrasena).subscribe((res: any) => {
        // Agregar el usuario recién creado al array de usuarios
        this.arrayUsuarios.push(res.usuario);
        this.nombre = '';
        this.email = '';
        this.contrasena = '';
  
        // Mostrar una alerta de SweetAlert indicando que se ha creado el usuario correctamente
        Swal.fire({
          title: 'Usuario creado',
          text: 'El usuario se ha creado correctamente.',
          icon: 'success'
        });
      }, (err: any) => {
        console.error(err);
  
        // Mostrar una alerta de SweetAlert indicando que ha ocurrido un error al crear el usuario
        Swal.fire({
          title: 'Error al crear usuario',
          text: 'Ha ocurrido un error al crear el usuario. Por favor, inténtelo de nuevo más tarde.',
          icon: 'error'
        });
      });
    }
   
  }
}
