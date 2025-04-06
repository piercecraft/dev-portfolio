import { Component, Input } from '@angular/core';
import { SkillCategory } from '../../../models/skill.model';

@Component({
  standalone: true,
  selector: 'app-skill-item',
  templateUrl: './skill-item.component.html',
  styleUrls: ['./skill-item.component.scss']
})
export class SkillItemComponent {
  @Input({ required: true }) skillCategory!: SkillCategory;
}