/**
 * Bid
 */

import { DurationUnit } from '.';
import { BidItem } from './bidItem';
import { JobDTO } from './jobDTO';

export interface Bid {
  bidAmount?: number;
  bidItems?: Array<BidItem>;
  description?: string;
  id?: number;
  minBid?: number;
  status?: BidStatus;
  approximateDuration?: number;
  autoBid?: boolean;
  bidderLocation?: string;
  bidderName?: string;
  durationUnit?: DurationUnit;
  jobId?: number;
  job?: JobDTO;
  startDeposit?: number;
  workStartDate?: string;
  address?: string;
  address2?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  country?: string;
  awayFromProvidersYard?: boolean;
  yardOwner?: string;
  paymentItemDTO?: {
    paymentIntentId: string;
    eventType: PaymentEvent;
    amount: Number;
    fee: Number;
  };
}

export const TAX = 6;

export enum BidStatus {
  IN_REVIEW = 'IN_REVIEW',
  ACCEPTED = 'ACCEPTED',
  REJECTED = 'REJECTED',
  NA = 'NA',
  LOST = 'LOST',
}

export enum PaymentEvent {
  SUCCEEDED = 'payment_intent.succeeded',
  FAILED = 'payment_intent.payment_failed',
}
