import { TestBed } from '@angular/core/testing';

import { ContentEnService } from './content-en.service';

describe('ContentEnService', () => {
  let service: ContentEnService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContentEnService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
