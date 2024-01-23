import { createAction } from '@ngrx/store';
import { Document } from './models';

export const loadDocuments = createAction(
  '[Documents] Load Documents',
  (jobId: number | null = null) => ({ jobId })
);
export const loadDocumentsSuccess = createAction(
  '[Documents] Load Documents Success',
  ({ documents }: { documents: Document[] }) => ({ documents })
);
export const loadDocumentsFailure = createAction(
  '[Documents] Load Documents Failure',
  (error: string) => ({ error })
);

export const setSelectedDocument = createAction(
  '[Documents] Set Selected Document',
  (documentId: string) => ({ documentId })
);
