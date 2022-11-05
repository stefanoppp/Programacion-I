import { Component, OnInit } from '@angular/core';
import { PoemaService } from 'src/app/service/poema.service';

@Component({
  selector: 'app-poemas',
  templateUrl: './poemas.component.html',
  styleUrls: ['./poemas.component.css']
})
export class PoemasComponent implements OnInit {
  arrayPoema: any[] = [];
  constructor(private poemaService: PoemaService,) { }

  ngOnInit(): void {
    this.poemaService.getPoema().subscribe((data:any)=>{
      console.log('JSON data:',data.poemas);
      this.arrayPoema = data.poemas
    })

  }

}
