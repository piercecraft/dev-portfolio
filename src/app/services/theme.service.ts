import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly storageKey = 'theme-preference';
  private readonly mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

  currentTheme: 'light' | 'dark' = 'light';

  constructor() {
    this.initializeTheme();
  }

  private initializeTheme() {
    const savedTheme = localStorage.getItem(this.storageKey);
    const systemPrefersDark = this.mediaQuery.matches;
    
    this.currentTheme = savedTheme 
      ? savedTheme as 'light' | 'dark'
      : systemPrefersDark ? 'dark' : 'light';
    
    this.applyTheme();
    this.mediaQuery.addEventListener('change', (e) => {
      if (!localStorage.getItem(this.storageKey)) {
        this.currentTheme = e.matches ? 'dark' : 'light';
        this.applyTheme();
      }
    });
  }

  toggleTheme() {
    this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';
    localStorage.setItem(this.storageKey, this.currentTheme);
    this.applyTheme();
  }

  private applyTheme() {
    document.documentElement.setAttribute('data-theme', this.currentTheme);
  }
}