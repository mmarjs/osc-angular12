import { Injectable } from '@angular/core';
import { DraftDTO, Draft, Job, Pageable, PagedResponse, JobDTO } from '@ocean/api/shared';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { DeleteDraft, LoadDrafts, SaveDraft, SetSelectedDraft, UpdateDraft } from './actions';
import { State } from './state';
import { draftsQuery } from './selectors';

@Injectable({
  providedIn: 'root'
})
export class DraftsFacade {
  isLoading$: Observable<boolean> = this.store.pipe(select(draftsQuery.selectIsLoading));
  isUpdating$: Observable<boolean> = this.store.pipe(select(draftsQuery.selectIsUpdating));
  drafts$: Observable<PagedResponse<Job>> = this.store.pipe(select(draftsQuery.selectDrafts));
  drafstEntities$: Observable<{ [id: string]: Draft<Job> }> = this.store.pipe(select(draftsQuery.selectDraftsEntities));
  selectedDraft$: Observable<Draft<Job>> = this.store.pipe(select(draftsQuery.selectDraft));
  selectCurrentDraftId$: Observable<string> = this.store.pipe(select(draftsQuery.selectCurrentDraftId));

  constructor(private store: Store<State>) { }

  saveDraft(draftDto: DraftDTO<Job>, files: File[]) {
    this.store.dispatch(new SaveDraft({draft: draftDto, files}));
  }

  updateDraft(draftDto: Partial<DraftDTO<JobDTO>>, files: File[]) {
    this.store.dispatch(new UpdateDraft({draft: draftDto, files}));
  }

  deleteDraft(id: string) {
    this.store.dispatch(new DeleteDraft(id));
  }

  setSelectedDraft(draft: string | null) {
    this.store.dispatch(new SetSelectedDraft(draft));
  }
  loadDrafts(request: Pageable) {
    this.store.dispatch(new LoadDrafts(request));
  }
}
