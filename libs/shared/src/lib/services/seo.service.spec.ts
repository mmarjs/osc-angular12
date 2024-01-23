import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { API_ENVIRONMENT } from '@ocean/api/shared';
import { mockEnvironment } from '@ocean/testing';
import { SEOService } from './seo.service';

describe('SEOService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [{ provide: API_ENVIRONMENT, useValue: mockEnvironment }]
    })
  );

  it('should be created', () => {
    const service: SEOService = TestBed.get(SEOService);
    expect(service).toBeTruthy();
  });
});
