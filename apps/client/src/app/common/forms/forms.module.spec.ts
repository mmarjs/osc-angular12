import { async, TestBed } from '@angular/core/testing';
import { AppFormsModule } from './forms.module';

describe('AppFormsModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [AppFormsModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(AppFormsModule).toBeDefined();
  });
});
