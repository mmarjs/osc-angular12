/**
 * InvoiceLineItem
 */

import { InvoiceLineItemPeriod } from './invoiceLineItemPeriod';
import { Plan } from './plan';

export interface InvoiceLineItem {
  amount?: number;
  currency?: string;
  description?: string;
  discountable?: boolean;
  id?: string;
  livemode?: boolean;
  metadata?: any;
  object?: string;
  period?: InvoiceLineItemPeriod;
  plan?: Plan;
  proration?: boolean;
  quantity?: number;
  subscription?: string;
  type?: string;
}
