import { createAction, props } from '@ngrx/store';
import { Boat, BoatInputDTO, BoatOutputDTO } from '@ocean/api/shared';

export const BoatActions = {
  setSelectedBoat: createAction('[Boats] Set Selected Boat', props<{ boat?: Boat }>()),

  createBoat: createAction('[Boats] Create Boat', props<{ boat: BoatInputDTO }>()),
  createBoatSuccess: createAction('[Boats] Create Boat Success', props<{ boat: BoatOutputDTO }>()),
  createBoatFailure: createAction('[Boats] Create Boat Success', props<{ error?: Error }>()),

  updateBoat: createAction('[Boats] Update Boat', props<{ boat: BoatInputDTO }>()),
  updateBoatSuccess: createAction('[Boats] Update Boat Success', props<{ boat: BoatOutputDTO }>()),
  updateBoatFailure: createAction('[Boats] Update Boat Success', props<{ error?: Error }>()),
};
