import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Bid, PagedResponse } from '@ocean/api/shared';

export const bidsFeatureKey = 'bids';

export const bidsAdapter: EntityAdapter<Bid> = createEntityAdapter<Bid>({
  selectId: (model) => model.id,
});

export interface State extends EntityState<Bid> {
  isLoading: boolean;
  selectedBid: Bid;
  pagedDataOfMyBids: PagedResponse<Bid>;
  rejectedBid: Bid;
  winningBid: boolean;
}

export const initialState: State = bidsAdapter.getInitialState({
  isLoading: false,
  selectedBid: undefined,
  pagedDataOfMyBids: null,
  rejectedBid: null,
  winningBid: false,
});
