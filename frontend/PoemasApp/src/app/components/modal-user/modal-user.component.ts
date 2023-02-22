import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UsuarioService } from 'src/app/service/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-user',
  templateUrl: './modal-user.component.html',
  styleUrls: ['./modal-user.component.css']
})
export class ModalComponent implements OnInit {
  id!: number;
  nombre!: string;
  email!: string;
  contrasena!: string;
  
  constructor(private usuarioService: UsuarioService, private rounte: ActivatedRoute) { }
  onSubmit(miFormulario:NgForm) {
    this.usuarioService.updateUsuario(this.id, miFormulario.value.nombre,miFormulario.value.email, miFormulario.value.contrasena).subscribe(() => {
      // La petición PUT fue exitosa
      // Actualiza los valores de los campos del formulario con los nuevos valores
      this.nombre = miFormulario.value.nombre;
      this.email = miFormulario.value.email;
      this.contrasena = miFormulario.value.contrasena;
      Swal.fire({
        title: 'Edicion completada',
        text: 'Has editado el perfil correctamente',
        icon: 'success'
      });
      console.log('edicion creada exitosamente');
      
    });
  }

  ngOnInit(): void {
      // Obtiene el id de la ruta y lo asigna a la variable 'id' del componente
      this.rounte.params.subscribe((params: { [x: string]: number; }) => {
      this.id = params['id'];
      });
  }

}
