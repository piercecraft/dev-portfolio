import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VersionService {
  private versionSubject = new BehaviorSubject<string>('1.0.0');
  public version$ = this.versionSubject.asObservable();

  constructor(private http: HttpClient) { }

  loadVersion(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.http.get<any>('./data/version.json').subscribe({
        next: (data) => {
          this.versionSubject.next(data.version);
          resolve();
        },
        error: (err) => {
          console.warn('Failed to load version.json, using default', err);
          resolve();
        }
      });
    });
  }

  getCurrentVersion(): string {
    return this.versionSubject.value;
  }
}