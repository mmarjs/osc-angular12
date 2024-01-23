/**
 * Notification
 */

import { LocalDate } from './localDate';

export interface Notification {
  date?: LocalDate;
  description?: string;
  id?: number;
  title?: string;
  userId?: number;
}
