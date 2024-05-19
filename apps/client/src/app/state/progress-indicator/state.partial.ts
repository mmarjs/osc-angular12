import { PROGRESS_INDICATOR_KEY, State } from './state';

export interface PartialState {
  [PROGRESS_INDICATOR_KEY]: State;
}
