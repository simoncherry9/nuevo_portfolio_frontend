import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';  
import { ProfileService } from '../../services/profile.service';  
import { Profile } from '../../interfaces/profile';  


import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-profile',
  standalone: true,  
  imports: [
    CommonModule,
    HeaderComponent,
    FooterComponent
  ],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  profiles: Profile[] = [];  
  isLoading: boolean = true;  
  errorMessage: string = '';  

  constructor(
    private router: Router,
    private profileService: ProfileService  
  ) { }

  ngOnInit(): void {
    this.loadProfiles();  
  }

  
  loadProfiles(): void {
    this.profileService.getProfiles().subscribe(
      (data: Profile[]) => {
        console.log('Perfiles cargados:', data); 
        this.profiles = data;
        this.isLoading = false;
      },
      (error) => {
        this.isLoading = false;
        this.errorMessage = 'Hubo un error al cargar los perfiles.';
        console.error('Error al cargar los perfiles:', error);
      }
    );
  }

  
  editProfile(id: number): void {
    
    
    this.router.navigate(['/profile-edit', id]);  
  }
}
