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
import { CrearBlogComponent } from './components/crear-blog/crear-blog.component';
import { AuthGuard } from './guards/auth.guard';
import { BlogVerComponent } from './components/blog-ver/blog-ver.component';  // Asegúrate de importar el componente

const routes: Routes = [
  { path: 'login', component: LoginComponent },   
  { path: 'portfolio', component: PortfolioComponent },  // Página pública para mostrar los blogs

  {
    path: 'admin',
    canActivate: [AuthGuard],
    component: AdminComponent
  },
  { path: 'blog', component: BlogComponent, canActivate: [AuthGuard] }, // Solo accesible para usuarios autenticados (para editar blogs)
  { path: 'blog-ver/:id', component: BlogVerComponent },  // Ruta pública para ver un blog específico
  { path: 'crear-blog', component: CrearBlogComponent, canActivate: [AuthGuard] },
  { path: 'experiences', component: ExperiencesComponent, canActivate: [AuthGuard] },
  { path: 'images', component: ImagesComponent, canActivate: [AuthGuard] },
  { path: 'mensajes', component: MensajesComponent, canActivate: [AuthGuard] },
  { path: 'projects', component: ProjectsComponent, canActivate: [AuthGuard] },
  { path: 'skills', component: SkillsComponent, canActivate: [AuthGuard] },
  { path: 'sociallinks', component: SociallinksComponent, canActivate: [AuthGuard] },
  { path: 'testimonials', component: TestimonialsComponent, canActivate: [AuthGuard] },

  { path: '', redirectTo: '/portfolio', pathMatch: 'full' },
  { path: '**', redirectTo: '/portfolio' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
