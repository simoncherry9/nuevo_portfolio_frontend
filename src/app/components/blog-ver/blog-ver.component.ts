import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogService } from '../../services/blog.service'; // Asegúrate de tener el servicio importado
import { BlogPost } from '../../interfaces/blog';  // La interfaz BlogPost que ya definiste

@Component({
  selector: 'app-blog-ver',
  standalone: false,
  templateUrl: './blog-ver.component.html',
  styleUrls: ['./blog-ver.component.css']
})
export class BlogVerComponent implements OnInit {
  blogPost: BlogPost | undefined;
  errorMessage: string | undefined;

  constructor(
    private blogService: BlogService,
    private route: ActivatedRoute,
    private router: Router // Para redirigir a la página de blogs
  ) { }

  ngOnInit(): void {
    // Obtener el 'id' desde la ruta
    const id = Number(this.route.snapshot.paramMap.get('id'));
    
    if (id) {
      this.blogService.getBlogPost(id).subscribe({
        next: (blogPost) => {
          this.blogPost = blogPost;
        },
        error: (err) => {
          this.errorMessage = 'Hubo un error al obtener el blog.';
          console.error(err);
        }
      });
    }
  }

  // Método para navegar hacia la página de blogs
  goBack(): void {
    this.router.navigate(['/blog']);
  }
}
