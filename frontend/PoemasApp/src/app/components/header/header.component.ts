import { Component, OnInit } from '@angular/core';
import { Auth1Service } from 'src/app/service/auth1.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  constructor(
    private authService:Auth1Service
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

}
