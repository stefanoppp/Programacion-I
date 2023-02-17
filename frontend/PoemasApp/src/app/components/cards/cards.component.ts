import { Component, OnInit } from '@angular/core';
import { Paginado } from 'src/app/models/paginado.model';
import { PoemaService } from 'src/app/service/poema.service';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent implements OnInit {
  arrayPoemas: any[] = [];
  paginado: Paginado = new Paginado();
  constructor(private poemaService: PoemaService,) { }

  ngOnInit(): void {
    this.paginado.per_page = 6;
    this.getPoemas(this.paginado);
  }
  changePagina(page: number) {
    this.paginado.page = page;
    this.getPoemas(this.paginado);
  }

  private getPoemas(paginado: Paginado) {
    this.poemaService.getPoemasPaginado(this.paginado).subscribe((data: any) => {
      console.log('JSON data:', data);
      this.paginado.total = data.total;
      this.paginado.pages = data.paginas;
      this.arrayPoemas = data.poemas
    })
  }
  get token() {
    return localStorage.getItem("token") || undefined

  }
}
