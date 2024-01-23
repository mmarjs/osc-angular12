import { Injectable } from '@angular/core';
import { Params } from '@angular/router';

import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { NgrxRoute } from '.';
import { Go } from './actions';

import { routerQuery } from './selectors';
import { PartialState } from './state.partial';

@Injectable({ providedIn: 'root' })
export class RouterFacade {
  state$ = this.store.pipe(select(routerQuery.getState));
  route$ = this.store.pipe(select(routerQuery.getRoute));
  url$ = this.store.pipe(select(routerQuery.getUrl));
  queryParams$ = this.store.pipe(select(routerQuery.getQueryParams));
  params$: Observable<string | Params> = this.store.pipe(
    select(routerQuery.getParams)
  );

  constructor(private store: Store<PartialState>) {}

  go(route: NgrxRoute) {
    this.store.dispatch(new Go({ to: route }));
  }
}
