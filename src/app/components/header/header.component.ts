import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service'; // Asegúrate de importar el servicio correctamente

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  constructor(private authService: AuthService, private router: Router) {}

  logout() {
    // Llamada al método logout del AuthService
    this.authService.logout();

    // Redirigir a la página de login después de cerrar sesión
    this.router.navigate(['/login']);
  }

  goToMessages() {
    // Lógica para ir a la página de mensajes
    console.log('Go to messages clicked');
    this.router.navigate(['/mensajes']);
  }
}
