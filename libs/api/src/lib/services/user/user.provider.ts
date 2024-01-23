import { Injectable } from '@angular/core';
import { ClientService, Params } from '@ocean/api/client';
import {
  EditPaymentMethod,
  LogoutUrlDTO,
  StoredObjectDescriptorDTO,
  User
} from '@ocean/api/shared';

import {
  UserChangePasswordRequest,
  UserDeleteImageRequest,
  UserDeleteObjectRequest,
  UserLoginRequest,
  UserRegisterAccountRequest,
  UserUpdateUserRequest,
  UserUploadImageRequest,
  UserUploadObjectRequest
} from './requests';

@Injectable({
  providedIn: 'root'
})
export class UserProvider {
  public constructor(private readonly api: ClientService) { }

  /**
   * UpdateUser
   * Responses: 200, 201, 204, 401, 403, 404
   */
  public updateUser(request: UserUpdateUserRequest) {
    const params = new Params(request, [], [], ['userDTO']);

    return this.api.request({
      url: `/api/users`,
      method: 'PUT',
      data: params.forBody
    });
  }

  public updateUserAvatar({ file }: { file: File }) {
    const formData = new FormData();
    formData.append('file', file);
    return this.api.request({
      url: `/api/users/avatar`,
      method: 'POST',
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  }

  /**
   * IsAuthenticated
   * Responses: 200, 401, 403, 404
   */
  public isAuthenticated() {
    return this.api.request<string>({
      url: `/api/users/authenticate`,
      method: 'GET'
    });
  }

  /**
   * ChangePassword
   * Responses: 200, 201, 401, 403, 404
   */
  public changePassword(request: UserChangePasswordRequest) {
    const params = new Params(request, [], [], ['password']);

    return this.api.request({
      url: `/api/users/change-password`,
      method: 'POST',
      data: params.forBody
    });
  }

  /**
   * GetCurrentUser
   * Responses: 200, 401, 403, 404
   */
  public getCurrentUser() {
    return this.api.request<User>({
      url: `/api/users/current`,
      method: 'GET'
    });
  }

  /**
   * Login
   * Responses: 200, 201, 401, 403, 404
   */
  public login(request: UserLoginRequest) {
    const params = new Params(request, [], [], ['userFormDTO']);

    return this.api.request({
      url: `/api/users/login`,
      method: 'POST',
      data: params.forBody
    });
  }

  /**
   * GetLogOutUrl
   * Responses: 200, 401, 403, 404
   */
  public getLogOutUrl() {
    return this.api.request<LogoutUrlDTO>({
      url: `/api/users/logout-url`,
      method: 'GET'
    });
  }

  /**
   * RegisterAccount
   * Responses: 200, 201, 400, 401, 403, 404
   */
  public registerAccount(request: UserRegisterAccountRequest) {
    const params = new Params(request, [], [], ['userInputDTO']);

    return this.api.request({
      url: `/api/users/register`,
      method: 'POST',
      data: params.forBody
    });
  }

  /**
   * UploadImage
   * Responses: 200, 201, 401, 403, 404
   */
  public uploadImage(request: UserUploadImageRequest) {
    const params = new Params(request, ['id'], [], ['file']);

    return this.api.request<StoredObjectDescriptorDTO>({
      url: `/api/users/${request.id}/images`,
      method: 'POST',
      data: params.forBody
    });
  }

  /**
   * DeleteImage
   * Responses: 200, 204, 401, 403
   */
  public deleteImage(request: UserDeleteImageRequest) {
    return this.api.request({
      url: `/api/users/${request.id}/images/${request.imageId}`,
      method: 'DELETE'
    });
  }

  /**
   * UploadObject
   * Responses: 200, 201, 401, 403, 404
   */
  public uploadObject(request: UserUploadObjectRequest) {
    const params = new Params(request, ['id'], [], ['file']);

    return this.api.request<StoredObjectDescriptorDTO>({
      url: `/api/users/${request.id}/objects`,
      method: 'POST',
      data: params.forBody
    });
  }

  /**
   * DeleteObject
   * Responses: 200, 204, 401, 403
   */
  public deleteObject(request: UserDeleteObjectRequest) {
    return this.api.request({
      url: `/api/users/${request.id}/objects/${request.objectId}`,
      method: 'DELETE'
    });
  }

  public setUpIntent() {
    return this.api.request({
      url: `/api/payment_methods/setup_intent`,
      method: 'POST'
    });
  }

  public getSavedCards() {
    return this.api.request({
      url: `/api/payment_methods/`,
      method: 'GET'
    });
  }

  public deletePaymentMethod(dbPaymentId: number) {
    return this.api.request({
      url: `/api/payment_methods/${dbPaymentId}`,
      method: 'DELETE',
    });
  }

  public editPaymentMethod(dbPaymentId: number, editedYearandMonth: EditPaymentMethod) {
    return this.api.request({
      url: `/api/payment_methods/${dbPaymentId}`,
      method: 'PUT',
      data: editedYearandMonth
    });
  }

}
