import { Component, Input } from '@angular/core';
import { Project } from '../../../models/project.model';

@Component({
  standalone: true,
  selector: 'app-project-item',
  templateUrl: './project-item.component.html',
  styleUrls: ['./project-item.component.scss'] // This must be present
})

export class ProjectItemComponent {
  @Input({ required: true }) project!: Project;
}