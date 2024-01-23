import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { systemQuery } from './selectors';
import { PartialState } from './state.partial';

@Injectable({
  providedIn: 'root'
})
export class SystemFacade {
  loaded$ = this.store.pipe(select(systemQuery.getLoaded));

  constructor(private readonly store: Store<PartialState>) {
  }
}
