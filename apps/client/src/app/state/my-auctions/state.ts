import { Job } from '@ocean/api/shared';

export const KEY = 'myAuctions';

/**
 * State
 */
export interface State {
  auctions: Job[];
}

export const initialState: State = {
  auctions: null
};
