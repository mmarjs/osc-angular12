import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { filter, map, of, switchMap, throwError, zip } from 'rxjs';
import { catchError, withLatestFrom } from 'rxjs/operators';
import { NotifierService } from '@ocean/shared/services';
import { MediaResponse, MediaService, MediaTransform } from '@ocean/api/client';
import { JobProvider } from '@ocean/api/services';
import { UserFacade } from '@ocean/api/state';
import { tagsCreator } from '@ocean/shared/utils/tags';
import { ImagesActions } from '@ocean/client/state/images/images.actions';

@Injectable()
export class ImagesEffects {
  uploadImages$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ImagesActions.uploadImages),
        filter(({ files }) => files && files.length > 0),
        withLatestFrom(this.userFacade.id$),
        switchMap(([{ files, entityId, entityName }, userId]) => {
          if (files && files.length > 0) {
            return zip(
              this.mediaService.uploadMultipleFilesWithTransformation({
                files,
                tags: tagsCreator(entityId, userId),
                title: entityName,
                transformations: [
                  MediaTransform.CAROUSEL_MAIN,
                  MediaTransform.CAROUSEL_THUMB,
                ],
              }),
              of(entityId)
            );
          }
          return zip(of([]), of(entityId));
        }),
        switchMap((props: [MediaResponse[], number]) => {
          const [files, entityId] = props;
          if (files) {
            const fileIds = files.map((f) => f.publicId);
            return this.jobProvider.associateMedia(entityId, fileIds);
          }
        }),
        catchError((err) => {
          this.notifier.error(err?.message ?? 'Error');
          return throwError(() => err);
        })
      ),
    { dispatch: false }
  );

  loadImages$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ImagesActions.loadImages),
      switchMap(({ entityId, tags }) => {
        return zip(
          this.mediaService.getFilesByTags({
            tags,
          }),
          of(entityId)
        );
      }),
      map(([files, entityId]: [files: MediaResponse[], entityId: number]) => {
        return ImagesActions.setImages({ entityId, files });
      })
    )
  );

  constructor(
    private readonly actions$: Actions,
    private readonly notifier: NotifierService,
    private readonly mediaService: MediaService,
    private readonly jobProvider: JobProvider,
    private readonly userFacade: UserFacade
  ) {}
}
