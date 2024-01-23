/**
 * NotificationGetNotificationsByUserIdRequest
 */

import { Pageable } from '@ocean/api/shared';

export interface NotificationGetNotificationsByUserIdRequest {
  pageable?: Pageable;
  userId: number;
}
