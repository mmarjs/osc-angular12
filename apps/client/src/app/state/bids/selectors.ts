import {
  createFeatureSelector,
  createSelector,
  MemoizedSelector,
} from '@ngrx/store';
import { BidStatus } from '@ocean/api/shared';
import { bidsAdapter, bidsFeatureKey, State } from './state';

export const selectBidsState: MemoizedSelector<object, State> =
  createFeatureSelector<State>(bidsFeatureKey);

const {
  // selectEntities,
  selectAll,
} = bidsAdapter.getSelectors();

const selectIsLoading = createSelector(
  selectBidsState,
  (state: State) => state.isLoading
);

const pagedDataofMybids = createSelector(
  selectBidsState,
  (state: State) => state.pagedDataOfMyBids
);

const selectSelectedBid = createSelector(
  selectBidsState,
  (state: State) => state.selectedBid
);

const selectBids = createSelector(selectBidsState, selectAll);

const selectAcceptedBid = createSelector(selectBids, (bids) =>
  bids.find((bid) => bid.status === BidStatus.ACCEPTED)
);

const selectRejectBid = createSelector(
  selectBidsState,
  (state: State) => state.rejectedBid
);

const selectWinnigBid = createSelector(
  selectBidsState,
  (state: State) => state.winningBid
);

export const bidsQuery = {
  selectIsLoading,
  selectBids,
  selectSelectedBid,
  selectAcceptedBid,
  pagedDataofMybids,
  selectRejectBid,
  selectWinnigBid
};
