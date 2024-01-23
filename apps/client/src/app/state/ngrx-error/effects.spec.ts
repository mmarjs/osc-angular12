import { TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { provideMockActions } from '@ngrx/effects/testing';
import { StoreModule } from '@ngrx/store';
import { DataPersistence } from '@nrwl/angular';
import { hot } from '@nrwl/angular/testing';
import { NotifierService } from '@ocean/shared/services';
import { MockProvider } from 'ng-mocks';

import { ErrorEffects } from './effects';

describe('ErrorEffects', () => {
  let actions;
  let effects: ErrorEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot({}), MatDialogModule],
      providers: [
        ErrorEffects,
        DataPersistence,
        provideMockActions(() => actions),

        MockProvider(NotifierService),
      ],
    });

    effects = TestBed.inject(ErrorEffects);
  });

  describe('someEffect', () => {
    it('should work', async () => {
      actions = hot('-a-|', { a: { type: 'LOAD_DATA' } });
      expect(true).toBeTruthy();
    });
  });
});
