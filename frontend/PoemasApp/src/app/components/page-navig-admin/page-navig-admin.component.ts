import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/service/usuario.service';
import { Paginado } from 'src/app/models/paginado.model';

@Component({
  selector: 'app-page-navig-admin',
  templateUrl: './page-navig-admin.component.html',
  styleUrls: ['./page-navig-admin.component.css']
})
export class PageNavigAdminComponent implements OnInit {

  arrayUsuarios: any[] = []; //guardo los datos del array original y el del buscador
  titulo: string = '';
  paginado: Paginado = new Paginado();
  
  constructor( private usuarioService:UsuarioService) { }

  ngOnInit(): void {
    this.paginado.per_page = 10;
    this.getUsuarios(this.paginado);
  }
  changePagina(page: number) {
    this.paginado.page = page;
    this.getUsuarios(this.paginado);
  }

  private getUsuarios(paginado: Paginado) {
    this.usuarioService.getUsuariosPaginado(paginado).subscribe((data: any) => {
      console.log('JSON data:', data);
      this.paginado.total = data.total;
      this.paginado.pages = data.paginas;
      this.arrayUsuarios = data.usuarios
    })
  }

}
