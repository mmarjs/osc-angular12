import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { UserActions } from '../user/actions';

@Injectable()
export class SystemEffects {
  logout$ = createEffect(() =>
      this.actions$.pipe(
        ofType(UserActions.logoutUser),
        switchMap(() => of(null))
      ),
    {
      dispatch: false
    }
  );

  constructor(private readonly actions$: Actions) {
  }
}
