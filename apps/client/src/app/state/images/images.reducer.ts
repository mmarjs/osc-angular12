import { createReducer, on } from '@ngrx/store';
import { loadImages, setImages } from './images.actions';
import { initialState } from './state';

export const imagesReducer = createReducer(
  initialState,
  on(loadImages, (state, { entityId }) => {
    return {
      ...state,
      images: {
        [entityId]: {
          data: state?.images ? state.images[entityId]?.data ?? [] : [],
          isLoadingImages: true,
        },
      },
    };
  }),
  on(setImages, (state, { entityId, files }) => {
    return {
      ...state,
      images: {
        [entityId]: {
          data: [...files],
          isLoadingImages: false,
        },
      },
    };
  })
);
