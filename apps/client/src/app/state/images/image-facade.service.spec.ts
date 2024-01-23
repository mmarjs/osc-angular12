import { TestBed } from '@angular/core/testing';

import { ImageFacadeService } from './image-facade.service';

describe('ImageFacadeService', () => {
  let service: ImageFacadeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImageFacadeService);
  });

  xit('should be created', () => {
    expect(service).toBeTruthy();
  });
});
