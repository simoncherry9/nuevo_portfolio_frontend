import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// Componentes
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

// Módulos de Angular
import { FormsModule } from '@angular/forms';
import { HttpClientModule, provideHttpClient, withFetch, HTTP_INTERCEPTORS } from '@angular/common/http';

// Interceptores
import { AuthTokenInterceptor } from './interceptors/auth-token.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    PortfolioComponent,
    BlogComponent,
    MensajesComponent,
    ExperiencesComponent,
    ImagesComponent,
    ProjectsComponent,
    SkillsComponent,
    SociallinksComponent,
    TestimonialsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule  // Se sigue usando HttpClientModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthTokenInterceptor, multi: true },  // Correcto
    provideHttpClient(withFetch())  // Habilita el uso de fetch APIs
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
