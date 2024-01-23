import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { PartialState } from './state.partial';
import { loadImages, setImages, uploadImages } from '@ocean/client/state/images/images.actions';
import { Observable } from 'rxjs';
import { getImages, isLoadingImagesInProgress } from '@ocean/client/state/images/images.selectors';
import { MediaResponse } from '@ocean/api/client';
import { tagsCreator } from '@ocean/shared/utils/tags';

@Injectable({
  providedIn: 'root'
})
export class ImageFacadeService {

  constructor(private store: Store<PartialState>) { }

  images$: (entityId: number) => Observable<MediaResponse[]> = (entityId: number) => this.store.pipe(
    select(getImages(entityId))
  );

  isLoadingImages: (entityId: number) => Observable<boolean> = (entityId: number) => this.store.pipe(
    select(isLoadingImagesInProgress(entityId))
  );

  updateImages(files: File[], entityId: number, entityName: string) {
    this.store.dispatch(uploadImages({
      files,
      entityId,
      entityName
    }));
  }

  loadImages (entityId: number, userId: string) {
    const tags = tagsCreator(entityId, userId);
    this.store.dispatch(loadImages({entityId, tags}));
  }

  setImages(entityId: number, files: MediaResponse[]) {
    this.store.dispatch(setImages({entityId, files}));
  }
}
