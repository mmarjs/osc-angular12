import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';
import { KEY, State, bidItemsAdapter } from './state';

const selectBidItemsState: MemoizedSelector<object, State> = createFeatureSelector<State>(KEY);

const {
  selectAll
} = bidItemsAdapter.getSelectors();

const selectBidItems = createSelector(
  selectBidItemsState,
  selectAll
);

export const bidItemsQuery = {
  selectBidItems
};
