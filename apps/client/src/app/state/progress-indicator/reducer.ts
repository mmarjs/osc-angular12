import { createReducer, on } from '@ngrx/store';
import { initialState } from './state';
import { setProgressIndicatorLoadingStatus } from './actions';

export const progressIndicatorReducer = createReducer(
  initialState,
  on(setProgressIndicatorLoadingStatus, (state, { status }) => ({
    ...state,
    status: status,
  })),
);
