/**
 * Dispute
 */

import { BalanceTransaction } from './balanceTransaction';
import { EvidenceDetails } from './evidenceDetails';
import { EvidenceSubObject } from './evidenceSubObject';

export interface Dispute {
  amount?: number;
  balanceTransaction?: string;
  balanceTransactions?: Array<BalanceTransaction>;
  charge?: string;
  created?: number;
  currency?: string;
  evidence?: string;
  evidenceDetails?: EvidenceDetails;
  evidenceDueBy?: number;
  evidenceSubObject?: EvidenceSubObject;
  id?: string;
  isChargeRefundable?: boolean;
  livemode?: boolean;
  metadata?: any;
  networkReasonCode?: string;
  object?: string;
  reason?: string;
  status?: string;
}
