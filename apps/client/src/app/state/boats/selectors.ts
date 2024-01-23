import { createFeatureSelector, createSelector } from '@ngrx/store';
import { KEY, State } from './state';

const getBoatsState = createFeatureSelector<State>(KEY);

const getTotal = createSelector(getBoatsState, (state: State) => state.total);

const getUpdatedItem = createSelector(
  getBoatsState,
  (state: State) => state.updatedItem
);

const getSelectedBoat = createSelector(
  getBoatsState,
  (state: State) => state.selectedBoat
);

const getCreatedBoat = createSelector(
  getBoatsState,
  (state: State) => state.createdBoat
);

export const boatsQuery = {
  getTotal,
  getUpdatedItem,
  getSelectedBoat,
  getCreatedBoat,
};
