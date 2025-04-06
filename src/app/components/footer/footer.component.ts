import { Component, inject, signal } from '@angular/core';
import { ContentEnService } from '../../services/content-en.service';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  

  private contentEnService = inject(ContentEnService);

  builtWith$ = this.contentEnService.getContent('builtWith');
  rights$ = this.contentEnService.getContent('rights');
  name$ = this.contentEnService.getContent('name');


  currentYear = signal(new Date().getFullYear());
  builtWith = toSignal(this.builtWith$, { initialValue: '' });
  rights = toSignal(this.rights$, { initialValue: '' });
  name = toSignal(this.name$, { initialValue: '' });
}