import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BlogService } from '../../services/blog.service';
import Swal from 'sweetalert2';

// Importar Header y Footer si son standalone
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';

@Component({
  selector: 'app-blog-editar',
  standalone: true,
  templateUrl: './blog-editar.component.html',
  styleUrls: ['./blog-editar.component.css'],
  imports: [CommonModule, ReactiveFormsModule, HeaderComponent, FooterComponent] 
})
export class BlogEditarComponent implements OnInit {
  blogForm!: FormGroup;
  errorMessage: string | undefined;
  blogId!: number;

  constructor(
    private fb: FormBuilder,
    private blogService: BlogService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.blogId = Number(this.route.snapshot.paramMap.get('id'));

    this.blogForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      content: ['', [Validators.required, Validators.minLength(10)]],
      imageUrl: ['', [Validators.required]],
      author: ['', [Validators.required]]
    });

    this.blogService.getBlogPost(this.blogId).subscribe({
      next: (blog) => this.blogForm.patchValue(blog),
      error: () => {
        this.errorMessage = 'No se pudo cargar el blog.';
        Swal.fire({
          title: 'Error',
          text: this.errorMessage,
          icon: 'error',
          confirmButtonText: 'Aceptar'
        });
      }
    });
  }

  actualizarBlog(): void {
    if (this.blogForm.valid) {
      Swal.fire({
        title: '¿Actualizar Blog?',
        text: '¿Estás seguro de que quieres guardar los cambios?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Sí, actualizar',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          this.blogService.updateBlogPost(this.blogId, this.blogForm.value).subscribe({
            next: () => {
              Swal.fire({
                title: '¡Actualizado!',
                text: 'El blog se ha actualizado con éxito.',
                icon: 'success',
                confirmButtonText: 'Ok'
              }).then(() => {
                this.router.navigate(['/blog']);
              });
            },
            error: () => {
              this.errorMessage = 'Error al actualizar el blog.';
              Swal.fire({
                title: 'Error',
                text: this.errorMessage,
                icon: 'error',
                confirmButtonText: 'Aceptar'
              });
            }
          });
        }
      });
    }
  }

  cancelarEdicion(): void {
    Swal.fire({
      title: '¿Cancelar edición?',
      text: 'Los cambios no guardados se perderán.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, cancelar',
      cancelButtonText: 'Volver'
    }).then((result) => {
      if (result.isConfirmed) {
        this.router.navigate(['/blog']);
      }
    });
  }
}
