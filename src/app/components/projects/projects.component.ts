import { Component, inject } from '@angular/core';
import { ProjectService } from '../../services/project.service';
import { ProjectItemComponent } from './project-item/project-item.component';
import { AsyncPipe } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
  imports: [ProjectItemComponent, AsyncPipe]
})
export class ProjectsComponent {
  private projectService = inject(ProjectService);
  projects$ = this.projectService.getProjects();
}