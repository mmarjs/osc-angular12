import { createReducer, on } from '@ngrx/store';
import { ImagesActions } from './images.actions';
import { initialState } from './state';

export const imagesReducer = createReducer(
  initialState,
  on(ImagesActions.loadImages, (state, { entityId }) => ({
    ...state,
    images: {
      [entityId]: {
        data: state?.images ? state.images[entityId]?.data ?? [] : [],
      },
    },
    isLoadingImages: true,
  })),
  on(ImagesActions.setImages, (state, { entityId, files }) => ({
    ...state,
    images: {
      [entityId]: {
        data: [...files],
      },
    },
    isLoadingImages: false,
  })),
  on(ImagesActions.setLocalImages, (state, { files }) => ({
    ...state,
    local: files,
  }))
);
