import {
  createFeatureSelector,
  createSelector,
  MemoizedSelector,
} from '@ngrx/store';
import { KEY, State } from './state';

const selectImagesState: MemoizedSelector<object, State> =
  createFeatureSelector<State>(KEY);

export const getImages = (entityId: number) =>
  createSelector(
    selectImagesState,
    (state: State) => state?.images[entityId]?.data
  );

export const getLocalImages = () =>
  createSelector(selectImagesState, (state: State) => state?.local);

export const isLoadingImagesInProgress = () =>
  createSelector(selectImagesState, (state: State) => state?.isLoadingImages);
