import { Component, OnInit } from '@angular/core';
import { UsuarioService } from './../../service/usuario.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-view-users',
  templateUrl: './view-users.component.html',
  styleUrls: ['./view-users.component.css']
})
export class ViewUsersComponent implements OnInit {
    
    arrayUsuarios: any[] = []; //guardo los datos del array original y el del buscador
   
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
  }

