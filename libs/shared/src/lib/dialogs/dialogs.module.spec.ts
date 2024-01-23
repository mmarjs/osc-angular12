import { async, TestBed } from '@angular/core/testing';
import { SharedDialogsModule } from './dialogs.module';

describe('SharedDialogsModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedDialogsModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(SharedDialogsModule).toBeDefined();
  });
});
