import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ExperienceService } from '../../services/experiencia.service';
import { Experience } from '../../interfaces/experiencia';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2'; 

@Component({
  selector: 'app-experiencias-editar',
  standalone: true,
  templateUrl: './experiencias-editar.component.html',
  styleUrls: ['./experiencias-editar.component.css'],
  imports: [
    CommonModule,
    HeaderComponent,
    FooterComponent,
    FormsModule
  ]
})
export class ExperienciasEditarComponent implements OnInit {
  experience: Experience = {
    title: '',
    company: '',
    startDate: '',
    endDate: null,
    description: '',
    isActive: 1,
    createdAt: '',
  };

  isLoading: boolean = false;
  id: number | null = null;

  constructor(
    private experienceService: ExperienceService,
    private route: ActivatedRoute,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    if (this.id) {
      this.loadExperience();
    }
  }

  loadExperience(): void {
    this.isLoading = true;
    this.experienceService.getAllExperiences().subscribe({
      next: (experiences) => {
        this.experience = experiences.find(exp => exp.id === this.id) || this.experience;
        
        this.formatDates();
        this.isLoading = false;
      },
      error: (err) => {
        this.handleError('No se pudo cargar la experiencia.');
      },
    });
  }

  cancelarEdicion(): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Si cancelas, perderás los cambios realizados.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, cancelar',
      cancelButtonText: 'No, continuar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.router.navigate(['/experiences']);
      }
    });
  }

  updateExperience(): void {
    if (this.id !== null && this.experience.title && this.experience.company) {
        const updatedExperience = { 
          ...this.experience, 
          isActive: this.isActiveValue,
          startDate: this.formatDate(this.experience.startDate),
          endDate: this.experience.endDate ? this.formatDate(this.experience.endDate) : null
        };
        
        this.isLoading = true;
        this.experienceService.updateExperience(this.id, updatedExperience).subscribe({
            next: () => this.handleSuccess('La experiencia se ha actualizado con éxito.'),
            error: () => this.handleError('No se pudo actualizar la experiencia.'),
        });
    } else {
        this.handleError('Por favor, complete todos los campos requeridos.');
    }
  }

  private get isActiveValue(): number {
    return this.experience.isActive ? 1 : 0;
  }

  private formatDates(): void {
    this.experience.startDate = this.formatDate(this.experience.startDate);
    this.experience.endDate = this.experience.endDate ? this.formatDate(this.experience.endDate) : null;
  }

  private formatDate(date: string): string {
    
    const d = new Date(date);
    if (!isNaN(d.getTime())) {
      return d.toISOString().split('T')[0]; 
    }
    return ''; 
  }

  private handleError(message: string): void {
    this.isLoading = false;
    Swal.fire({
      title: 'Error',
      text: message,
      icon: 'error',
      confirmButtonText: 'Aceptar',
    });
  }

  private handleSuccess(message: string): void {
    this.isLoading = false;
    Swal.fire({
      title: '¡Actualizado!',
      text: message,
      icon: 'success',
      confirmButtonText: 'Ok',
    }).then(() => {
      this.router.navigate(['/experiences']);
    });
  }
}
