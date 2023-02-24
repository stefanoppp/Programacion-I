import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
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

  comentarioRegex = /^.{30,}$/;

  comentarioErrorMsg = '';
  
  comentarioError = false;
 

  constructor(
    private calificacionService:CalificacionService,
  
  
  ) { }

  ngOnInit(): void {
  }

  enviarCalificacion(miFormulario:NgForm) {
    const usuarioId = parseInt(localStorage.getItem('usuarioId') || '0', 10); // id del usuario logeado


    if (!miFormulario.value.comentario|| !this.comentarioRegex.test(miFormulario.value.comentario)) {
      this.comentarioError = true;
      this.comentarioErrorMsg = 'Tu comentario debe tener un minimo de 30 caracteres.';
      return;
    }

    if(this.poemaId && this.comentario && this.valoracion && usuarioId) {
      this.calificacionService.enviarCalificacion(usuarioId, this.poemaId, this.valoracion, this.comentario)
      .subscribe(
        respuesta => {
          Swal.fire({
            title: 'Calificacion enviada',
            text: 'Su calificacion se ha enviado correctamente',
            icon: 'success'
          })
          .then((result) => {
            if (result.isConfirmed) {
              location.reload();
            }
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
    }else{
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
  resetErrors() {
    this.comentarioError = false;
  
  }
  resetFormulario(miFormulario: NgForm) {
    miFormulario.resetForm();
    this.resetErrors();
  }
  onChangeComentario() {
    this.resetErrors();
  }
  resetForm(miFormulario: NgForm) {
    miFormulario.resetForm();
    this.comentario = '';
    this.resetErrors();
  }
  

}





