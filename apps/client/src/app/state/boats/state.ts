import { Boat } from '@ocean/api/shared';

export const KEY = 'boats';

/**
 * State
 */
export interface State {
  total: number;
  updatedItem?: Object;
  selectedBoat?: Boat;
  createdBoat?: Boat;
}

export const initialState: State = {
  total: 0,
  selectedBoat: null,
};
