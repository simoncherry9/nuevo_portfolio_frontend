import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogService } from '../../services/blog.service'; 
import { BlogPost } from '../../interfaces/blog';  

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
    private router: Router 
  ) { }

  ngOnInit(): void {
    
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

  
  goBack(): void {
    this.router.navigate(['/blog']);
  }
}
