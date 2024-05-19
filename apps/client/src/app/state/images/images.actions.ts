import { createAction, props } from '@ngrx/store';
import { MediaResponse } from '@ocean/api/client';

export enum ImagesActionTypes {
  uploadImages = '[Images] Upload Images',
  loadImages = '[Images] Load Images',
  setImages = '[Images] Set Images',
  setLocalImages = '[Images] Set Local Images',
}

export const ImagesActions = {
  uploadImages: createAction(
    ImagesActionTypes.uploadImages,
    props<{
      files: File[];
      entityId: number;
      entityName: string;
    }>()
  ),
  loadImages: createAction(
    ImagesActionTypes.loadImages,
    props<{
      entityId: number;
      tags: string;
    }>()
  ),
  setImages: createAction(
    ImagesActionTypes.setImages,
    props<{
      entityId: number;
      files: MediaResponse[];
    }>()
  ),
  setLocalImages: createAction(
    ImagesActionTypes.setLocalImages,
    props<{
      files: File[];
    }>()
  ),
};
