import { createFeatureSelector, createSelector } from '@ngrx/store';
import { KEY, State } from './state';

const getAuctionsState = createFeatureSelector<State>(KEY);

const getIsCreating = createSelector(
  getAuctionsState,
  (state: State) => state.isCreating
);

const getIsCreateSuccess = createSelector(
  getAuctionsState,
  (state: State) => state.isCreateSuccess
);

const getIsBidCreating = createSelector(
  getAuctionsState,
  (state: State) => state.isBidCreating
);

const getIsBidCreated = createSelector(
  getAuctionsState,
  (state: State) => state.isBidCreated
);

const getSelectedAuction = createSelector(
  getAuctionsState,
  (state: State) => state.selectedAuction
);

const getSelectedBid = createSelector(
  getAuctionsState,
  (state: State) => state.selectedBid
);

const getSelectedDocument = createSelector(
  getAuctionsState,
  (state: State) => state.selectedDocument
);

const getRefreshStatus = createSelector(
  getAuctionsState,
  (state: State) => state.refresh
);

export const auctionsQuery = {
  getIsCreating,
  getIsCreateSuccess,
  getIsBidCreating,
  getIsBidCreated,
  getSelectedAuction,
  getSelectedBid,
  getSelectedDocument,
  getRefreshStatus,
};
