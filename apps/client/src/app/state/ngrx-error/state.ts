export const KEY = 'ngrxError';

/**
 * State
 */

export interface ErrorState {
  code: number;
  message?: string;
}

export const ngrxErrorInitialState: ErrorState = {
  code: -1,
};
