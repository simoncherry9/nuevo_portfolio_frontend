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

  showConfirmationModal(id: number): void {
    this.currentPostId = id;
    this.showModal = true;  
  }

  onConfirmDelete(confirm: boolean): void {
    if (confirm && this.currentPostId !== null) {
      this.deletePost(this.currentPostId);
    }
    this.showModal = false;  
  }

  deletePost(id: number): void {
    this.blogService.deleteBlogPost(id).subscribe(() => {
      this.loadBlogPosts(); 
    });
  }
}
