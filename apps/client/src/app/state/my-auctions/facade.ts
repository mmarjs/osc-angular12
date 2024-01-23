import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { addMyAuction, loadMyAuctions } from '.';
import { myAuctionsQuery } from './selectors';
import { State } from './state';
import { Job } from '@ocean/api/shared';

@Injectable({
  providedIn: 'root'
})
export class MyAuctionsFacade {
  auctions$: Observable<Job[]> = this.store.pipe(select(myAuctionsQuery.getMyAuctions));

  constructor(private store: Store<State>) { }

  loadAuctions(auctions: Job[]) {
    this.store.dispatch(loadMyAuctions({ auctions }));
  }

  addAuction(auction: Job) {
    this.store.dispatch(addMyAuction({ auction }));
  }
}
