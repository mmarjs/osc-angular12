import { Injectable } from '@angular/core';
import { ClientService } from '@ocean/api/client';
import { Document, DocumentSignLink } from './models';

@Injectable({
  providedIn: 'root',
})
export class DocumentProvider {
  public constructor(private readonly api: ClientService) {}
  baseUrl: string = '/api/documents';

  public getDocuments() {
    return this.api.request<Document[]>({ url: this.baseUrl, method: 'GET' });
  }

  public getDocumentsForJob(jobId: string | number) {
    return this.api.request<Document[]>({
      url: `${this.baseUrl}/job/${jobId}`,
      method: 'GET',
    });
  }

  public getSignLink(
    documentId: string | number,
    redirectUrl: string,
    signLinkValidTill: Date
  ) {
    return this.api.request<DocumentSignLink>({
      url: `${this.baseUrl}/${documentId}/link`,
      method: 'POST',
      data: { redirectUrl, signLinkValidTill: signLinkValidTill.toISOString() },
    });
  }
}
