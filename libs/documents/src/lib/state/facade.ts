import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { UserStatus } from '@ocean/api/services';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { paramToNumber } from '@ocean/shared/utils';
import { map } from 'rxjs/operators';
import { loadDocuments } from './actions';
import { Slice } from './index';
import {
  selectDocument,
  selectDocuments,
  selectDocumentsLoading,
} from './selectors';

@Injectable({
  providedIn: 'root',
})
export class DocumentsFacadeService {
  documents$ = this.store.pipe(select(selectDocuments));
  isLoading$ = this.store.pipe(select(selectDocumentsLoading));
  selectedDocument$ = this.store.pipe(select(selectDocument));

  shouldSignDocument$ = this.documents$.pipe(
    map((documents) =>
      documents.some(
        (document) => document.userStatus === UserStatus.NotCompleted
      )
    )
  );

  constructor(private store: Store<Slice>) {}

  /**
   * Load documents for a given job id or all documents if no job id is provided
   */
  loadDocuments(jobId: number | string | null): void {
    const id: number | null = paramToNumber(jobId);
    // id can be only positive
    if (id && id > 0) {
      this.store.dispatch(loadDocuments(id));
    } else {
      // load all documents
      this.store.dispatch(loadDocuments());
    }
  }
}
