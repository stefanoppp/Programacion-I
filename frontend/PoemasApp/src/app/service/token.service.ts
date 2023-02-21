import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  constructor(
    private router: Router
  ) { }

  removeTokenIfExpired() {
    const token = localStorage.getItem('token');
    if (token) {
      const tokenExpirationDate = new Date(JSON.parse(atob(token.split('.')[1])).exp * 1000);
      if (new Date() > tokenExpirationDate) {
        localStorage.removeItem('token');
        localStorage.removeItem('usuarioId');
        localStorage.removeItem('admin');
        this.router.navigate(['/login']);
        
      }
    }
  }
}
