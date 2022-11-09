import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import {Router} from '@angular/router'
//con el guardian vamos a comprobar si existe el token y si existe le voy a decir que es true. Si es false lo puedo rutear al home
@Injectable({
  providedIn: 'root'
})
export class AuthsessionGuard implements CanActivate {
  constructor(
    private router: Router
  ){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const token =localStorage.getItem('token');
    if(!token){
      this.router.navigate(['/'])
      return false
    }else{
      return true;
    }
  }
  
}
