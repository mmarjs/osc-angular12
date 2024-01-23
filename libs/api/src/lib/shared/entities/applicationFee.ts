/**
 * ApplicationFee
 */

import { FeeRefundCollection } from './feeRefundCollection';

export interface ApplicationFee {
  account?: string;
  amount?: number;
  amountRefunded?: number;
  application?: string;
  balanceTransaction?: string;
  charge?: string;
  created?: number;
  currency?: string;
  id?: string;
  livemode?: boolean;
  object?: string;
  originatingTransaction?: string;
  refunded?: boolean;
  refunds?: FeeRefundCollection;
  user?: string;
}
