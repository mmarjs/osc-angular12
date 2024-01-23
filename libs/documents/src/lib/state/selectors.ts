import { createSelector } from '@ngrx/store';
import { State, documentsFeatureKey, Slice } from './index';

export const selectDocumentsState = (state: Slice): State => state[documentsFeatureKey];

export const selectDocuments = createSelector(
  selectDocumentsState,
  (state: State) => state.documents
);

export const selectDocumentsLoading = createSelector(
  selectDocumentsState,
  (state: State) => state.loading
);

export const selectDocument = createSelector(
  selectDocumentsState,
  (state: State) =>
    state.documents.find((document) => document.id === state.selectedDocumentId)
);
