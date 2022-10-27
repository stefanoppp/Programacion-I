import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-users',
  templateUrl: './view-users.component.html',
  styleUrls: ['./view-users.component.css']
})
export class ViewUsersComponent implements OnInit {

    arrayUsuarios = [
      { id:1, 
      nombre:'Juan Perez', 
      email:'juanperez@gmail.com',
      cant_poemas: 5,
      cant_reviews: 3,
      },
      { id:2,
      nombre:'Maria Lopez',
      email:'marialopez@gmail.com',
      cant_poemas: 2,
      cant_reviews: 1,
      },
      { id:3,
      nombre:'Pedro Gomez',
      email:'pedrogomez@gmail.com',
      cant_poemas: 1,
      cant_reviews: 0,
      },
      { id:4,
      nombre:'Jose Rodriguez',
      email:'josesitorodriguez@gmail.com',
      cant_poemas: 0,
      cant_reviews: 0,
      },
      { id:5,
      nombre:'Ana Martinez',
      email:'anamartinez@gmail.com', 
      cant_poemas: 0,
      cant_reviews: 0,
      },
      { id:6,
      nombre:'Luisa Fernandez',
      email:'luisafernandez@gmail.com',
      cant_poemas: 1,
      cant_reviews: 20,
      },
      { id:7,
      nombre:'Carlos Sanchez',
      email:'carlossanchez@gmail.com',
      cant_poemas: 2,
      cant_reviews: 0,
      },
      { id:8,
      nombre:'Marta Garcia',
      email:'martagarcia@gmail.com',
      cant_poemas: 4,
      cant_reviews: 3,
      },
      { id:9,
      nombre:'Sofia Perez',
      email:'sofiperez@gmail.com',
      cant_poemas: 1,
      cant_reviews: 3,
      },
      { id:10,
      nombre:'Lucas Lopez',
      email:'lucaslopez@gmail.com',
      cant_poemas: 3,
      cant_reviews: 5,
      },
    ]
    constructor() { 
  }

  ngOnInit(): void {
  }

}
