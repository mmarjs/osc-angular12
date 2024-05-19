import { Injectable, OnDestroy } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { initialState, State } from '@ocean/client/state/progress-indicator/state';
import { BehaviorSubject, distinctUntilChanged, Observable } from 'rxjs';
import { setProgressIndicatorLoadingStatus } from './actions';
import { getProgressIndicatorStatus } from './selectors';

@Injectable({
  providedIn: 'root',
})
export class ProgressIndicatorFacade implements OnDestroy {
  private readonly statusChanged$ = new BehaviorSubject<boolean>(initialState.status);

  readonly getStatus$: Observable<boolean> = this.store.pipe(
    distinctUntilChanged(),
    select(getProgressIndicatorStatus),
  );

  constructor(private readonly store: Store<State>) {
    this.statusChanged$
      .pipe(distinctUntilChanged())
      .subscribe(status => this.store.dispatch(setProgressIndicatorLoadingStatus({
        status
      })));
  }

  ngOnDestroy() {
    this.statusChanged$.complete();
  }

  setLoadingStatus(status: boolean) {
    this.statusChanged$.next(status);
  }
}
