import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BlogService } from '../../services/blog.service';
import { BlogPost } from '../../interfaces/blog';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { ModalConfirmationComponent } from '../../components/modal-confirmation/modal-confirmation.component';

@Component({
  selector: 'app-blog',
  standalone: true,
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css'],
  imports: [
    CommonModule,
    HeaderComponent,
    FooterComponent,
    ModalConfirmationComponent 
  ]
})
export class BlogComponent implements OnInit {
  blogPosts: BlogPost[] = [];
  showModal: boolean = false;
  currentPostId: number | null = null;
  selectedPost: BlogPost | null = null; // Para almacenar el post seleccionado

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
    this.router.navigate([`/edit-blog/${id}`]);
  }

  // Método para abrir el modal de confirmación
  openModal(post: BlogPost): void {
    this.selectedPost = post;  // Guardamos el post seleccionado para mostrar su contenido
    this.showModal = true;      // Mostramos el modal
  }

  // Método que maneja la apertura del modal de confirmación
  showConfirmationModal(id: number): void {
    this.currentPostId = id;
    this.showModal = true;
  }

  // Método que se activa cuando el usuario confirma la eliminación
  onConfirmDelete(confirm: boolean): void {
    if (confirm && this.currentPostId !== null) {
      this.deletePost(this.currentPostId);
    }
    this.showModal = false;  // Cerramos el modal de confirmación
  }

  // Método para eliminar el post
  deletePost(id: number): void {
    this.blogService.deleteBlogPost(id).subscribe(() => {
      this.loadBlogPosts();  // Recargamos los posts después de la eliminación
    });
  }

  // Método para cerrar el modal de contenido completo
  closeModal(): void {
    this.selectedPost = null;  // Limpiamos el post seleccionado
    this.showModal = false;    // Cerramos el modal
  }

  navigateToCreateBlog(): void {
    this.router.navigate(['/crear-blog']);
  }  
  
}
