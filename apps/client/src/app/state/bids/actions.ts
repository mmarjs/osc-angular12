import { createAction, props } from '@ngrx/store';
import { BidPayRequest, GetMyBids } from '@ocean/api/services';
import { Bid, BidDTO, PagedResponse } from '@ocean/api/shared';

export const loadBids = createAction('[Bids] Load Bids');

export const loadBidsSuccess = createAction(
  '[Bids] Load Bids Success',
  props<{ data: Bid[] }>()
);

export const loadBidsFailure = createAction(
  '[Bids] Load Bids Failure',
  props<{ payload: Error }>()
);

export const setAcceptedBid = createAction(
  '[Bids] Set Accepted Bid',
  props<{ bid: Bid }>()
);

export const loadBid = createAction('[Bids] Load Bid');

export const loadBidSuccess = createAction(
  '[Bids] Load Bid Success',
  props<{ data: Bid }>()
);

export const loadBidFailure = createAction(
  '[Bids] Load Bid Failure',
  props<{ payload: Error }>()
);

export const acceptBid = createAction(
  '[Bids] Accept Bid',
  props<{ id: number }>()
);

export const acceptBidSuccess = createAction(
  '[Bids] Accept Bid Success',
  props<{ data: Bid }>()
);

export const acceptBidFailure = createAction(
  '[Bids] Accept Bid Failure',
  props<{ payload: Error }>()
);

export const rejectBid = createAction(
  '[Bids] Reject Bid',
  props<{ id: number }>()
);

export const rejectBidSuccess = createAction(
  '[Bids] Reject Bid Success',
  props<{ data: Bid }>()
);

export const rejectBidFailure = createAction(
  '[Bids] Reject Bid Failure',
  props<{ payload: Error }>()
);


export const editBid = createAction(
  '[Bids] Edit Bid',
  props<{ data: BidDTO }>()
);

export const editBidSuccess = createAction(
  '[Bids] Edit Bid Success',
  props<{ data: Bid }>()
);

export const editBidFailure = createAction(
  '[Bids] Edit Bid Failure',
  props<{ payload: Error }>()
);


export const loadMyBids = createAction('[Bids] Load My Bids',
props<{ payload: GetMyBids }>());

export const loadMyBidsSuccess = createAction(
  '[Bids] Load My Bids Success',
  props< PagedResponse<Bid>>()
);

export const loadMyBidsFailure = createAction(
  '[Bids] Load My Bids Failure',
  props<{ payload: Error }>()
);

export const payBid = createAction(
  '[Bids] Pay Bid',
  props<{ data: BidPayRequest }>()
);

export const payBidSuccess = createAction(
  '[Bids] Pay Bid Success',
  props<{ data: boolean }>()
);

export const payBidFailure = createAction(
  '[Bids] Pay Bid Success Failure',
  props<{ payload: Error }>()
);