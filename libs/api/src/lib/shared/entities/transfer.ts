/**
 * Transfer
 */

import { BankAccount } from './bankAccount';
import { Summary } from './summary';
import { TransferReversalCollection } from './transferReversalCollection';

export interface Transfer {
  account?: BankAccount;
  amount?: number;
  amountReversed?: number;
  applicationFee?: string;
  balanceTransaction?: string;
  bankAccount?: BankAccount;
  created?: number;
  currency?: string;
  date?: number;
  description?: string;
  destination?: string;
  destinationPayment?: string;
  failureCode?: string;
  failureMessage?: string;
  id?: string;
  livemode?: boolean;
  metadata?: any;
  object?: string;
  otherTransfers?: Array<string>;
  recipient?: string;
  reversals?: TransferReversalCollection;
  reversed?: boolean;
  sourceTransaction?: string;
  sourceType?: string;
  statementDescription?: string;
  statementDescriptor?: string;
  status?: string;
  summary?: Summary;
  transferGroup?: string;
  type?: string;
}
