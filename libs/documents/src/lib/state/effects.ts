import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { DocumentProvider } from '@ocean/api/services';
import { catchError, map, of, switchMap } from 'rxjs';
import {
  loadDocuments,
  loadDocumentsFailure,
  loadDocumentsSuccess,
} from './actions';

@Injectable()
export class DocumentEffects {
  constructor(
    private actions$: Actions,
    private documentsProvider: DocumentProvider
  ) {}

  loadDocuments$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadDocuments),
      switchMap(({ jobId }) => {
        if (jobId) {
          return this.documentsProvider.getDocumentsForJob(jobId);
        } else {
          return this.documentsProvider.getDocuments();
        }
      }),
      map((response) => loadDocumentsSuccess({ documents: response })),
      catchError(() => of(loadDocumentsFailure('Error loading documents')))
    )
  );
}
