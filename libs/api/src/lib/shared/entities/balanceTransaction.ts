/**
 * BalanceTransaction
 */

import { Fee } from './fee';
import { TransferCollection } from './transferCollection';

export interface BalanceTransaction {
  amount?: number;
  availableOn?: number;
  created?: number;
  currency?: string;
  description?: string;
  fee?: number;
  feeDetails?: Array<Fee>;
  id?: string;
  net?: number;
  object?: string;
  source?: string;
  sourcedTransfers?: TransferCollection;
  status?: string;
  type?: string;
}
