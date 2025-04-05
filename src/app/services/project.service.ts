import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, shareReplay } from 'rxjs';
import { Project } from '../models/project.model';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private http = inject(HttpClient);
  private projectsUrl = '/data/projects.json';
  private projects$ = this.http.get<Project[]>(this.projectsUrl).pipe(
    shareReplay(1)
  );

  getProjects(): Observable<Project[]> {
    return this.projects$;
  }
}