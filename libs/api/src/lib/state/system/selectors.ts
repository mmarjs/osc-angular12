import { createSelector } from '@ngrx/store';
import { getApi } from '../selectors';
import { State as ParentState } from '../state';
import { KEY, State } from './state';

// Main selector
const getSystemState = createSelector(
  getApi,
  (state: ParentState) => state[KEY]
);

// Field selectors
const getLoaded = createSelector(
  getSystemState,
  (state: State) => state.loaded
);

export const systemQuery = {
  getLoaded
};
