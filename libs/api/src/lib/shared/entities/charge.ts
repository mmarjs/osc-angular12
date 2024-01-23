/**
 * Charge
 */

import { Account } from './account';
import { Application } from './application';
import { ApplicationFee } from './applicationFee';
import { BalanceTransaction } from './balanceTransaction';
import { Card } from './card';
import { ChargeOutcome } from './chargeOutcome';
import { ChargeRefundCollection } from './chargeRefundCollection';
import { Customer } from './customer';
import { Dispute } from './dispute';
import { ExternalAccount } from './externalAccount';
import { FraudDetails } from './fraudDetails';
import { Invoice } from './invoice';
import { Order } from './order';
import { ShippingDetails } from './shippingDetails';
import { Transfer } from './transfer';

export interface Charge {
  amount?: number;
  amountRefunded?: number;
  application?: string;
  applicationFee?: string;
  applicationFeeObject?: ApplicationFee;
  applicationObject?: Application;
  balanceTransaction?: string;
  balanceTransactionObject?: BalanceTransaction;
  captured?: boolean;
  card?: Card;
  created?: number;
  currency?: string;
  customer?: string;
  customerObject?: Customer;
  description?: string;
  destination?: string;
  destinationObject?: Account;
  dispute?: string;
  disputeObject?: Dispute;
  disputed?: boolean;
  failureCode?: string;
  failureMessage?: string;
  fraudDetails?: FraudDetails;
  id?: string;
  invoice?: string;
  invoiceObject?: Invoice;
  livemode?: boolean;
  metadata?: any;
  object?: string;
  order?: string;
  orderObject?: Order;
  outcome?: ChargeOutcome;
  paid?: boolean;
  receiptEmail?: string;
  receiptNumber?: string;
  refunded?: boolean;
  refunds?: ChargeRefundCollection;
  review?: string;
  reviewObject?: any;
  shipping?: ShippingDetails;
  source?: ExternalAccount;
  sourceTransfer?: string;
  sourceTransferObject?: Transfer;
  statementDescription?: string;
  statementDescriptor?: string;
  status?: string;
  transfer?: string;
  transferGroup?: string;
  transferObject?: Transfer;
}
