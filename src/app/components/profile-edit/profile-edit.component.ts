import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ProfileService } from '../../services/profile.service';
import { Profile } from '../../interfaces/profile';
import Swal from 'sweetalert2'; // Importa SweetAlert2

import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-profile-edit',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HeaderComponent,
    FooterComponent
  ],
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.css']
})
export class ProfileEditComponent implements OnInit {
  profileForm: FormGroup;
  profile!: Profile;

  constructor(
    private fb: FormBuilder,
    private profileService: ProfileService,
    private router: Router
  ) {
    this.profileForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      apellido: ['', [Validators.required, Validators.minLength(3)]],
      correo_electronico: ['', [Validators.required, Validators.email]],
      imageurl: [''],
      ciudad: [''],
      provincia: [''],
      pais: [''],
      descripcion: ['', Validators.maxLength(500)]
    });
  }

  ngOnInit(): void {
    const profileId = Number(this.router.url.split('/').pop());
    this.loadProfile(profileId);
  }

  loadProfile(id: number): void {
    this.profileService.getProfile(id).subscribe(
      (data: Profile) => {
        this.profile = data;
        this.profileForm.patchValue({
          nombre: data.nombre,
          apellido: data.apellido,
          correo_electronico: data.correo_electronico,
          imageurl: data.imageurl || '',
          ciudad: data.ciudad || '',
          provincia: data.provincia || '',
          pais: data.pais || '',
          descripcion: data.descripcion || ''
        });
      },
      (error) => {
        console.error('Error al cargar el perfil:', error);
      }
    );
  }

  onSubmit(): void {
    if (this.profileForm.valid) {
      const updatedProfile: Profile = this.profileForm.value;
      const profileId = this.profile.id;

      // Confirmación con SweetAlert antes de guardar
      Swal.fire({
        title: '¿Actualizar perfil?',
        text: '¿Estás seguro de que quieres guardar los cambios?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Sí, actualizar',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          this.profileService.updateProfile(profileId, updatedProfile).subscribe(
            (updatedData) => {
              Swal.fire({
                title: '¡Actualizado!',
                text: 'El perfil se ha actualizado con éxito.',
                icon: 'success',
                confirmButtonText: 'Ok'
              }).then(() => {
                this.router.navigate(['/profile']);
              });
            },
            (error) => {
              Swal.fire({
                title: 'Error',
                text: 'Hubo un problema al actualizar el perfil.',
                icon: 'error',
                confirmButtonText: 'Aceptar'
              });
            }
          );
        }
      });
    } else {
      Swal.fire({
        title: 'Formulario inválido',
        text: 'Por favor, revisa los campos y corrige los errores.',
        icon: 'warning',
        confirmButtonText: 'Aceptar'
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
        this.router.navigate(['/profile']);
      }
    });
  }
}
