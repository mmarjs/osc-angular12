import { TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NotifierService } from './notifier.service';

describe('NotifierService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [MatDialogModule, MatSnackBarModule]
    })
  );

  it('should be created', () => {
    const service: NotifierService = TestBed.get(NotifierService);
    expect(service).toBeTruthy();
  });
});
