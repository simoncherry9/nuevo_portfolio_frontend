import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BlogPost } from '../../interfaces/blog';
import { BlogService } from '../../services/blog.service';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import Swal from 'sweetalert2';  

@Component({
  selector: 'app-crear-blog',
  standalone: true,
  templateUrl: './crear-blog.component.html',
  styleUrls: ['./crear-blog.component.css'],
  imports: [
    CommonModule, 
    FormsModule, 
    HeaderComponent, 
    FooterComponent
  ]
})
export class CrearBlogComponent {
  blogPost: BlogPost = {
    id: 0,
    title: '',
    content: '',
    publishedAt: new Date().toISOString().split('T')[0], 
    author: '',
    isActive: true,
    imageUrl: ''  // Asegúrate de que esta propiedad esté presente
  };

  constructor(
    private blogService: BlogService, 
    private router: Router
  ) {}

  onSubmit() {
    // Validación de los campos vacíos
    if (!this.blogPost.title || !this.blogPost.content || !this.blogPost.author || !this.blogPost.imageUrl) {
      Swal.fire({
        title: 'Error',
        text: 'Todos los campos son obligatorios. Por favor, rellena todos los campos.',
        icon: 'error',
        confirmButtonText: 'Ok',
        customClass: {
          popup: 'swal2-popup',
          title: 'swal2-title',
          confirmButton: 'swal2-confirm'
        }
      });
      return;  // Detener la ejecución si los campos están vacíos
    }

    // Si los campos son válidos, enviar la solicitud para crear el blog
    this.blogService.createBlogPost(this.blogPost).subscribe({
      next: (response) => {
        console.log('Blog creado:', response);
        Swal.fire({
          title: '¡Éxito!',
          text: 'El blog fue creado con éxito!',
          icon: 'success',
          confirmButtonText: 'Ok',
          customClass: {
            popup: 'swal2-popup',
            title: 'swal2-title',
            confirmButton: 'swal2-confirm'
          }
        });
        this.router.navigate(['/blog']);
      },
      error: (err) => {
        console.error('Error creando el blog:', err);
        Swal.fire({
          title: 'Error',
          text: 'Hubo un error al crear el blog. Verifica los campos e intenta nuevamente.',
          icon: 'error',
          confirmButtonText: 'Ok',
          customClass: {
            popup: 'swal2-popup',
            title: 'swal2-title',
            confirmButton: 'swal2-confirm'
          }
        });
      }
    });
  }

  cancel() {
    this.router.navigate(['/blog']);
  }
}
