import { coreUserFields } from '@ocean/api/shared';
import { get, pick } from 'lodash-es';
import { UserActions } from './actions';
import { initialState } from './state';
import { createReducer, on } from '@ngrx/store';

export const userReducer = createReducer(
  initialState,
  on(UserActions.tokenLoaded, (state, action) => ({
    ...state,
    token: {
      tokenType: action.hash.tokenType,
      accessToken: action.hash.accessToken,
      expiresIn: action.hash.expiresIn * 1000 + Date.now(),
      scope: action.hash.scope
    }
  })),
  on(UserActions.loginUserSuccess, (state, action) => ({
    ...state,
    loggedIn: true,
    user: pick(action.user, coreUserFields),
    userType: get(action.user, 'userTypes.0.type', undefined)
  })),
  on(UserActions.loginUserFailure, () => ({
    ...initialState
  })),
  on(UserActions.updateUser, state => ({
    ...state,
    isUpdating: true
  })),
  on(UserActions.updateUserSuccess, (state, action) => ({
    ...state,
    isUpdating: false,
    user: {
      ...state.user,
      ...action.user
    }
  })),
  on(UserActions.updateUserFailure, state => ({
    ...state,
    isUpdating: false,
    user: JSON.parse(JSON.stringify(state.user))
  })),
  on(UserActions.switchAccount, (state, action) => ({
    ...state,
    userType: action.title
  })),
  on(UserActions.setUpIntentSuccess, (state, action) => ({
    ...state,
    paymentIntent: action.payment
  })),
  on(UserActions.getUserCards, state => ({
    ...state,
    isLoading: true
  })),
  on(UserActions.getUserCardsSuccess, (state, action) => ({
    ...state,
    savedCards: action.paymentMethods,
    isLoading: false
  })),
  on(UserActions.editPaymentMethodSuccess, state => ({
    ...state,
    paymentMethodError: false,
    paymentId: 'paymentId'
  })),
  on(UserActions.editPaymentMethodFailure, state => ({
    ...state,
    paymentMethodError: true
  })),
  on(UserActions.openEditPaymentMethodModal, state => ({
    ...state,
    paymentMethodError: false
  })),
  on(UserActions.resetPaymentId, state => ({
    ...state,
    paymentId: ''
  })),
);
