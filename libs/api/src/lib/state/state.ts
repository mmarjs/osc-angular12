import * as SystemState from './system/state';
import * as UserState from './user/state';

export const KEY = 'api';

/**
 * State
 */
export interface State {
  system: SystemState.State;
  user: UserState.State;
}

export const initialState: State = {
  system: SystemState.initialState,
  user: UserState.initialState
};

export interface ApiPartialState {
  readonly [KEY]: State;
}
