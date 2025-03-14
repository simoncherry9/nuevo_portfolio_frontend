import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BlogService } from '../../services/blog.service';
import { BlogPost } from '../../interfaces/blog';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import Swal from 'sweetalert2';  

@Component({
  selector: 'app-blog',
  standalone: true,
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css'],
  imports: [
    CommonModule,
    HeaderComponent,
    FooterComponent
  ]
})
export class BlogComponent implements OnInit {
  blogPosts: BlogPost[] = [];
  selectedPost: BlogPost | null = null; 

  constructor(private blogService: BlogService, private router: Router) {}

  ngOnInit(): void {
    this.loadBlogPosts();
  }

  loadBlogPosts(): void {
    this.blogService.getBlogPosts().subscribe(posts => {
      this.blogPosts = posts;
    });
  }

  editPost(id: number): void {
    this.router.navigate([`/blog-editar/${id}`]);
  }

  
  viewPost(id: number): void {
    this.router.navigate([`/blog-ver/${id}`]); 
  }

  
  deletePost(id: number): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'No podrás revertir esta acción!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar!',
      cancelButtonText: 'Cancelar',
      customClass: {
        popup: 'swal2-popup',
        title: 'swal2-title',
        confirmButton: 'swal2-confirm',
        cancelButton: 'swal2-cancel'
      }
    }).then((result) => {
      if (result.isConfirmed) {
        this.blogService.deleteBlogPost(id).subscribe(() => {
          this.loadBlogPosts();  
          Swal.fire({
            title: '¡Eliminado!',
            text: 'El blog ha sido eliminado con éxito.',
            icon: 'success',
            confirmButtonText: 'Ok',
            customClass: {
              popup: 'swal2-popup',
              title: 'swal2-title',
              confirmButton: 'swal2-confirm'
            }
          });
        });
      }
    });
  }

  
  navigateToCreateBlog(): void {
    this.router.navigate(['/crear-blog']);
  }
}
