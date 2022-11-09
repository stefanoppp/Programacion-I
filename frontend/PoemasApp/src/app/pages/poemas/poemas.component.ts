import { Component, OnInit } from '@angular/core';
import { PoemaService } from 'src/app/service/poema.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-poemas',
  templateUrl: './poemas.component.html',
  styleUrls: ['./poemas.component.css']
})
export class PoemasComponent implements OnInit {
  arrayPoema:any
  id!:string
  constructor(private poemaService: PoemaService, private router:ActivatedRoute) { }

  ngOnInit(): void {
    this.id=this.router.snapshot.paramMap.get('id') ||''
    this.poemaService.getPoema(this.id).subscribe((poema:any)=>{
       console.log('JSON data:',poema);
       this.arrayPoema = poema
   })
  }

}
