import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { combineLatestWith, distinctUntilChanged, forkJoin, merge, of } from 'rxjs';
import { catchError, map, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { BoatProvider } from '@ocean/api/services';
import { NotifierService } from '@ocean/shared/services';
import { BoatActions } from './actions';
import { TranslateService } from '@ngx-translate/core';
import { BoatsFacade } from '@ocean/client/state';
import { MediaService } from '@ocean/api/client';
import { Store } from '@ngrx/store';
import { PartialState } from '@ocean/client/state/boats/state.partial';

@Injectable()
export class BoatsEffects {

  constructor(
    private readonly actions$: Actions,
    private readonly notifier: NotifierService,
    private readonly translate: TranslateService,
    private readonly boat: BoatProvider,
    private readonly boatFacade: BoatsFacade,
    private readonly mediaService: MediaService,
    private readonly store: Store<PartialState>
  ) {
  }

  boatCreate$ = createEffect(() =>
  this.actions$.pipe(
    ofType(BoatActions.createBoat),
    switchMap(({boat}) =>
      this.boat.addBoat({boatDTO: boat}).pipe(
        map(boat => BoatActions.createBoatSuccess({boat})),
        tap(() => {
          const translateValue = this.translate.instant('BOATS.BOAT_CREATED_NOTIFICATION');
          this.notifier.success(translateValue);
        }),
        catchError(err =>
          of(BoatActions.createBoatFailure({error: err}))
        )
      )
    ),
  )
);

  boatUpdate$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BoatActions.updateBoat),
      switchMap(({boat}) => this.boat.updateBoatInfo({boatDTO: boat})),
      map(boat => {
        const translateValue = this.translate.instant('BOATS.BOAT_UPDATED_NOTIFICATION');
        this.notifier.info(translateValue);
        return BoatActions.updateBoatSuccess({boat});
      }),
      catchError(err => of(BoatActions.updateBoatFailure({error: err}))),
    )
  );
}
