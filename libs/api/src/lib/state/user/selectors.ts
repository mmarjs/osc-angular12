import { createSelector } from '@ngrx/store';
import { getApi } from '../selectors';
import { State as ParentState } from '../state';
import { KEY, State } from './state';

// Main selector
const getUserState = createSelector(
  getApi,
  (state: ParentState) => (state ? state[KEY] : {})
);

// Field selectors
const getLoggedIn = createSelector(
  getUserState,
  (state: State) => state.loggedIn
);

const getToken = createSelector(
  getUserState,
  (state: State) => state.token
);

const getUserType = createSelector(
  getUserState,
  (state: State) => state.userType
);

const getUser = createSelector(
  getUserState,
  (state: State) => state.user || {}
);

const getId = createSelector(
  getUserState,
  (state: State) => state.user && state.user.authId
);

const getName = createSelector(
  getUserState,
  (state: State) => state.user && state.user.firstName
);

const getIsUpdating = createSelector(
  getUserState,
  (state: State) => state.isUpdating
);

const getPaymentIntent = createSelector(
  getUserState,
  (state: State) => state.paymentIntent
);

const getSavedCards = createSelector(
  getUserState,
  (state: State) => state.savedCards
);

const getPaymentId = createSelector(
  getUserState,
  (state: State) => state.paymentId
);

const getIsLoading = createSelector(
  getUserState,
  (state: State) => state.isLoading
);
const getIsPaymentLoading = createSelector(
  getUserState,
  (state: State) => state.paymentMethodError
);

export const userQuery = {
  getLoggedIn,
  getToken,
  getUserType,
  getUser,
  getId,
  getName,
  getIsUpdating,
  getPaymentIntent,
  getSavedCards,
  getPaymentId,
  getIsLoading,
  getIsPaymentLoading
};
