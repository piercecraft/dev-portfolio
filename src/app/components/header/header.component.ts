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
  name = toSignal(this.name$, { initialValue: '' });

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }

  closeMenu(): void {
    this.menuOpen = false;
  }
}