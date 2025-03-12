import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    console.log('Verificando autenticación...');

    if (this.authService.isAuthenticated()) {
      console.log('Usuario autenticado.');
      return true;
    } else {
      console.log('No autenticado, redirigiendo a /login...');
      this.router.navigate(['/login']);
      return false;
    }
  }
}
