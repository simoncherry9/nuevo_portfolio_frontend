import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { ExperienceService } from '../../services/experiencia.service';
import { Experience } from '../../interfaces/experiencia';
import Swal from 'sweetalert2';  
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-experiences',
  standalone: true,
  templateUrl: './experiences.component.html',
  styleUrls: ['./experiences.component.css'],
  imports: [CommonModule, HeaderComponent, FooterComponent]
})
export class ExperiencesComponent implements OnInit {
  experiences: Experience[] = [];
  loading = true;

  constructor(
    private experienceService: ExperienceService,
    private router: Router  
  ) {}

  ngOnInit(): void {
    this.fetchExperiences();
  }

  fetchExperiences(): void {
    this.experienceService.getAllExperiences().subscribe({
      next: (data) => {
        this.experiences = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error al obtener experiencias:', err);
        this.loading = false;
      }
    });
  }

  editExperience(id: number): void {
    
    this.router.navigate([`/experiencias-editar/${id}`]);
  }

  deleteExperience(id: number): void {
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
        this.experienceService.deleteExperience(id).subscribe(() => {
          this.experiences = this.experiences.filter(exp => exp.id !== id);
          Swal.fire({
            title: '¡Eliminado!',
            text: 'La experiencia ha sido eliminada con éxito.',
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

  
  addExperience(): void {
    this.router.navigate(['/experiencias-crear']);  
  }
}
