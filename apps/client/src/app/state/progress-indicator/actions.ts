import { createAction, props } from '@ngrx/store';

export const setProgressIndicatorLoadingStatus = createAction(`[Progress Indicator] Set Loading Status`, props<{ status: boolean }>());
