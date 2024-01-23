import { createFeatureSelector } from '@ngrx/store';
import { KEY, State } from './state';

export const getApi = createFeatureSelector<State>(KEY);
