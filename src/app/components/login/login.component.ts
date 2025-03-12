import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [FormsModule, CommonModule]
})
export class LoginComponent {
  email = '';
  password = '';
  errorMessage = '';
  loading = false;

  constructor(private authService: AuthService, private router: Router) {}

  login(): void {
    this.loading = true;
    this.errorMessage = '';

    this.authService.login(this.email, this.password).subscribe({
      next: (response) => {
        this.loading = false;
        this.authService.saveToken(response.token); // Guarda el token en localStorage

        // Redirige después de un pequeño retraso para asegurarse de que el token se haya guardado
        setTimeout(() => {
          this.router.navigate(['/admin']);  // Redirige a /admin
        }, 100);
      },
      error: (error) => {
        this.loading = false;
        this.errorMessage = error.message || 'Credenciales incorrectas. Intenta de nuevo.';
      }
    });
  }
}
