import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, shareReplay } from 'rxjs';
import { Content } from '../models/content.model';

@Injectable({
  providedIn: 'root'
})
export class ContentEnService {
  private http = inject(HttpClient);
  private contentEnUrl = '/data/content_en.json';
  private contentEn$ = this.http.get<Content[]>(this.contentEnUrl).pipe(
    shareReplay(1)
  );

  getContent(prop: string): Observable<string | (string | string[])[]> {
    return this.contentEn$.pipe(
      map(content => {
        const foundContent = content.find(item => item.prop === prop);
        if (foundContent) {
            return foundContent.text; // string or string[]
        } else {
          return ''; // Return an empty string if no matching content is found
        }
      })
    );
  }
}