import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { NotifierService } from '@ocean/shared/services';
import { catchError, EMPTY, forkJoin, Observable, tap } from 'rxjs';
import { ClientService } from './client.service';

export interface MediaParams {
  file: File;
  transformations?: MediaTransform[];
  tags: string;
  title: string;
}

export interface MediaParamsMultiple {
  files: File[];
  transformations?: MediaTransform[];
  tags: string;
  title: string;
}

export interface MediaParamsMultipleDelete {
  files: MediaResponse[];
}

export interface MediaResponse {
  bytes: number;
  createdOn: string;
  deliveryType: string;
  fileTitle: string;
  fileURL: string;
  format: string;
  originalFilename: string;
  publicId: string;
  resourceType: string;
  secureFileURL: string;
  signature: string;
  tags: string[];
  transformationsList: MediaTransformation[];
  version: string;
  isActiveCarousel?: boolean;
}

export interface MediaTransformation {
  bytes: number;
  fileURL: string;
  format: string;
  id: string;
  secureFileURL: string;
  transformations: string;
}

export function transformMedia(media: MediaResponse, name: MediaTransform) {
  return media.transformationsList?.find(mediaTransform => mediaTransform.transformations === 't_' + name)?.secureFileURL
    || media.secureFileURL;
}

export enum MediaTransform {
  CAROUSEL_MAIN = 'carousel_main',
  CAROUSEL_THUMB = 'carousel_thumb',
  THUMB = 'thumb',
  AVATAR = 'avatar'
}

@Injectable({
  providedIn: 'root',
})
export class MediaService {
  private MEDIA_URL = 'api/media/files';

  constructor(
    private clientService: ClientService,
    private notifier: NotifierService,
    private translate: TranslateService
  ) { }

  getFilesByTags(params): Observable<MediaResponse[]> {
    return this.clientService.request<MediaResponse[]>({
      url: `${this.MEDIA_URL}/info/tags`,
      method: 'GET',
      params,
    });
  }

  uploadFileWithTransformation(payload: MediaParams): Observable<MediaResponse> {
    const formData = new FormData();
    Object.keys(payload).forEach(key => {
      formData.append(key, payload[key]);
    });
    return this.clientService.request<MediaResponse>({
      url: `${this.MEDIA_URL}/upload/transformations`,
      method: 'POST',
      headers: { 'Content-Type': 'multipart/form-data' },
      data: formData,
    });
  }

  uploadMultipleFilesWithTransformation({ files, transformations, tags, title }: MediaParamsMultiple): Observable<MediaResponse[]> {
    const uploadFiles$ = files.map((file) => {
      return this.uploadFileWithTransformation({ file, tags, title, transformations });
    });
    return forkJoin(uploadFiles$).pipe(
      tap(() => this.notifier.success(this.translate.instant('MEDIA.IMAGES_UPLOADED'))),
    );
  }

  updateFileWithTransformation(payload: MediaParams & {fileId: string}) {
    const formData = new FormData();
    Object.keys(payload).forEach(key => {
      formData.append(key, payload[key]);
    });
    return this.clientService.request<MediaResponse>({
      url: `${this.MEDIA_URL}/update/transformations`,
      method: 'PUT',
      headers: { 'Content-Type': 'multipart/form-data' },
      data: formData,
    });
  }

  uploadFile(body: FormData, params: Partial<MediaParams>): Observable<MediaResponse> {
    return this.clientService
      .request<MediaResponse>({
        url: `${this.MEDIA_URL}/upload`,
        method: 'POST',
        headers: { 'Content-Type': 'multipart/form-data' },
        data: body,
        params,
      })
      .pipe(
        catchError((err) => {
          return EMPTY;
        })
      );
  }

  deleteMultipleFiles({ files }: MediaParamsMultipleDelete) {
    const deletedFiles$ = files.map((file) => {
      return this.deleteFile({ fileId: file.publicId });
    });
    return forkJoin(deletedFiles$).pipe(
      tap(() => this.notifier.success(this.translate.instant('MEDIA.IMAGES_DELETED'))),
    );
  }

  deleteFile(payload: { fileId: string }): Observable<void> {
    return this.clientService.request<void>({
      headers: { 'Content-Type': 'multipart/form-data' },
      url: `${this.MEDIA_URL}/delete`,
      method: 'DELETE',
      data: {
        ...payload
      }
    });
  }
}
