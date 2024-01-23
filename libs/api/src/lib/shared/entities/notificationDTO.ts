/**
 * NotificationDTO
 */

import { LocalDate } from './localDate';

export interface NotificationDTO {
  date?: LocalDate;
  description?: string;
  id?: number;
  title?: string;
  userId?: number;
}
