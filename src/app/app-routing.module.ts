import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminComponent } from './components/admin/admin.component';
import { BlogComponent } from './components/blog/blog.component';
import { ExperiencesComponent } from './components/experiences/experiences.component';
import { ImagesComponent } from './components/images/images.component';
import { LoginComponent } from './components/login/login.component';
import { MensajesComponent } from './components/mensajes/mensajes.component';
import { PortfolioComponent } from './components/portfolio/portfolio.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { SkillsComponent } from './components/skills/skills.component';
import { SociallinksComponent } from './components/sociallinks/sociallinks.component';
import { TestimonialsComponent } from './components/testimonials/testimonials.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },   // Ruta de login (sin AuthGuard)
  { path: 'portfolio', component: PortfolioComponent }, // Ruta pública para el portfolio

  // Rutas protegidas por AuthGuard
  {
    path: 'admin',
    canActivate: [AuthGuard],
    component: AdminComponent
  },
  { path: 'blog', component: BlogComponent, canActivate: [AuthGuard] },
  { path: 'experiences', component: ExperiencesComponent, canActivate: [AuthGuard] },
  { path: 'images', component: ImagesComponent, canActivate: [AuthGuard] },
  { path: 'mensajes', component: MensajesComponent, canActivate: [AuthGuard] },
  { path: 'projects', component: ProjectsComponent, canActivate: [AuthGuard] },
  { path: 'skills', component: SkillsComponent, canActivate: [AuthGuard] },
  { path: 'sociallinks', component: SociallinksComponent, canActivate: [AuthGuard] },
  { path: 'testimonials', component: TestimonialsComponent, canActivate: [AuthGuard] },

  // Redirección por defecto a la ruta portfolio cuando no se especifica ninguna ruta
  { path: '', redirectTo: '/portfolio', pathMatch: 'full' },

  // Redirección para rutas no definidas
  { path: '**', redirectTo: '/portfolio' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
