export enum DocumentStatus {
  New = 'New',
  InProgress = 'InProgress',
  Completed = 'Completed',
  Declined = 'Declined',
  Revoked = 'Revoked'
}

export enum UserStatus {
  Completed = 'Completed',
  NotCompleted = 'NotCompleted',
}

export interface Document {
  id: string;
  title: string;
  externalDocumentId: string;
  status: DocumentStatus;
  userStatus: UserStatus
}

export interface DocumentSignLink {
  signLink: string;
}

