import { Component, OnInit } from '@angular/core';
import { Auth1Service } from 'src/app/service/auth1.service';
import { PoemaService } from 'src/app/service/poema.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  usuarios: any[] = [];

  constructor(
    private authService:Auth1Service,
    private poemaService: PoemaService
  ) { }

  ngOnInit(): void {
  }
  get isToken(){
    return localStorage.getItem("token") || undefined
  }
  cerrarSesion(){
    this.authService.logout()
  }
  get isAdmin(){
    return localStorage.getItem("admin") ==='true'?true:false || undefined
  }

  get aprobado(){
    return localStorage.getItem("aprobado") ==='true'?true:false || undefined
  }


}
