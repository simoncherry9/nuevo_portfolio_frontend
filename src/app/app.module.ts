import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';



import { AdminComponent } from './components/admin/admin.component';
import { PortfolioComponent } from './components/portfolio/portfolio.component';
import { BlogComponent } from './components/blog/blog.component';
import { MensajesComponent } from './components/mensajes/mensajes.component';
import { ExperiencesComponent } from './components/experiences/experiences.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { SkillsComponent } from './components/skills/skills.component';
import { SociallinksComponent } from './components/sociallinks/sociallinks.component';
import { TestimonialsComponent } from './components/testimonials/testimonials.component';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { FormsModule } from '@angular/forms';
import { HttpClientModule, provideHttpClient, withFetch, HTTP_INTERCEPTORS } from '@angular/common/http';


import { AuthTokenInterceptor } from './interceptors/auth-token.interceptor';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { CrearBlogComponent } from './components/crear-blog/crear-blog.component';
import { BlogVerComponent } from './components/blog-ver/blog-ver.component';
import { BlogEditarComponent } from './components/blog-editar/blog-editar.component';
import { ExperienciasEditarComponent } from './components/experiencias-editar/experiencias-editar.component';
import { ExperienciasCrearComponent } from './components/experiencias-crear/experiencias-crear.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ProfileEditComponent } from './components/profile-edit/profile-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    PortfolioComponent,
    ProjectsComponent,
    SkillsComponent,
    SociallinksComponent,
    TestimonialsComponent,
    BlogVerComponent,
    ProfileEditComponent,
  ],
  imports: [
    SweetAlert2Module.forRoot(),
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MensajesComponent,
    HeaderComponent,
    FooterComponent,
    BlogComponent,
    CrearBlogComponent,
    BlogEditarComponent,
    ExperiencesComponent,
    ExperienciasEditarComponent,
    ExperienciasCrearComponent,
    ProfileComponent,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthTokenInterceptor, multi: true },  
    provideHttpClient(withFetch()),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
