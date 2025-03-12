import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service'; 

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  constructor(private authService: AuthService, private router: Router) {}

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  goToMessages() {
    console.log('Go to messages clicked');
    this.router.navigate(['/mensajes']);
  }

  goToAdmin() {
    this.router.navigate(['/admin']); 
  }
}
