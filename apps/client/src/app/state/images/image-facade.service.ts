import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { PartialState } from './state.partial';
import { ImagesActions } from './images.actions';
import { catchError, from, map, Observable, of, switchMap } from 'rxjs';
import {
  getImages,
  getLocalImages,
  isLoadingImagesInProgress,
} from '@ocean/client/state/images/images.selectors';
import { MediaResponse } from '@ocean/api/client';
import { tagsCreator } from '@ocean/shared/utils/tags';
import { readFilesAsDataURL } from '@ocean/shared/pipes/file-as-data-url.pipe';
import { Image } from '@ocean/carousel';
import { FileType } from '@ocean/shared/utils/read-file-async';
import { withLatestFrom } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ImageFacadeService {
  constructor(private readonly store: Store<PartialState>) {}

  readonly isLoadingImages$ = this.store.pipe(
    select(isLoadingImagesInProgress())
  );

  readonly local$ = this.store.pipe(select(getLocalImages()));

  readonly remote$: (entityId: number) => Observable<MediaResponse[]> = (
    entityId: number
  ) => this.store.pipe(select(getImages(entityId)));

  getLocalImages(data: unknown[]) {
    return (
      data
        ?.filter(
          (item: FileType) => item instanceof File || item?.file instanceof File
        )
        ?.map((type: FileType) => (type instanceof File ? type : type?.file)) ??
      []
    );
  }

  updateImages(files: File[], entityId: number, entityName: string) {
    this.store.dispatch(
      ImagesActions.uploadImages({
        files,
        entityId,
        entityName,
      })
    );
  }

  images$(entityId?: number | string) {
    if (
      (typeof entityId === 'string' && isNaN(+entityId)) ||
      typeof entityId !== 'number'
    ) {
      return this.local$.pipe(
        switchMap((files) =>
          from(readFilesAsDataURL(files)).pipe(
            catchError(() => of([] as Image[]))
          )
        )
      );
    }

    return this.remote$(+entityId).pipe(
      withLatestFrom(this.local$),
      switchMap(([auctionImages, cache]) =>
        !cache.length
          ? of(auctionImages ?? [])
          : from(readFilesAsDataURL(cache)).pipe(
              map((raw) => [...(auctionImages ?? []), ...raw]),
              catchError(() => of(auctionImages ?? ([] as MediaResponse[])))
            )
      )
    );
  }

  loadImages(entityId: number, userId: string) {
    const tags = tagsCreator(entityId, userId);
    this.store.dispatch(ImagesActions.loadImages({ entityId, tags }));
  }

  setImages(entityId: number, files: MediaResponse[]) {
    this.store.dispatch(ImagesActions.setImages({ entityId, files }));
  }

  cache(files?: File[]) {
    this.store.dispatch(
      ImagesActions.setLocalImages({
        files: this.getLocalImages(files),
      })
    );
  }
}
