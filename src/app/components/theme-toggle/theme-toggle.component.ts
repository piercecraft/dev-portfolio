import { Component } from '@angular/core';
import { ThemeService } from '../../services/theme.service';

@Component({
  standalone: true,
  selector: 'app-theme-toggle',
  templateUrl: "theme-toggle.component.html",
  styleUrls: ["theme-toggle.component.scss"],
})
export class ThemeToggleComponent {
  constructor(public themeService: ThemeService) {}
  
  toggleTheme() {
    this.themeService.toggleTheme();
  }
}