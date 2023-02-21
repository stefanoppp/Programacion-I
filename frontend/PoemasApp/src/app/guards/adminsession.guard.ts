import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenService } from '../service/token.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AdminsessionGuard implements CanActivate {
  constructor(
    private tokenService: TokenService,
    private router: Router
  ){}

  canActivate(
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    this.tokenService.removeTokenIfExpired();
    const admin = localStorage.getItem('admin') === 'true';
    if (!admin) {
      return false;
    } else {
      return true;
    }
  }
}
