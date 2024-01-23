/**
 * SubscriptionItem
 */

import { Plan } from './plan';

export interface SubscriptionItem {
  created?: number;
  id?: string;
  object?: string;
  plan?: Plan;
  quantity?: number;
}
