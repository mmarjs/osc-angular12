import { async, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponentsModule } from './components.module';

describe('AppComponentsModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, AppComponentsModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(AppComponentsModule).toBeDefined();
  });
});
