/**
 * Plan
 */

export interface Plan {
  amount?: number;
  created?: number;
  currency?: string;
  id?: string;
  interval?: string;
  intervalCount?: number;
  livemode?: boolean;
  metadata?: any;
  name?: string;
  object?: string;
  statementDescription?: string;
  statementDescriptor?: string;
  trialPeriodDays?: number;
}
