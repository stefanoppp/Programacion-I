import { Component, Input, OnInit } from '@angular/core';
import { PoemaService } from 'src/app/service/poema.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crear-poema',
  templateUrl: './crear-poema.component.html',
  styleUrls: ['./crear-poema.component.css']
})

export class CrearPoemaComponent implements OnInit {

  titulo: string = '';
  contenido: string = '';
 

  constructor(private poemaService: PoemaService) { }

  ngOnInit(): void {
  }
  crearPoema() {
    const usuarioId = parseInt(localStorage.getItem('usuarioId') || '0', 10); // id del usuario logeado

    if (!this.titulo || !this.contenido) {
      Swal.fire({
        title: 'Campos obligatorios',
        text: 'Por favor, complete todos los campos para poder crear un poema.',
        icon: 'warning'
      });
    } else {
      this.poemaService.crearPoema(usuarioId,this.titulo, this.contenido).subscribe((respuesta) => {
        // Agregar el poema recién creado al array de poemas
        this.titulo = '';
        this.contenido = '';
  
        // Mostramos alerta de SweetAlert indicando que se ha creado el poema correctamente
        Swal.fire({
          title: 'poema creado',
          text: 'El poema se ha creado correctamente.',
          icon: 'success'
        });
      }, (err: any) => {
        console.error(err);
  
        // Mostrar una alerta de SweetAlert indicando que ha ocurrido un error al crear el usuario
        Swal.fire({
          title: 'Error al crear poema',
          text: 'Necesitas realizar mas calificaciones.',
          icon: 'error'
        });
      });
    }
   
  }
}
