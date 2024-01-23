/**
 * Coupon
 */

export interface Coupon {
  amountOff?: number;
  created?: number;
  currency?: string;
  duration?: string;
  durationInMonths?: number;
  id?: string;
  livemode?: boolean;
  maxRedemptions?: number;
  metadata?: any;
  object?: string;
  percentOff?: number;
  redeemBy?: number;
  timesRedeemed?: number;
  valid?: boolean;
}
