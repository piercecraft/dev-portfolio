import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, shareReplay } from 'rxjs';
import { SkillCategory } from '../models/skill.model';

@Injectable({
  providedIn: 'root'
})
export class SkillService {
  private http = inject(HttpClient);
  private skillsUrl = './data/skills.json';
  private skills$ = this.http.get<SkillCategory[]>(this.skillsUrl).pipe(
    shareReplay(1)
  );

  getSkills(): Observable<SkillCategory[]> {
    return this.skills$;
  }
}