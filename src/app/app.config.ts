import { ApplicationConfig } from '@angular/core';
import { provideRouter, Routes, withInMemoryScrolling } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { HeroComponent } from './components/hero/hero.component';
import { SkillsComponent } from './components/skills/skills.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { PortfolioComponent } from './components/portfolio/portfolio.component';
import { ContactComponent } from './components/contact/contact.component';
import { provideAnimations } from '@angular/platform-browser/animations';

const routes: Routes = [
  { path: 'home', component: HeroComponent },
  { path: 'skills', component: SkillsComponent },
  { path: 'projects', component: ProjectsComponent },
  { path: 'about', component: PortfolioComponent },
  { path: 'contact', component: ContactComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/home' },
];

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withInMemoryScrolling({ scrollPositionRestoration: 'top' })), // Correct usage
    provideAnimations(),
    provideHttpClient(),
  ],
};