import { Draft, Job, PagedResponse } from '@ocean/api/shared';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

export const KEY = 'drafts';

export const draftsAdapter: EntityAdapter<Draft<Job>> = createEntityAdapter<Draft<Job>>({
  selectId: model => model.id
});

export interface State extends EntityState<Draft<Job>> {
  isLoading: boolean;
  isUpdating: boolean;
  selectedDraftId: string | null;
  drafts: PagedResponse<Job>;
}

export const initialState: State = draftsAdapter.getInitialState({
  isLoading: false,
  isUpdating: false,
  drafts: null,
  selectedDraftId: null
});
