import { Component, inject } from '@angular/core';
import { ContentEnService } from '../../services/content-en.service';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-portfolio',
  imports: [],
  templateUrl: './portfolio.component.html',
  styleUrl: './portfolio.component.scss'
})
export class PortfolioComponent {
  private contentEnService = inject(ContentEnService);
  portfolioTitle$ = this.contentEnService.getContent('portfolioTitle');
  portfolioIntro$ = this.contentEnService.getContent('portfolioIntro');
  github$ = this.contentEnService.getContent('github');
  portfolioSection1$ = this.contentEnService.getContent('portfolioSection1');
  portfolioBullets$ = this.contentEnService.getContent('portfolioBullets');
  portfolioSection2$ = this.contentEnService.getContent('portfolioSection2');
  portfolioBullets2$ = this.contentEnService.getContent('portfolioBullets2');
  portfolioSection3$ = this.contentEnService.getContent('portfolioSection3');
  portfolioBullets3$ = this.contentEnService.getContent('portfolioBullets3');
  portfolioFeaturesTitle$ = this.contentEnService.getContent('portfolioFeaturesTitle');
  portfolioFeatures$ = this.contentEnService.getContent('portfolioFeatures');

  portfolioTitle = toSignal(this.portfolioTitle$, { initialValue: '' });
  portfolioIntro = toSignal(this.portfolioIntro$, { initialValue: '' });  
  github = toSignal(this.github$, { initialValue: '' });
  portfolioSection1 = toSignal(this.portfolioSection1$, { initialValue: '' });
  portfolioBullets = toSignal(this.portfolioBullets$, { initialValue: [] });
  portfolioSection2 = toSignal(this.portfolioSection2$, { initialValue: '' });
  portfolioBullets2 = toSignal(this.portfolioBullets2$, { initialValue: [] });
  portfolioSection3 = toSignal(this.portfolioSection3$, { initialValue: '' });
  portfolioBullets3 = toSignal(this.portfolioBullets3$, { initialValue: [] });
  portfolioFeaturesTitle = toSignal(this.portfolioFeaturesTitle$, { initialValue: '' });
  portfolioFeatures = toSignal(this.portfolioFeatures$, { initialValue: [] });
  
}
