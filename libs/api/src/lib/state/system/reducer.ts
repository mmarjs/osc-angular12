import { SystemActions } from './actions';
import { initialState } from './state';
import { createReducer, on } from '@ngrx/store';

export const systemReducer = createReducer(
  initialState,
  on(SystemActions.loadSystemSuccess, state => ({
    ...state,
    loaded: true
  }))
);
