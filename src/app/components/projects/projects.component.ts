import { Component, inject } from '@angular/core';
import { ProjectService } from '../../services/project.service';
import { ProjectItemComponent } from './project-item/project-item.component';
import { AsyncPipe } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { ContentEnService } from '../../services/content-en.service';

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

  private contentEnService = inject(ContentEnService);
  projectsTitle$ = this.contentEnService.getContent('projectsTitle');
  projectsTitle = toSignal(this.projectsTitle$, { initialValue: '' });
}