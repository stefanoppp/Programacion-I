import { Injectable } from '@angular/core';
import {CanActivate,UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenService } from '../service/token.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthsessionGuard implements CanActivate {
  constructor(
    private tokenService: TokenService,
    private router: Router
  ){}

  canActivate(
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    this.tokenService.removeTokenIfExpired();
    const token = localStorage.getItem('token');
    const aprobado = localStorage.getItem('aprobado');
    if (!token || aprobado === 'false') {
      return false;
    } else {
      return true;
    }
  } 
}

