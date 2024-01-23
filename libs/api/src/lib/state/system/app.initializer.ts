import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { SystemActions } from './actions';
import { systemQuery } from './selectors';
import { PartialState } from './state.partial';

export function initApplication(store: Store<PartialState>) {
  return () =>
    new Promise<void>(resolve => {
      const loaded$ = new Subject();
      store.dispatch(SystemActions.loadSystem());
      store
        .select(systemQuery.getLoaded)
        .pipe(takeUntil(loaded$))
        .subscribe(loaded => {
          if (loaded) {
            loaded$.next(loaded);
            resolve();
          }
        });
    });
}
