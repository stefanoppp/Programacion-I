import { Component, OnInit } from '@angular/core';
import { PoemaService } from 'src/app/service/poema.service';
import { CalificacionService } from 'src/app/service/calificacion.service';
import { ActivatedRoute} from '@angular/router';
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
  calificacion: any[] = []; // se inicializa como un arreglo vacío

  constructor(
    private poemaService: PoemaService, 
    private calificacionService:CalificacionService,
    private router:ActivatedRoute

  ) { }

  ngOnInit(): void {
    this.id=this.router.snapshot.paramMap.get('id') ||''
    this.poemaService.getPoema(this.id).subscribe((poema: Poema) => {
      const calificaciones = poema.calificacion
      if(calificaciones != undefined)
      {
        calificaciones.map((elemento)=>
        {
          this.calificacion.push([elemento["comentario"],
                               elemento["usuario"]["nombre"],
                               elemento["valoracion"],
                               elemento["id"]
        ]);
        })
      }
      this.poema = poema
      console.log(this.poema)
   });
   console.log(this.calificacion)
  }

  verComentario() {
    console.log(this.comentario);
  }

  calificar(): void {
    
  }
  eliminarCalificacion(id: number) {
    if (confirm("¿Quieres eliminar la calificacion?")) {
      this.calificacionService.eliminarCalificacion(id).subscribe(() => {
        // Eliminación exitosa, actualiza el array de usuarios
        this.calificacion = this.calificacion.filter(u => u.id !== id);
        location.reload();
      });
    }
  }

  getStars(rating: number): string {
    let stars = '';
    for (let i = 0; i < 5; i++) {
      if (i < rating) {
        stars += '&#9733;';
      } else {
        stars += '&#9734;';
      }
    }
    return stars;
  }
  get isToken(){
    return localStorage.getItem("token") || undefined
  }
  get isAdmin(){
    return localStorage.getItem("admin") ==='true'?true:false || undefined
  }  

}
