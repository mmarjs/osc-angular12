import { MediaResponse } from '@ocean/api/client';

export const KEY = 'images';

export interface State {
  images: {
    [entityId: string]: {
      data: MediaResponse[];
      isLoadingImages: boolean;
    };
  };
}

export const initialState: State = {
  images: {}
};
