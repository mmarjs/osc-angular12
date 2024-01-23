import { createAction, props } from '@ngrx/store';
import { MediaResponse } from '@ocean/api/client';

export enum ImagesActionTypes {
  uploadImages = '[Images] UploadImages',
  loadImages = '[Images] LoadImages',
  setImages = '[Images] SetImages',
}
export const uploadImages = createAction(ImagesActionTypes.uploadImages, props<{
  files: File[];
  entityId: number;
  entityName: string;
}>());

export const loadImages = createAction(ImagesActionTypes.loadImages, props<{
  entityId: number;
  tags: string;
}>());

export const setImages = createAction(ImagesActionTypes.setImages, props<{
  entityId: number;
  files: MediaResponse[];
}>());
