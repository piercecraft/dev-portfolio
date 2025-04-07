import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ContentEnService } from '../../services/content-en.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { ThemeToggleComponent } from '../theme-toggle/theme-toggle.component';

@Component({
  standalone: true,
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  imports: [RouterLink, RouterLinkActive, ThemeToggleComponent]
})
export class HeaderComponent {
  menuOpen = false;
  
  private contentEnService = inject(ContentEnService);
  name$ = this.contentEnService.getContent('name');
  
  lnk_home$ = this.contentEnService.getContent('lnk_home');
  lnk_skills$ = this.contentEnService.getContent('lnk_skills');
  lnk_projects$ = this.contentEnService.getContent('lnk_projects');
  lnk_about$ = this.contentEnService.getContent('lnk_about');
  lnk_contact$ = this.contentEnService.getContent('lnk_contact');

  name = toSignal(this.name$, { initialValue: '' });
  lnk_home = toSignal(this.lnk_home$, { initialValue: 'home' });
  lnk_skills = toSignal(this.lnk_skills$, { initialValue: 'skills' });
  lnk_projects = toSignal(this.lnk_projects$, { initialValue: 'projects' });
  lnk_about = toSignal(this.lnk_about$, { initialValue: 'about' });
  lnk_contact = toSignal(this.lnk_contact$, { initialValue: 'contact' });


  

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }

  closeMenu(): void {
    this.menuOpen = false;
  }
}