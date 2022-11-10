import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsuarioService } from 'src/app/service/usuario.service';

@Component({
  selector: 'app-dashboard-user',
  templateUrl: './dashboard-user.component.html',
  styleUrls: ['./dashboard-user.component.css']
})
export class DashboardUserComponent implements OnInit {
  usuario_id! : string;
  arrayUsuario : any;
  constructor(
  private route: ActivatedRoute ,
  private usuarioService: UsuarioService,
  )
  { }

  ngOnInit(): void {
    this.usuario_id = this.route.snapshot.paramMap.get('id') || '';
    this.usuarioService.getUsuario(this.usuario_id).subscribe((usuario:any)=>{
      console.log('Usuario:',usuario);
      this.arrayUsuario = usuario
  })
  }

}
