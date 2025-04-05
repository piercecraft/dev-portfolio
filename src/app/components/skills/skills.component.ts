import { Component, inject } from '@angular/core';
import { SkillService } from '../../services/skill.service';
import { SkillItemComponent } from './skill-item/skill-item.component';
import { AsyncPipe } from '@angular/common';

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
}