import { ActionReducerMap } from '@ngrx/store';
import { State } from './state';
import { systemReducer } from './system/reducer';
import { userReducer } from './user/reducer';

export const reducers: ActionReducerMap<State> = {
  system: systemReducer,
  user: userReducer
};
