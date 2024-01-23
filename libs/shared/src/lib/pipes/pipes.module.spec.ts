import { async, TestBed } from '@angular/core/testing';
import { SharedPipesModule } from './pipes.module';

describe('SharedModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedPipesModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(SharedPipesModule).toBeDefined();
  });
});
