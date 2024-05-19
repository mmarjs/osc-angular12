import {
  Document,
  DocumentProvider,
  DocumentSignLink,
  DocumentStatus,
} from '@ocean/api/services';
import { map, Observable, of } from 'rxjs';
import { ContractDocumentComponent } from './contract-document.component';
import { maxBy } from 'lodash-es';

type DocumentProperty = InstanceType<
  typeof ContractDocumentComponent
>['document'];

type SignLinkResponse = [Document | undefined, DocumentSignLink | undefined];

const priorities = [
  DocumentStatus.InProgress,
  DocumentStatus.New,
  DocumentStatus.Declined,
  DocumentStatus.Completed,
];

const getDocumentByPriority = (documents: Document[]): DocumentProperty =>
  maxBy(documents, (document) => priorities.indexOf(document.status));

const getSignLink = (
  provider: DocumentProvider,
  documents?: Document[]
): Observable<SignLinkResponse> => {
  if (!Array.isArray(documents)) {
    return of([undefined, undefined]);
  }

  const document = getDocumentByPriority(documents);
  if (document === undefined) {
    return of([undefined, undefined]);
  }

  if (document.status !== DocumentStatus.Declined) {
    const date = new Date();
    date.setHours(date.getHours() + 1);
    return provider
      .getSignLink(document?.id, '', date)
      .pipe(map((response) => [document, response]));
  }

  return of([document, undefined]);
};

const getValidatedSignLink = (link?: DocumentSignLink) => {
  return link?.signLink ? link.signLink : undefined;
};

export { getSignLink, getValidatedSignLink };
