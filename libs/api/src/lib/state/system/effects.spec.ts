import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Subject } from 'rxjs';

import { SystemEffects } from './effects';

describe('SystemEffects', () => {
  const actions$ = new Subject();
  let effects: SystemEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SystemEffects, provideMockActions(() => actions$)]
    });

    effects = TestBed.get(SystemEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
