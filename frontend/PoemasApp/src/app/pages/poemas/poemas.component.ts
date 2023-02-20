import { Component, OnInit } from '@angular/core';
import { PoemaService } from 'src/app/service/poema.service';
import { ActivatedRoute } from '@angular/router';
import { Poema } from 'src/app/models/poema.model';

@Component({
  selector: 'app-poemas',
  templateUrl: './poemas.component.html',
  styleUrls: ['./poemas.component.css']
})
export class PoemasComponent implements OnInit {
  poema: Poema | undefined;
  id!:string
  comentario: string | undefined;

  constructor(private poemaService: PoemaService, private router:ActivatedRoute) { }

  ngOnInit(): void {
    this.id=this.router.snapshot.paramMap.get('id') ||''
    this.poemaService.getPoema(this.id).subscribe((poema: Poema) => {
       console.log('JSON data:',poema);
       this.poema = poema;
   });
  }

  verComentario() {
    console.log(this.comentario);
  }

  calificar(): void {
    
  }

}
