import { Injectable } from '@angular/core';
import { BiddingTableFormModel } from '@ocean/api/shared';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AddBidItem, DeleteBidItem, UpdateOne } from './actions';
import { State } from './state';
import { bidItemsQuery } from './selectors';
import { AddBidItems } from '.';

@Injectable({
  providedIn: 'root'
})
export class BidItemsFacade {
  biddingTableFormModel$: Observable<BiddingTableFormModel[]> = this.store.pipe(select(bidItemsQuery.selectBidItems));

  constructor(private store: Store<State>) { }

  initBidItems(biddingTableFormModels: BiddingTableFormModel[]) {
    this.store.dispatch(new AddBidItems(biddingTableFormModels));
  }

  addBidItem(biddingTableFormModel: BiddingTableFormModel) {
    this.store.dispatch(new AddBidItem(biddingTableFormModel));
  }

  updateOne(biddingTableFormModel: BiddingTableFormModel) {
    this.store.dispatch(new UpdateOne(biddingTableFormModel));
  }

  deleteBidItem(id: number) {
    this.store.dispatch(new DeleteBidItem(id));
  }
}
