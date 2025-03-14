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
    imageUrl: ''  
  };

  constructor(
    private blogService: BlogService, 
    private router: Router
  ) {}

  onSubmit() {
    
    if (!this.blogPost.title) {
      Swal.fire({
        title: 'Error',
        text: 'El título es obligatorio. Por favor, ingresa un título.',
        icon: 'error',
        confirmButtonText: 'Ok',
        customClass: {
          popup: 'swal2-popup',
          title: 'swal2-title',
          confirmButton: 'swal2-confirm'
        }
      });
      return;  
    }

    if (!this.blogPost.content) {
      Swal.fire({
        title: 'Error',
        text: 'El contenido es obligatorio. Por favor, ingresa contenido para el blog.',
        icon: 'error',
        confirmButtonText: 'Ok',
        customClass: {
          popup: 'swal2-popup',
          title: 'swal2-title',
          confirmButton: 'swal2-confirm'
        }
      });
      return;  
    }

    if (!this.blogPost.author) {
      Swal.fire({
        title: 'Error',
        text: 'El autor es obligatorio. Por favor, ingresa el nombre del autor.',
        icon: 'error',
        confirmButtonText: 'Ok',
        customClass: {
          popup: 'swal2-popup',
          title: 'swal2-title',
          confirmButton: 'swal2-confirm'
        }
      });
      return;  
    }

    if (!this.blogPost.imageUrl) {
      Swal.fire({
        title: 'Error',
        text: 'La URL de la imagen es obligatoria. Por favor, ingresa una URL válida.',
        icon: 'error',
        confirmButtonText: 'Ok',
        customClass: {
          popup: 'swal2-popup',
          title: 'swal2-title',
          confirmButton: 'swal2-confirm'
        }
      });
      return;  
    }

    
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
        Swal.fire({
          title: '¿Estás seguro?',
          text: '¡Perderás todos los cambios no guardados!',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Sí, cancelar',
          cancelButtonText: 'No, volver'
        }).then((result) => {
          if (result.isConfirmed) {
            this.router.navigate(['/blog']);
          }
        });
      }
}
