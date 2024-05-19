import { MediaResponse } from '@ocean/api/client';

export const KEY = 'images';

interface Images {
  [entityId: string]: {
    data: MediaResponse[];
  };
}

export interface State {
  images: Images;
  local: File[];
  isLoadingImages: boolean;
}

export const initialState: State = {
  images: {},
  local: [],
  isLoadingImages: false,
};
