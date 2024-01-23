/**
 * Invoice
 */

import { Discount } from './discount';
import { InvoiceLineItemCollection } from './invoiceLineItemCollection';

export interface Invoice {
  amountDue?: number;
  applicationFee?: number;
  attemptCount?: number;
  attempted?: boolean;
  billing?: string;
  charge?: string;
  closed?: boolean;
  created?: number;
  currency?: string;
  customer?: string;
  date?: number;
  description?: string;
  discount?: Discount;
  dueDate?: number;
  endingBalance?: number;
  forgiven?: boolean;
  id?: string;
  lines?: InvoiceLineItemCollection;
  livemode?: boolean;
  metadata?: any;
  nextPaymentAttempt?: number;
  number?: string;
  object?: string;
  paid?: boolean;
  periodEnd?: number;
  periodStart?: number;
  receiptNumber?: string;
  startingBalance?: number;
  statementDescriptor?: string;
  subscription?: string;
  subscriptionProrationDate?: number;
  subtotal?: number;
  tax?: number;
  taxPercent?: number;
  total?: number;
  webhooksDeliveredAt?: number;
}
