import { Component, inject, AfterViewInit, ElementRef, HostListener } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ContentEnService } from '../../services/content-en.service';
import { ThemeService } from '../../services/theme.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faAngular, faSass, faFontAwesome } from '@fortawesome/free-brands-svg-icons';
import { faMoon, faSun, faSeedling, faStream, faTerminal, faMobileScreenButton, faLanguage } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-hero',
  standalone: true,
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss'],
  imports: [RouterLink, RouterLinkActive, FontAwesomeModule]
})
export class HeroComponent implements AfterViewInit {
  constructor(private el: ElementRef, public themeService: ThemeService) {}
  private resizeObserver!: ResizeObserver;
  ngAfterViewInit() {
    this.setupTooltips();
    window.addEventListener('resize', this.setupTooltips.bind(this));
    this.resizeObserver = new ResizeObserver(() => {
      if (window.innerWidth <= 767) {
        this.resetMobileAnimation();
      }
    });
    this.resizeObserver.observe(this.el.nativeElement);
  }

  @HostListener('window:scroll')
  onScroll() {
    this.updateTooltipPositions();
  }

  setupTooltips() {
    if (window.innerWidth < 768) return;
    
    const techItems = this.el.nativeElement.querySelectorAll('.tech-list-tech');
    techItems.forEach((item: HTMLElement) => {
      const tooltip = item.querySelector('.tech-tooltip');
      if (tooltip) {
        tooltip.classList.remove('bottom');
      }
    });
    this.updateTooltipPositions();
  }

  updateTooltipPositions() {
    if (window.innerWidth < 768) return;

    const techItems = this.el.nativeElement.querySelectorAll('.tech-list-tech');
    techItems.forEach((item: HTMLElement) => {
      const tooltip = item.querySelector('.tech-tooltip') as HTMLElement;
      if (!tooltip) return;

      // Temporarily show for measurement
      const originalVisibility = tooltip.style.visibility;
      tooltip.style.visibility = 'hidden';
      tooltip.style.display = 'block';
      
      const itemRect = item.getBoundingClientRect();
      const tooltipHeight = tooltip.offsetHeight;
      const spaceAbove = itemRect.top;
      const spaceBelow = window.innerHeight - itemRect.bottom;

      // Flip if not enough space above
      if (spaceAbove < tooltipHeight + 20 && spaceBelow > tooltipHeight + 20) {
        tooltip.classList.add('bottom');
      } else {
        tooltip.classList.remove('bottom');
      }

      // Restore original state
      tooltip.style.display = '';
      tooltip.style.visibility = originalVisibility;
    });
  }
  resetMobileAnimation() {
    const techItems = this.el.nativeElement.querySelectorAll('.tech-list-tech');
    techItems.forEach((item: HTMLElement) => {
      item.classList.remove('active', 'exiting');
    });
    
    // Trigger reflow
    void this.el.nativeElement.offsetHeight;
    
    // Restart animation
    if (this.techInterval) clearInterval(this.techInterval);
    this.startTechRotation();
  }

  faMoon = faMoon;
  faSun = faSun;
  faSeedling = faSeedling;
  faAngular = faAngular;
  faSass = faSass;
  faFontAwesome = faFontAwesome;
  faStream = faStream;
  faTerminal = faTerminal;
  faMobileScreenButton = faMobileScreenButton;
  faLanguage = faLanguage;


  heroImage() {
    if (this.themeService.currentTheme === 'dark') {
      return 'img/screen-dark.jpg'
    } else {
      return 'img/screen-light.jpg'
    }
  }

  private contentEnService = inject(ContentEnService);
  name$ = this.contentEnService.getContent('name');
  title$ = this.contentEnService.getContent('title');
  subtitle$ = this.contentEnService.getContent('subtitle');
  intro$ = this.contentEnService.getContent('intro');
  skillTitle$ = this.contentEnService.getContent('skillTitle');
  skills$ = this.contentEnService.getContent('skills');
  careerTitle$ = this.contentEnService.getContent('careerTitle');
  careerIntro$ = this.contentEnService.getContent('careerIntro');
  careerBullets$ = this.contentEnService.getContent('careerBullets');
  careerIntro2$ = this.contentEnService.getContent('careerIntro2');
  careerBullets2$ = this.contentEnService.getContent('careerBullets2');
  careerOutro$ = this.contentEnService.getContent('careerOutro');
  lbl_viewProjects$ = this.contentEnService.getContent('lbl_viewProjects');
  lbl_contact$ = this.contentEnService.getContent('lbl_contact');
  lbl_about$ = this.contentEnService.getContent('lbl_about');

  name = toSignal(this.name$, { initialValue: '' });
  title = toSignal(this.title$, { initialValue: '' });
  subtitle = toSignal(this.subtitle$, { initialValue: '' });
  intro = toSignal(this.intro$, { initialValue: [''] });
  skillTitle = toSignal(this.skillTitle$, { initialValue: '' });
  skills = toSignal(this.skills$, { initialValue: [''] });
  careerTitle = toSignal(this.careerTitle$, { initialValue: '' });
  careerIntro = toSignal(this.careerIntro$, { initialValue: [''] });
  careerBullets = toSignal(this.careerBullets$, { initialValue: ['',[]] });
  careerIntro2 = toSignal(this.careerIntro2$, { initialValue: [''] });
  careerBullets2 = toSignal(this.careerBullets2$, { initialValue: ['',[]] });
  careerOutro = toSignal(this.careerOutro$, { initialValue: [''] });
  lbl_viewProjects = toSignal(this.lbl_viewProjects$, { initialValue: '' });
  lbl_contact = toSignal(this.lbl_contact$, { initialValue: '' });
  lbl_about = toSignal(this.lbl_about$, { initialValue: '' });

  currentTechIndex = 0;
  private techInterval: any;
  
  ngOnInit() {
    this.startTechRotation();
  }
  
  ngOnDestroy() {
    window.removeEventListener('resize', this.setupTooltips.bind(this));
    if (this.resizeObserver) this.resizeObserver.disconnect();
  }
  
  startTechRotation() {
    const techItems = document.querySelectorAll('.tech-list-tech');
    if (techItems.length === 0 || window.innerWidth > 767) return;
  
    this.techInterval = setInterval(() => {
      techItems.forEach(item => item.classList.remove('active', 'exiting'));
      
      const currentItem = techItems[this.currentTechIndex];
      currentItem.classList.add('exiting');
      
      this.currentTechIndex = (this.currentTechIndex + 1) % techItems.length;
      
      setTimeout(() => {
        techItems[this.currentTechIndex].classList.add('active');
      }, 800);
    }, 4000);
    
    // Initialize first item
    techItems[0].classList.add('active');
  }    
  
}
