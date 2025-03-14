import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ExperienceService } from '../../services/experiencia.service';
import { Experience } from '../../interfaces/experiencia';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-experiencias-crear',
  standalone: true,
  templateUrl: './experiencias-crear.component.html',
  styleUrls: ['./experiencias-crear.component.css'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    HeaderComponent,
    FooterComponent
  ]
})
export class ExperienciasCrearComponent {
  experienceForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private experienceService: ExperienceService,
    private router: Router
  ) {
    this.experienceForm = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(100)]],
      company: ['', [Validators.required, Validators.maxLength(100)]],
      startDate: ['', Validators.required],
      endDate: [''],
      description: ['', Validators.maxLength(500)],
      isActive: [1, Validators.required] 
    });
  }

  createExperience() {
    if (this.experienceForm.invalid) {
      Swal.fire({
        title: 'Error',
        text: 'Por favor, completa correctamente los campos obligatorios.',
        icon: 'error',
        confirmButtonText: 'Ok'
      });
      return;
    }

    const experience: Experience = this.experienceForm.value;

    this.experienceService.addExperience(experience).subscribe({
      next: () => {
        Swal.fire({
          title: '¡Éxito!',
          text: 'La experiencia ha sido creada exitosamente.',
          icon: 'success',
          confirmButtonText: 'Ok'
        }).then(() => {
          this.experienceForm.reset({ isActive: 1 });
          this.router.navigate(['/experiences']);
        });
      },
      error: (error) => {
        console.error('Error al crear la experiencia:', error);
        Swal.fire({
          title: 'Error',
          text: 'Ocurrió un error al guardar la experiencia.',
          icon: 'error',
          confirmButtonText: 'Ok'
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
        this.experienceForm.reset({ isActive: 1 }); 
        this.router.navigate(['/experiences']);
      }
    });
  }
}
