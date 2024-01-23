import { createReducer, on} from '@ngrx/store';
import {
  loadDocuments,
  loadDocumentsFailure,
  loadDocumentsSuccess,
  setSelectedDocument,
} from './actions';
import { Document } from './models';

export const documentsFeatureKey = 'documents';

export interface State {
  selectedDocumentId: string | null;
  documents: Document[];
  loading: boolean;
}

const initialState: State = {
  documents: [],
  loading: false,
  selectedDocumentId: null,
};

export const reducer = createReducer(
  initialState,
  on(setSelectedDocument, (state, { documentId }) => ({
    ...state,
    selectedDocumentId: documentId,
  })),
  on(loadDocuments, (state) => ({ ...state, loading: true, documents: [] })),
  on(loadDocumentsSuccess, (state, { documents }) => ({
    ...state,
    documents,
    loading: false,
  })),
  on(loadDocumentsFailure, (state, { error }) => ({ ...state, loading: false }))
);


export interface Slice {
  [key: string]: State;
}

