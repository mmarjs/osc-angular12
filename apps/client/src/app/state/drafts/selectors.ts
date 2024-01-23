import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';
import { KEY, State, draftsAdapter } from './state';

const selectDraftsState: MemoizedSelector<object, State> = createFeatureSelector<State>(KEY);

const {
  selectEntities,
} = draftsAdapter.getSelectors();

const selectIsLoading = createSelector(
  selectDraftsState,
  (state: State) => state.isLoading
);

const selectIsUpdating = createSelector(
  selectDraftsState,
  (state: State) => state.isUpdating
);

const selectDrafts = createSelector(
  selectDraftsState,
  (state) => state.drafts,
);

const selectDraftsEntities = createSelector(
  selectDraftsState,
  selectEntities
);

const selectCurrentDraftId = createSelector(
  selectDraftsState,
  (state: State) => state.selectedDraftId
);

const selectDraft = createSelector(
  selectEntities,
  selectCurrentDraftId,
  (draftEntities, draftId) => draftEntities[draftId]
);

export const draftsQuery = {
  selectIsLoading,
  selectIsUpdating,
  selectDrafts,
  selectDraft,
  selectDraftsEntities,
  selectCurrentDraftId
};
