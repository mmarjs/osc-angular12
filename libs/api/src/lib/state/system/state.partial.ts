import { KEY as ROOT_KEY } from '../state';
import { KEY, State } from './state';

export interface PartialState {
  [ROOT_KEY]: {
    [KEY]: State;
  };
}
