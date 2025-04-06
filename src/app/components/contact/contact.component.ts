import { Component, inject } from '@angular/core';
import { ContentEnService } from '../../services/content-en.service';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-contact',
  imports: [],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {
  private contentEnService = inject(ContentEnService);

  contactTitle$ = this.contentEnService.getContent('contactTitle');
  contactIntro$ = this.contentEnService.getContent('contactIntro');
  contactAvail$ = this.contentEnService.getContent('contactAvail');
  contactResponse$ = this.contentEnService.getContent('contactResponse');
  email$ = this.contentEnService.getContent('email');
  linkedIn$ = this.contentEnService.getContent('linkedIn');
  contactResponse2$ = this.contentEnService.getContent('contactResponse2');

  contactTitle = toSignal(this.contactTitle$, { initialValue: '' });
  contactIntro = toSignal(this.contactIntro$, { initialValue: [''] });
  contactAvail = toSignal(this.contactAvail$, { initialValue: '' });
  contactResponse = toSignal(this.contactResponse$, { initialValue: '' });
  email = toSignal(this.email$, { initialValue: '' });
  linkedIn = toSignal(this.linkedIn$, { initialValue: '' });
  contactResponse2 = toSignal(this.contactResponse2$, { initialValue: '' });

}
