import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { State } from './state';
import { bidsQuery } from './selectors';
import { Bid, BidDTO, BidStatus, DurationUnit, PagedResponse } from '@ocean/api/shared';
import { acceptBid, editBid, loadBid, loadBids, setAcceptedBid } from '.';
import { loadMyBids, payBid, rejectBid } from './actions';
import { BidPayRequest, GetMyBids } from '@ocean/api/services';

@Injectable({
  providedIn: 'root',
})
export class BidsFacade {
  isLoading$: Observable<boolean> = this.store.pipe(
    select(bidsQuery.selectIsLoading)
  );
  bids$: Observable<Bid[]> = this.store.pipe(select(bidsQuery.selectBids));
  bid$: Observable<Bid> = this.store.pipe(select(bidsQuery.selectSelectedBid));
  myBids$:Observable<any>=of([
    {
      bidAmount: 5000,
      bidItems: [{
        amount: 2000,
        description: 'test',
        id: 100,
        quantity: 100
      }],
      description: 'Test',
      id: 3,
      minBid: 500,
      status: BidStatus.IN_REVIEW,
      approximateDuration: 50,
      autoBid: false,
      bidderLocation: 'Test',
      bidderName: 'Test',
      durationUnit: DurationUnit.HOURS,
      jobId: 55,
      startDeposit: 1000,
      workStartDate: '10/09/22'
    },
    {
      bidAmount: 5000,
      bidItems: [{
        amount: 2000,
        description: 'AAA',
        id: 100,
        quantity: 100
      }],
      description: 'DDD',
      id: 2,
      minBid: 500,
      status: BidStatus.IN_REVIEW,
      approximateDuration: 50,
      autoBid: false,
      bidderLocation: 'Loc',
      bidderName: 'Name',
      durationUnit: DurationUnit.HOURS,
      jobId: 55,
      startDeposit: 1000,
      workStartDate: '10/09/22'
    }
  ])
  selectAcceptedBid$: Observable<Bid> = this.store.pipe(
    select(bidsQuery.selectAcceptedBid)
  );

  selectRejectedBid$: Observable<Bid> = this.store.pipe(
    select(bidsQuery.selectRejectBid)
  );

  pagedDataOfMyBids$: Observable<PagedResponse<Bid>> = this.store.pipe(
    select(bidsQuery.pagedDataofMybids)
  )

  selectWinningBid$: Observable<boolean> = this.store.pipe(
    select(bidsQuery.selectWinnigBid)
  );

  constructor(private store: Store<State>) {}

  loadBids() {
    this.store.dispatch(loadBids());
  }

  loadMyBids(pageable:GetMyBids) {
    this.store.dispatch(loadMyBids({payload:pageable}));
  }

  loadBid() {
    this.store.dispatch(loadBid());
  }

  setAcceptedBid(bid: Bid) {
    this.store.dispatch(setAcceptedBid({ bid }));
  }

  rejectBid(id: number) {
    this.store.dispatch(rejectBid({ id }));
  }

  acceptBid(id: number) {
    this.store.dispatch(acceptBid({ id }));
  }

  editBid(bid: BidDTO) {
    this.store.dispatch(editBid({ data: bid }));
  }

  payBid(request : BidPayRequest){
    this.store.dispatch(payBid({ data : request }));
  }
}
