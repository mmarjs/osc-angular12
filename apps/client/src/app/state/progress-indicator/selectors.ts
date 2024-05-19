import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PROGRESS_INDICATOR_KEY, State } from './state';

export const getProgressIndicatorState = createFeatureSelector<State>(PROGRESS_INDICATOR_KEY);

export const getProgressIndicatorStatus = createSelector(
  getProgressIndicatorState,
  (state: State) => state.status
);
