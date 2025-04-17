import { Component } from '@angular/core';
import { ThemeService } from '../../services/theme.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';

@Component({
  imports: [ FontAwesomeModule ],
  standalone: true,
  selector: 'app-theme-toggle',
  templateUrl: "theme-toggle.component.html",
  styleUrls: ["theme-toggle.component.scss"],
})
export class ThemeToggleComponent {

  faSun = faSun;
  faMoon = faMoon;
  constructor(public themeService: ThemeService) {}
  
  toggleTheme() {
    this.themeService.toggleTheme();
  }
}