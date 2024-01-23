import { async, TestBed } from '@angular/core/testing';
import { LayoutComponentsModule } from './components.module';

describe('LayoutComponentsModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [LayoutComponentsModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(LayoutComponentsModule).toBeDefined();
  });
});
