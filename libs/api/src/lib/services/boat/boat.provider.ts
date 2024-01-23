import { Injectable } from '@angular/core';
import { ClientService, Params } from '@ocean/api/client';
import {
  Boat,
  BoatOutputDTO,
  PagedResponse,
  StoredObjectDescriptorDTO,
} from '@ocean/api/shared';

import {
  BoatAddBoatRequest,
  BoatDeleteBoatByIdRequest,
  BoatDeleteImageRequest,
  BoatDeleteObjectRequest,
  BoatGetBoatByIdRequest,
  BoatGetBoatsRequest,
  BoatSearchBoatsRequest,
  BoatUpdateBoatInfoRequest,
  BoatUploadImageRequest,
  BoatUploadObjectRequest,
} from './requests';

@Injectable({
  providedIn: 'root',
})
export class BoatProvider {
  private readonly baseUrl = '/api/boats';

  public constructor(private readonly api: ClientService) {}

  /**
   * GetBoats
   * Responses: 200, 401, 403, 404
   */
  public getBoats(request?: BoatGetBoatsRequest) {
    const params = new Params(request, [], ['pageable'], []);
    return this.api.request<PagedResponse<BoatOutputDTO>>({
      url: `${this.baseUrl}`,
      method: 'GET',
      params: (params.forQuery as BoatGetBoatsRequest).pageable,
    });
  }

  /**
   * AddBoat
   * Responses: 200, 201, 401, 403, 404
   */
  public addBoat(request: BoatAddBoatRequest) {
    const params = new Params(request, [], [], ['boatDTO']);

    return this.api.request<BoatOutputDTO>({
      url: `${this.baseUrl}`,
      method: 'POST',
      data: params.forBody,
    });
  }

  /**
   * UpdateBoatInfo
   * Responses: 200, 201, 401, 403, 404
   */
  public updateBoatInfo(request: BoatUpdateBoatInfoRequest) {
    const params = new Params(request, [], [], ['boatDTO']);

    return this.api.request<Boat>({
      url: `${this.baseUrl}`,
      method: 'PUT',
      data: params.forBody,
    });
  }

  /**
   * SearchBoats
   * Responses: 200, 401, 403, 404
   */
  public searchBoats(request?: BoatSearchBoatsRequest) {
    const params = new Params(request, [], ['searchKey', 'pageable'], []);
    return this.api.request<PagedResponse<BoatOutputDTO>>({
      url: `${this.baseUrl}/search`,
      method: 'GET',
      params: {
        searchKey: (params.forQuery as BoatSearchBoatsRequest).searchKey,
        ...(params.forQuery as BoatSearchBoatsRequest).pageable,
      },
    });
  }

  /**
   * GetBoatById
   * Responses: 200, 401, 403, 404
   */
  public getBoatById(request: BoatGetBoatByIdRequest) {
    return this.api.request<BoatOutputDTO>({
      url: `${this.baseUrl}/${request.id}`,
      method: 'GET',
    });
  }

  /**
   * DeleteBoatById
   * Responses: 200, 204, 401, 403
   */
  public deleteBoatById(request: BoatDeleteBoatByIdRequest) {
    return this.api.request({
      url: `${this.baseUrl}/${request.id}`,
      method: 'DELETE',
    });
  }

  /**
   * UploadImage
   * Responses: 200, 201, 401, 403, 404
   */
  public uploadImage(request: BoatUploadImageRequest) {
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
  public deleteImage(request: BoatDeleteImageRequest) {
    return this.api.request({
      url: `${this.baseUrl}/${request.id}/images/${request.imageId}`,
      method: 'DELETE',
    });
  }

  /**
   * UploadObject
   * Responses: 200, 201, 401, 403, 404
   */
  public uploadObject(request: BoatUploadObjectRequest) {
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
  public deleteObject(request: BoatDeleteObjectRequest) {
    return this.api.request({
      url: `${this.baseUrl}/${request.id}/objects/${request.objectId}`,
      method: 'DELETE',
    });
  }

  public associateMedia(boatId: number, fileIds: string[]) {
    return this.api.request({
      url: `${this.baseUrl}/${boatId}/associateMedia`,
      method: 'POST',
      data: {
        fileIds,
      },
    });
  }

  public getAssociatedMedia(boatId: number) {
    return this.api.request({
      url: `${this.baseUrl}/${boatId}/associatedMedia`,
      method: 'GET',
    });
  }

  public deleteAssociatedMedia(boatId: number, fileId: string) {
    return this.api.request({
      url: `${this.baseUrl}/${boatId}/associatedMedia${fileId}`,
      method: 'DELETE',
    });
  }
}
