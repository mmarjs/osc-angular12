import { Action } from '@ngrx/store';
import { Draft, DraftDTO, Job, JobDTO, Pageable, PagedResponse } from '@ocean/api/shared';

export enum DraftsActionTypes {
  SetSelectedDraft = '[Drafts] Set Selected Draft',
  SaveDraft = '[Drafts] Save Draft',
  SaveDraftSuccess = '[Drafts] Save Draft Success',
  SaveDraftFailure = '[Drafts] Save Draft Failure',
  UpdateDraft = '[Drafts] Update Draft',
  UpdateDraftSuccess = '[Drafts] Update Draft Success',
  UpdateDraftFailure = '[Drafts] Update Draft Failure',
  DeleteDraft = '[Drafts] Delete Draft',
  DeleteDraftSuccess = '[Drafts] Delete Draft Success',
  DeleteDraftFailure = '[Drafts] Delete Draft Failure',
  LoadDrafts = '[Drafts] Load All Drafts',
  LoadDraftsSuccess = '[Drafts] Load Drafts Success',
  LoadDraftsFailure = '[Drafts] Load Drafts Failure'
}

export class SetSelectedDraft implements Action {
  readonly type = DraftsActionTypes.SetSelectedDraft;
  constructor(public payload: string) { }
}

export class SaveDraft implements Action {
  readonly type = DraftsActionTypes.SaveDraft;
  constructor(public payload: {draft: DraftDTO<Job>; files: File[]}) { }
}

export class SaveDraftSuccess implements Action {
  readonly type = DraftsActionTypes.SaveDraftSuccess;
  constructor(public payload: Draft<Job>) { }
}

export class SaveDraftFailure implements Action {
  readonly type = DraftsActionTypes.SaveDraftFailure;
  constructor(public payload: Error) { }
}

export class UpdateDraft implements Action {
  readonly type = DraftsActionTypes.UpdateDraft;
  constructor(public payload: {draft: Partial<DraftDTO<JobDTO>>; files: File[]}) { }
}

export class UpdateDraftSuccess implements Action {
  readonly type = DraftsActionTypes.UpdateDraftSuccess;
  constructor(public payload: Partial<DraftDTO<Job>>) { }
}

export class UpdateDraftFailure implements Action {
  readonly type = DraftsActionTypes.UpdateDraftFailure;
  constructor(public payload: Error) { }
}

export class DeleteDraft implements Action {
  readonly type = DraftsActionTypes.DeleteDraft;
  constructor(public payload: string) { }
}

export class DeleteDraftSuccess implements Action {
  readonly type = DraftsActionTypes.DeleteDraftSuccess;
  constructor(public payload: string) { }
}

export class DeleteDraftFailure implements Action {
  readonly type = DraftsActionTypes.DeleteDraftFailure;
  constructor(public payload: Error) { }
}

export class LoadDrafts implements Action {
  readonly type = DraftsActionTypes.LoadDrafts;
  constructor(public payload: Pageable) {
  }
}

export class LoadDraftsSuccess implements Action {
  readonly type = DraftsActionTypes.LoadDraftsSuccess;
  constructor(public payload: PagedResponse<Job>) {
  }
}

export class LoadDraftsFailure implements Action {
  readonly type = DraftsActionTypes.LoadDraftsFailure;
  constructor(public payload: Error) {
  }
}

export type DraftsAction = SetSelectedDraft
  | SaveDraft
  | SaveDraftSuccess
  | SaveDraftFailure
  | UpdateDraft
  | UpdateDraftSuccess
  | UpdateDraftFailure
  | DeleteDraft
  | DeleteDraftSuccess
  | DeleteDraftFailure
  | LoadDrafts
  | LoadDraftsSuccess
  | LoadDraftsFailure;

export const fromDraftsActions = {
  SetSelectedDraft,
  SaveDraft,
  SaveDraftSuccess,
  SaveDraftFailure,
  UpdateDraft,
  UpdateDraftSuccess,
  UpdateDraftFailure,
  DeleteDraft,
  DeleteDraftSuccess,
  DeleteDraftFailure
};
