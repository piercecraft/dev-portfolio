import { Component, inject } from '@angular/core';
import { SkillService } from '../../services/skill.service';
import { SkillItemComponent } from './skill-item/skill-item.component';
import { AsyncPipe } from '@angular/common';
import { ContentEnService } from '../../services/content-en.service';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  standalone: true,
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss'],
  imports: [SkillItemComponent, AsyncPipe]
})
export class SkillsComponent {
  private skillService = inject(SkillService);
  skills$ = this.skillService.getSkills();
  

  private contentEnService = inject(ContentEnService);
  skillsTitle$ = this.contentEnService.getContent('skillsTitle');
  skillsIntro$ = this.contentEnService.getContent('skillsIntro');

  skillsTitle = toSignal(this.skillsTitle$, { initialValue: '' });
  skillsIntro = toSignal(this.skillsIntro$, { initialValue: '' });
  

}