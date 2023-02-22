import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CalificacionService } from 'src/app/service/calificacion.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-poemas',
  templateUrl: './modal-poemas.component.html',
  styleUrls: ['./modal-poemas.component.css']
})
export class ModalPoemasComponent implements OnInit {
  
  @Input()
  poemaId: number | undefined;

  comentario: string | undefined;
  valoracion: number | undefined;

  constructor(
    private calificacionService:CalificacionService,
    private route:ActivatedRoute,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
  }

  enviarCalificacion() {
    const usuarioId = parseInt(localStorage.getItem('usuarioId') || '0', 10); // id del usuario logeado

    if(this.comentario && this.valoracion && usuarioId && this.poemaId) {
      /*console.log("Usuario ID: ", usuarioId);
      console.log("Poema ID: ", this.poemaId);
      console.log("Valoracion: ", this.valoracion);
      console.log("Comentario: ", this.comentario);*/
      this.calificacionService.enviarCalificacion(usuarioId, this.poemaId, this.valoracion, this.comentario)
      .subscribe(
        respuesta => {
          Swal.fire({
            title: 'Calificacion enviada',
            text: 'Su calificacion se ha enviado correctamente',
            icon: 'success'
          });
          console.log('Calificación creada exitosamente');
          // Agrega aquí cualquier código que quieras ejecutar después de crear la calificación exitosamente
        },
        error => {
          if (error.status == 409){
          Swal.fire({
            title: 'Error al calificar',
            text: 'No puede calificar 2 veces un mismo poema',
            icon: 'error'
          });
          console.error('Error al crear la calificación:', error);
          // Agrega aquí cualquier código que quieras ejecutar en caso de error
        }if(error.status == 400){
          Swal.fire({
            title: 'Error al calificar',
            text: 'No puede calificar su propio poema.',
            icon: 'error'
          });
        }
        }
      );
    } else {
      Swal.fire({
        title: 'Campos obligatorios',
        text: 'Por favor, complete todos los campos para poder calificar.',
        icon: 'warning'
      });
      console.error("Falta algun parametro");
    }
  }

  calificar(valoracion: number): void {
    this.valoracion = valoracion;
  }

}





