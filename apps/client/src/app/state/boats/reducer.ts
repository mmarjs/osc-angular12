import { UserActions } from '@ocean/api/state';
import { BoatActions } from './actions';
import { initialState } from './state';
import { createReducer, on } from '@ngrx/store';

export const boatsReducer = createReducer(
  initialState,
  on(UserActions.loginUserSuccess, (state, data) => ({
    ...state,
    total: data?.user?.boats?.length ?? 0,
  })),
  on(BoatActions.setSelectedBoat, (state, data) => ({
    ...state,
    selectedBoat: data.boat
  })),
  on(BoatActions.createBoatSuccess, (state, data) => ({
    ...state,
    createdBoat: data.boat,
    total: state.total + 1
  })),
  on(BoatActions.updateBoatSuccess, (state, data) => ({
    ...state,
    updatedItem: data.boat,
    selectedBoat: state.selectedBoat && data.boat
  })),
  on(BoatActions.updateBoatFailure, state => ({
    ...state,
    selectedBoat: state?.selectedBoat,
  }))
);
