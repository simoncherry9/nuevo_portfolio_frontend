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
  email: string = '';  // Usamos email en lugar de username
  password: string = '';
  errorMessage: string = '';
  loading: boolean = false;

  constructor(private authService: AuthService, private router: Router) { }

  login(): void {
    this.loading = true;
    this.authService.login(this.email, this.password).subscribe(  // Asegúrate de que el frontend envíe un email
      (response: any) => {
        this.loading = false;
        this.authService.saveToken(response.token);
        this.router.navigate(['/admin']);
      },
      (error) => {
        this.loading = false;
        this.errorMessage = 'Credenciales incorrectas. Intenta de nuevo.';
      }
    );
  }
}
