import { Injectable } from '@angular/core';
import { ClientService, MediaResponse, Params } from '@ocean/api/client';
import {
  JobDTO,
  Pageable,
  PagedResponse,
  StoredObjectDescriptorDTO,
} from '@ocean/api/shared';
import { map, Observable, switchMap } from 'rxjs';

import {
  JobCreateJobRequest,
  JobDeleteImageRequest,
  JobDeleteObjectRequest,
  JobFindByBoatIdRequest,
  JobFindByIdRequest,
  JobFindRepairsByBoatIdRequest,
  JobFindSurveysByBoatIdRequest,
  JobListByStatusRequest,
  JobListRequest,
  JobLiveListRequest,
  JobMarkAsAcceptedRequest,
  JobMarkAsCompletedRequest, JobStatus,
  JobUploadImageRequest,
  JobUploadObjectRequest,
} from './requests';
import { JobMarkAsInProgressRequest } from '@ocean/api/services/job/requests/jobMarkAsInProgress';
import { sortForRequestValues } from '@ocean/shared/utils/sort-for-request-values';
import { paginationForRequestValues } from '@ocean/shared/utils/pagination-for-request-values';

export interface Image {
  name: string;
  objectId: string;
  url: string;
}

export interface Boat {
  about: string;
  address: string;
  address2: string;
  city: string;
  id: number;
  images: Image[];
  length: string;
  makeModelYear: string;
  name: string;
  state: string;
  type: string;
  zipCode: string;
}

export interface JobItem {
  description: string;
  id: number;
  title: string;
}

export interface Sort {
  empty: boolean;
  sorted: boolean;
  unsorted: boolean;
}

export interface CurrentUserAuctionsResponse {
  content: JobDTO[];
  empty: boolean;
  first: boolean;
  last: boolean;
  number: number;
  numberOfElements: number;
  pageable: Pageable;
  size: number;
  sort: Sort;
  totalElements: number;
  totalPages: number;
}

@Injectable({
  providedIn: 'root',
})
export class JobProvider {
  private readonly baseUrl = `/api/jobs`;

  public constructor(private readonly api: ClientService) {}

  /**
   * List
   * Responses: 200, 401, 403, 404
   */
  public currentUserAuctions(
    request?: JobListRequest
  ): Observable<PagedResponse<JobDTO>> {
    const params = new Params(request, [], [], ['pageable']);

    return this.api
      .request<PagedResponse<JobDTO>>({
        url: `${this.baseUrl}/users/current`,
        method: 'GET',
        params: params.forBody,
      })
      .pipe(
        map((response) => ({
          currentPageNo: response.currentPageNo,
          data: response.data,
          totalPages: response.totalPages,
          totalRecords: response.totalRecords,
        }))
      );
  }

  /**
   * List
   * Responses: 200, 401, 403, 404
   */
  public list(request?: JobListRequest) {
    const params = new Params(request, [], [], ['pageable']);

    return this.api.request<PagedResponse<JobDTO>>({
      url: `${this.baseUrl}`,
      method: 'GET',
      params: params.forBody,
    });
  }

  public getLiveAuctions(
    request?: JobLiveListRequest
  ): Observable<PagedResponse<JobDTO>> {
    return this.api.request<PagedResponse<JobDTO>>({
      url: `${this.baseUrl}/search`,
      method: 'GET',
      params: request,
    });
  }

  public getAuctions(request: JobListByStatusRequest) {
    return this.api.request<PagedResponse<JobDTO>>({
      url: `${this.baseUrl}/users/current`,
      method: 'GET',
      params: {
        sort: sortForRequestValues([request.pageable.sort, request.pageable.direction]),
        ...paginationForRequestValues(request.pageable),
        status: request.status.join(','),
      },
    });
  }

  /**
   * CreateJob
   * Responses: 200, 201, 401, 403, 404
   */
  public createJob(request: JobCreateJobRequest) {
    const params = new Params(request, [], [], ['job']);

    return this.api.request<JobDTO>({
      url: `${this.baseUrl}`,
      method: 'POST',
      data: params.forBody,
    });
  }

  /**
   * EditJob
   * Responses: 200, 201, 401, 403, 404
   */
  public editJob(request: JobCreateJobRequest) {
    const params = new Params(request, [], [], ['job']);

    return this.api.request<JobDTO>({
      url: `${this.baseUrl}`,
      method: 'PUT',
      data: params.forBody,
    });
  }

  /**
   * FindByBoatId
   * Responses: 200, 401, 403, 404
   */
  public findByBoatId(request: JobFindByBoatIdRequest) {
    return this.api.request<Array<JobDTO>>({
      url: `${this.baseUrl}/boat/${request.id}`,
      method: 'GET',
    });
  }

  /**
   * FindRepairsByBoatId
   * Responses: 200, 401, 403, 404
   */
  public findRepairsByBoatId(request: JobFindRepairsByBoatIdRequest) {
    return this.api.request<Array<JobDTO>>({
      url: `${this.baseUrl}/repairs/boat/${request.id}`,
      method: 'GET',
    });
  }

  /**
   * FindSurveysByBoatId
   * Responses: 200, 401, 403, 404
   */
  public findSurveysByBoatId(request: JobFindSurveysByBoatIdRequest) {
    return this.api.request<Array<JobDTO>>({
      url: `${this.baseUrl}/surveys/boat/${request.id}`,
      method: 'GET',
    });
  }

  /**
   * FindById
   * Responses: 200, 401, 403, 404
   */
  public findById(request: JobFindByIdRequest) {
    return this.api
      .request<JobDTO>({
        url: `${this.baseUrl}/${request.id}`,
        method: 'GET',
      })
      .pipe(
        map((job) => {
            return ({
                ...job,
                isStarted: new Date() >= new Date(job.auctionStartDate as string),
                isFinished: new Date() <= new Date(job.auctionEndDate as string),
            });
        })
      );
  }

  public markAsInProgress(request: JobMarkAsInProgressRequest) {
    return this.api.request({
      url: `${this.baseUrl}/${request.id}/progress`,
      method: 'PUT'
    });
  }

  /**
   * MarkAsAccepted
   * Responses: 200, 201, 401, 403, 404
   */
  public markAsAccepted(request: JobMarkAsAcceptedRequest) {
    return this.api.request({
      url: `${this.baseUrl}/${request.id}/accepted`,
      method: 'PUT',
    });
  }

  /**
   * MarkAsCompleted
   * Responses: 200, 201, 401, 403, 404
   */
  public markAsCompleted(request: JobMarkAsCompletedRequest) {
    return this.api.request({
      url: `${this.baseUrl}/${request.id}/completed`,
      method: 'PUT',
    });
  }

  public markAsCancel(auctionId: string) {
    return this.api.request({
      url: `${this.baseUrl}/${auctionId}/cancel`,
      method: 'PUT',
    });
  }

  /**
   * UploadImage
   * Responses: 200, 201, 401, 403, 404
   */
  public uploadImage(request: JobUploadImageRequest) {
    const params = new Params(request, ['id'], [], ['file']);

    return this.api.request<StoredObjectDescriptorDTO>({
      url: `${this.baseUrl}/${request.id}/images`,
      method: 'POST',
      data: params.forBody,
    });
  }

  /**
   * DeleteImage
   * Responses: 200, 204, 401, 403
   */
  public deleteImage(request: JobDeleteImageRequest) {
    return this.api.request({
      url: `${this.baseUrl}/${request.id}/images/${request.imageId}`,
      method: 'DELETE',
    });
  }

  /**
   * UploadObject
   * Responses: 200, 201, 401, 403, 404
   */
  public uploadObject(request: JobUploadObjectRequest) {
    const params = new Params(request, ['id'], [], ['file']);

    return this.api.request<StoredObjectDescriptorDTO>({
      url: `${this.baseUrl}/${request.id}/objects`,
      method: 'POST',
      data: params.forBody,
    });
  }

  /**
   * DeleteObject
   * Responses: 200, 204, 401, 403
   */
  public deleteObject(request: JobDeleteObjectRequest) {
    return this.api.request({
      url: `${this.baseUrl}/${request.id}/objects/${request.objectId}`,
      method: 'DELETE',
    });
  }

  public pay(auctionId: number, data: any) {
    return this.api.request({
      url: `${this.baseUrl}/pay/${auctionId}`,
      method: 'POST',
      data: data,
    });
  }

  public hasPaid(auctionId: number) {
    return this.api.request({
      url: `${this.baseUrl}/checkPayment/${auctionId}`,
      method: 'POST',
    });
  }

  public startAuction(auctionId: number) {
    return this.api.request({
      url: `${this.baseUrl}/start/${auctionId}`,
      method: 'PUT',
    });
  }

  public associateMedia(jobId: number, fileIds: string[]) {
    return this.api.request({
      url: `${this.baseUrl}/${jobId}/associateMedia`,
      method: 'POST',
      data: {
        fileIds,
      },
    });
  }

  public getAssociatedMedia(jobId: number) {
    return this.api.request<MediaResponse[]>({
      url: `${this.baseUrl}/${jobId}/associatedMedia`,
      method: 'GET',
    });
  }

  public deleteAssociatedMedia(jobId: number, fileId: string) {
    return this.api.request({
      url: `${this.baseUrl}/${jobId}/associatedMedia${fileId}`,
      method: 'DELETE',
    });
  }
}
