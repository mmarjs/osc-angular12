import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { map, tap } from 'rxjs/operators';
import { PATHS } from '@ocean/shared';
import { Go } from '../router/actions';
import { ErrorActionTypes, Throw401Error, Throw404Error } from './actions';
import { Observable } from 'rxjs';
import { DraftsActionTypes, SaveDraftFailure } from '../drafts/actions';
import { NotifierService } from '@ocean/shared/services';
import * as BidsActions from '../bids/actions';

@Injectable()
export class ErrorEffects {
  error401$ = createEffect(() =>
    this.actions$.pipe(
      ofType<Throw401Error>(ErrorActionTypes.Throw401Error),
      map(_ => new Go({ to: { path: [PATHS.HOME] } })),
    ),
  );

  error404$ = createEffect(() =>
    this.actions$.pipe(
      ofType<Throw404Error>(ErrorActionTypes.Throw404Error),
      map(_ => new Go({ to: { path: ['/'] } })),
    ),
  );

  handleFetchError$: Observable<unknown> = createEffect(() => this.actions$.pipe(
    ofType<SaveDraftFailure>(
      ...[
        DraftsActionTypes.SaveDraftFailure,
        DraftsActionTypes.UpdateDraftFailure,
        DraftsActionTypes.DeleteDraftFailure,
        BidsActions.loadBidsFailure,
        BidsActions.acceptBidFailure,
        BidsActions.loadBidFailure
      ]
    ),
    tap((action) => this.notifier.error(action.payload)
    )),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private notifier: NotifierService
  ) { }
}
