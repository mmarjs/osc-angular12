import { createAction } from '@ngrx/store';

export const SystemActions = {
  loadSystem: createAction('[System] Load System'),
  loadSystemSuccess: createAction('[System] System Loaded')
};
