import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromMyAuctions from './state';

export const selectMyAuctionsState = createFeatureSelector<fromMyAuctions.State>(
  fromMyAuctions.KEY
);

const getMyAuctions = createSelector(
  selectMyAuctionsState,
  (state: fromMyAuctions.State) => state.auctions
);

export const myAuctionsQuery = {
  getMyAuctions
};
