/**
 * Subscription
 */

import { Discount } from './discount';
import { Plan } from './plan';
import { SubscriptionItemCollection } from './subscriptionItemCollection';

export interface Subscription {
  applicationFeePercent?: number;
  billing?: string;
  cancelAtPeriodEnd?: boolean;
  canceledAt?: number;
  created?: number;
  currentPeriodEnd?: number;
  currentPeriodStart?: number;
  customer?: string;
  daysUntilDue?: number;
  discount?: Discount;
  endedAt?: number;
  id?: string;
  metadata?: any;
  object?: string;
  plan?: Plan;
  quantity?: number;
  start?: number;
  status?: string;
  subscriptionItems?: SubscriptionItemCollection;
  taxPercent?: number;
  trialEnd?: number;
  trialStart?: number;
}
