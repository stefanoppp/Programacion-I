import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent implements OnInit {
  arrayPoemas = [
  {id: 1,
    titulo: 'Poema 1',
    usuario: 'Autor 1',
    fecha: '01/01/2021',
    contenido: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin tempus, urna vitae vestibulum consectetur, orci nunc malesuada mauris, sed dapibus nulla felis et erat. Morbi hendrerit lectus porttitor, suscipit velit ut, condimentum velit.',
    calificacion: '7.5',
  },
  { id: 2,
    titulo: 'Poema 2',
    usuario: 'Autor 2',
    fecha: '01/01/2021',
    contenido: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin tempus, urna vitae vestibulum consectetur, orci nunc malesuada mauris, sed dapibus nulla felis et erat. Morbi hendrerit lectus porttitor, suscipit velit ut, condimentum velit.',
    calificacion: '9.2',
  },
  { id: 3,
    titulo: 'Poema 3',
    usuario: 'Autor 3',
    fecha: '01/01/2021',
    contenido: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin tempus, urna vitae vestibulum consectetur, orci nunc malesuada mauris, sed dapibus nulla felis et erat. Morbi hendrerit lectus porttitor, suscipit velit ut, condimentum velit.',
    calificacion: '8.5',
  },
  { id: 4,
    titulo: 'Poema 4',
    usuario: 'Autor 4',
    fecha: '01/01/2021',
    contenido: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin tempus, urna vitae vestibulum consectetur, orci nunc malesuada mauris, sed dapibus nulla felis et erat. Morbi hendrerit lectus porttitor, suscipit velit ut, condimentum velit.',
    calificacion: '6.5',
  },
  { id: 5,
    titulo: 'Poema 5',
    usuario: 'Autor 5',
    fecha: '01/01/2021',
    contenido: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin tempus, urna vitae vestibulum consectetur, orci nunc malesuada mauris, sed dapibus nulla felis et erat. Morbi hendrerit lectus porttitor, suscipit velit ut, condimentum velit.',
    calificacion: '5.5',
  },
  { id: 6,
    titulo: 'Poema 6',
    usuario: 'Autor 6',
    fecha: '01/01/2021',
    contenido: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin tempus, urna vitae vestibulum consectetur, orci nunc malesuada mauris, sed dapibus nulla felis et erat. Morbi hendrerit lectus porttitor, suscipit velit ut, condimentum velit.',
    calificacion: '4.5',
  },
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
