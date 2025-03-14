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

  public isEmailValid(email: string): boolean {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(email);
  }

  login(): void {
    this.loading = true;
    this.errorMessage = '';

    if (!this.isEmailValid(this.email)) {
      this.loading = false;
      this.errorMessage = 'Por favor, ingresa un correo electrónico válido.';
      return;
    }

    if (this.password.trim() === '') {
      this.loading = false;
      this.errorMessage = 'La contraseña no puede estar vacía.';
      return;
    }

    this.authService.login(this.email, this.password).subscribe({
      next: (response) => {
        this.loading = false;
        this.authService.saveToken(response.token);

        setTimeout(() => {
          this.router.navigate(['/admin']);  
        }, 100);
      },
      error: (error) => {
        this.loading = false;
        if (error.status === 401) {
          this.errorMessage = 'Credenciales incorrectas. Intenta de nuevo.';
        } else if (error.status === 0) {
          this.errorMessage = 'Error de conexión. Verifica tu red.';
        } else {
          this.errorMessage = error.message || 'Ocurrió un error inesperado. Intenta de nuevo más tarde.';
        }
      }
    });
  }
}
