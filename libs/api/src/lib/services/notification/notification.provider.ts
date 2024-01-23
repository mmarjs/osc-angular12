import { Injectable } from '@angular/core';
import { ClientService, Params } from '@ocean/api/client';
import { Notification, NotificationDTO } from '@ocean/api/shared';

import {
  NotificationCreateNotificationRequest,
  NotificationDeleteNotificationRequest,
  NotificationGetNotificationByIdRequest,
  NotificationGetNotificationsByUserIdRequest,
  NotificationGetNotificationsRequest,
  NotificationUpdateNotificationRequest
} from './requests';

@Injectable({
  providedIn: 'root'
})
export class NotificationProvider {
  public constructor(private readonly api: ClientService) {}

  /**
   * GetNotifications
   * Responses: 200, 401, 403, 404
   */
  public getNotifications(request?: NotificationGetNotificationsRequest) {
    const params = new Params(request, [], [], ['pageable']);

    return this.api.request<Array<Notification>>({
      url: `/api/notifications`,
      method: 'GET',
      data: params.forBody
    });
  }

  /**
   * CreateNotification
   * Responses: 200, 201, 401, 403, 404
   */
  public createNotification(request: NotificationCreateNotificationRequest) {
    const params = new Params(request, [], [], ['notificationDTO']);

    return this.api.request({
      url: `/api/notifications`,
      method: 'POST',
      data: params.forBody
    });
  }

  /**
   * UpdateNotification
   * Responses: 200, 201, 401, 403, 404
   */
  public updateNotification(request: NotificationUpdateNotificationRequest) {
    const params = new Params(request, [], [], ['notificationDTO']);

    return this.api.request({
      url: `/api/notifications`,
      method: 'PUT',
      data: params.forBody
    });
  }

  /**
   * GetNotificationsByUserId
   * Responses: 200, 401, 403, 404
   */
  public getNotificationsByUserId(
    request?: NotificationGetNotificationsByUserIdRequest
  ) {
    const params = new Params(request, ['userId'], [], ['pageable']);

    return this.api.request<Array<Notification>>({
      url: `/api/notifications/user/${request.userId}`,
      method: 'GET',
      data: params.forBody
    });
  }

  /**
   * GetNotificationById
   * Responses: 200, 401, 403, 404
   */
  public getNotificationById(request: NotificationGetNotificationByIdRequest) {
    return this.api.request<NotificationDTO>({
      url: `/api/notifications/${request.id}`,
      method: 'GET'
    });
  }

  /**
   * DeleteNotification
   * Responses: 200, 204, 401, 403
   */
  public deleteNotification(request: NotificationDeleteNotificationRequest) {
    return this.api.request<void>({
      url: `/api/notifications/${request.id}`,
      method: 'DELETE'
    });
  }
}
