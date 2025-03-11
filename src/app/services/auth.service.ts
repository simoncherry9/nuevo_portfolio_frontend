import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3001/api/users/login';  // Asegúrate de que la URL coincida exactamente

  constructor(private http: HttpClient) { }

  // Configuración de cabeceras por defecto
  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });
  }

  // Método para realizar login
  login(email: string, password: string): Observable<any> {
    const headers = this.getHeaders();
    return this.http.post(this.apiUrl, { email, password }, { headers }).pipe(
      catchError(error => {
        console.error('Error en el login:', error);
        return throwError(() => new Error('Error en la autenticación'));
      })
    );
  }

  // Método para guardar el token en localStorage
  saveToken(token: string): void {
    localStorage.setItem('authToken', token);
  }

  // Método para obtener el token desde localStorage
  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  // Método para comprobar si el usuario está autenticado
  isAuthenticated(): boolean {
    return this.getToken() !== null;
  }

  // Método para cerrar sesión
  logout(): void {
    localStorage.removeItem('authToken');
  }
}
