import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { filter, of, switchMap, zip } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { NotifierService } from '@ocean/shared/services';
import { LocalizationService } from '@ocean/internationalization';
import {
  DeleteDraft,
  DeleteDraftFailure,
  DeleteDraftSuccess,
  DraftsActionTypes,
  LoadDrafts,
  LoadDraftsFailure,
  LoadDraftsSuccess,
  SaveDraft,
  SaveDraftFailure,
  SaveDraftSuccess,
  SetSelectedDraft,
  UpdateDraft,
  UpdateDraftFailure,
  UpdateDraftSuccess,
} from './actions';
import { JobProvider, JobStatus } from '@ocean/api/services';
import { Job, JobDTO, PagedResponse } from '@ocean/api/shared';
import { ImageFacadeService } from '@ocean/client/state/images/image-facade.service';
import { AuctionsFacade } from '@ocean/client/state';
import { ErrorHandlingService } from '@ocean/api/client/error-handling.service';

@Injectable()
export class DraftsEffects {
  saveDraft$ = createEffect(() =>
    this.actions$.pipe(
      ofType<SaveDraft>(DraftsActionTypes.SaveDraft),
      mergeMap((action) =>
        zip(
          this.jobProvider.createJob({
            job: action.payload.draft.content as JobDTO,
          }),
          of(action)
        )
      ),
      tap(([job, action]) => {
        const payload = action.payload;
        this.imagesFacade.updateImages(
          payload.files,
          job?.id,
          payload.draft?.content?.name
        );
      }),
      tap(() =>
        this.notifier.success(
          this.localizationService.translate('DRAFTS.SAVED')
        )
      ),
      map(
        ([res, action]) =>
          new SaveDraftSuccess({
            ...action.payload.draft,
            id: res.id.toString(),
          })
      ),
      catchError((err) => of(new SaveDraftFailure(err)))
    )
  );

  updateDraft$ = createEffect(() =>
    this.actions$.pipe(
      ofType<UpdateDraft>(DraftsActionTypes.UpdateDraft),
      tap((action) => {
        const payload = action.payload;
        this.imagesFacade.updateImages(
          payload.files,
          payload.draft.content.id,
          payload.draft.content.name
        );
      }),
      mergeMap((action) =>
        this.jobProvider.editJob({ job: action.payload.draft.content })
      ),
      map((res) => {
        this.notifier.success(
          this.localizationService.translate('DRAFTS.UPDATED')
        );
        return new UpdateDraftSuccess(res);
      }),
      catchError((err) => of(new UpdateDraftFailure(err)))
    )
  );

  deleteDraft$ = createEffect(() =>
    this.actions$.pipe(
      ofType<DeleteDraft>(DraftsActionTypes.DeleteDraft),
      mergeMap((action) =>
        this.jobProvider.markAsCancel(action.payload).pipe(
          tap(() =>
            this.notifier.success(
              this.localizationService.translate('DRAFTS.REMOVED')
            )
          ),
          map(() => new DeleteDraftSuccess(action.payload)),
          catchError((err) => of(new DeleteDraftFailure(err)))
        )
      )
    )
  );
  loadDrafts$ = createEffect(() =>
    this.actions$.pipe(
      ofType<LoadDrafts>(DraftsActionTypes.LoadDrafts),
      mergeMap((action) =>
        this.jobProvider
          .getAuctions({
            status: [JobStatus.DRAFT],
            pageable: action.payload,
          })
          .pipe(
            map((res) => {
              return new LoadDraftsSuccess(res as PagedResponse<Job>);
            }),
            catchError((err) => of(new LoadDraftsFailure(err)))
          )
      )
    )
  );

  setSelectedDraft$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType<SetSelectedDraft>(DraftsActionTypes.SetSelectedDraft),
        filter((draft) => draft?.payload && !isNaN(Number(draft.payload))),
        switchMap((draft) => {
          return this.jobProvider.findById({ id: Number(draft.payload) });
        }),
        tap((job) => {
          this.auctionsFacade.setSelectedAuction(job);
        }),
        catchError((err) => {
          return this.errorHandlingService.handleError(err);
        })
      ),
    { dispatch: false }
  );

  constructor(
    private readonly actions$: Actions,
    private readonly notifier: NotifierService,
    private readonly localizationService: LocalizationService,
    private readonly jobProvider: JobProvider,
    private readonly auctionsFacade: AuctionsFacade,
    private readonly imagesFacade: ImageFacadeService,
    private readonly errorHandlingService: ErrorHandlingService
  ) {}
}
