import { Component, OnInit } from '@angular/core';
import { Auth1Service } from 'src/app/service/auth1.service';
import { UsuarioService } from 'src/app/service/usuario.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  usuarios: any[] = [];

  constructor(
    private authService:Auth1Service,
    private usuarioService: UsuarioService
  ) { }

  ngOnInit(): void {
  }
  get isToken(){
    return localStorage.getItem("token") || undefined
  }
  cerrarSesion(){
    this.authService.logout()
  }
  get isAdmin(){
    return localStorage.getItem("admin") ==='true'?true:false || undefined
  }
  buscarUsuarios(termino:string){
     this.usuarioService.buscarUsuarios(termino).subscribe((data:any) => {
      console.log(data);
      this.usuarios = data.usuarios // Asignamos los usuarios recibidos desde el servicio a la propiedad 'usuarios'
    });
  }

}
