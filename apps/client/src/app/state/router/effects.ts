import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { map, tap } from 'rxjs/operators';
import { RouterActionTypes } from './actions';
import { Back, Forward, Go } from './actions';

@Injectable()
export class RouterEffects {
  navigate$ = createEffect(
    () =>
      this.action$.pipe(
        ofType<Go>(RouterActionTypes.Go),
        map(action => action.payload.to),
        tap(({ path, query: queryParams, extras }) => this.router.navigate(path, { queryParams, ...extras })),
      ),
    { dispatch: false },
  );

  navigateBack$ = createEffect(
    () =>
      this.action$.pipe(
        ofType<Back>(RouterActionTypes.Back),
        tap(() => this.location.back()),
      ),
    { dispatch: false },
  );

  navigateForward$ = createEffect(
    () =>
      this.action$.pipe(
        ofType<Forward>(RouterActionTypes.Forward),
        tap(() => this.location.forward()),
      ),
    { dispatch: false },
  );

  constructor(private action$: Actions, private router: Router, private location: Location) { }
}
