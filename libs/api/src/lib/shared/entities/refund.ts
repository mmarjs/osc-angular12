/**
 * Refund
 */

export interface Refund {
  amount?: number;
  balanceTransaction?: string;
  charge?: string;
  created?: number;
  currency?: string;
  description?: string;
  id?: string;
  metadata?: any;
  object?: string;
  reason?: string;
  receiptNumber?: string;
  status?: string;
}
