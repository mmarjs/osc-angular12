import { createAction, props } from '@ngrx/store';
import { Job } from '@ocean/api/shared';

export const loadMyAuctions = createAction(
  '[MyAuctions] Load My Auctions',
  props<{ auctions: Job[] }>()
);

export const addMyAuction = createAction(
  '[MyAuctions] Add My Auction',
  props<{ auction: Job }>()
);
