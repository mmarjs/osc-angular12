import { async, TestBed } from '@angular/core/testing';
import { SharedDirectivesModule } from './directives.module';

describe('SharedModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedDirectivesModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(SharedDirectivesModule).toBeDefined();
  });
});
