import { ErrorState, ngrxErrorInitialState } from './state';
import { ErrorAction, ErrorActionTypes } from './actions';

export function errorReducer(
  state = ngrxErrorInitialState,
  action: ErrorAction
): ErrorState {
  switch (action.type) {

    case ErrorActionTypes.Throw401Error:
      return {
        code: action.payload.error.status,
        message: action.payload.error.message
      };

    case ErrorActionTypes.Throw404Error:
      return {
        code: action.payload.error.status,
        message: action.payload.error.message
      };

    default:
      return state;
  }
}
