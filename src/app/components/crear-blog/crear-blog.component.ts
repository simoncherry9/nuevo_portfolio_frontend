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
    this.blogService.createBlogPost(this.blogPost).subscribe({
      next: (response) => {
        console.log('Blog creado:', response);
        Swal.fire({
          title: '¡Éxito!',
          text: 'El blog fue creado con éxito!',
          icon: 'success',
          confirmButtonText: 'Ok'
        }); 
        this.router.navigate(['/blog']);
      },
      error: (err) => {
        console.error('Error creando el blog:', err);
        Swal.fire({
          title: 'Error',
          text: 'Hubo un error al crear el blog. Verifica los campos e intenta nuevamente.',
          icon: 'error',
          confirmButtonText: 'Ok'
        }); 
      }
    });
  }

  cancel() {
    this.router.navigate(['/blogs']);
  }
}
