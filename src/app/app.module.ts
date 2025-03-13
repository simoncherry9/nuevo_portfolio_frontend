import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';



import { AdminComponent } from './components/admin/admin.component';
import { PortfolioComponent } from './components/portfolio/portfolio.component';
import { BlogComponent } from './components/blog/blog.component';
import { MensajesComponent } from './components/mensajes/mensajes.component';
import { ExperiencesComponent } from './components/experiences/experiences.component';
import { ImagesComponent } from './components/images/images.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { SkillsComponent } from './components/skills/skills.component';
import { SociallinksComponent } from './components/sociallinks/sociallinks.component';
import { TestimonialsComponent } from './components/testimonials/testimonials.component';


import { FormsModule } from '@angular/forms';
import { HttpClientModule, provideHttpClient, withFetch, HTTP_INTERCEPTORS } from '@angular/common/http';


import { AuthTokenInterceptor } from './interceptors/auth-token.interceptor';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { ModalConfirmationComponent } from './components/modal-confirmation/modal-confirmation.component';
import { CrearBlogComponent } from './components/crear-blog/crear-blog.component';

@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    PortfolioComponent,
    ExperiencesComponent,
    ImagesComponent,
    ProjectsComponent,
    SkillsComponent,
    SociallinksComponent,
    TestimonialsComponent,
    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MensajesComponent,
    HeaderComponent,
    ModalConfirmationComponent,
    FooterComponent,
    BlogComponent,
    CrearBlogComponent,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthTokenInterceptor, multi: true },  
    provideHttpClient(withFetch())  
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
