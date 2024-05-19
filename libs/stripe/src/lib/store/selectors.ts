import { createFeatureSelector, createSelector } from '@ngrx/store';
import { STRIPE_FEATURE_KEY, State } from './state';

export const selectStripeState =
  createFeatureSelector<State>(STRIPE_FEATURE_KEY);

export const selectAccount = createSelector(
  selectStripeState,
  (state: State) => state.account
);

export const selectValidationErrors = createSelector(
  selectStripeState,
  (state: State) => state.validation
);

export const selectCards = createSelector(
  selectStripeState,
  (state: State) => state.cards
);

export const selectBanks = createSelector(
  selectStripeState,
  (state: State) => state.banks
);

export const selectLoading = createSelector(
  selectStripeState,
  (state: State) => state.loading
);
