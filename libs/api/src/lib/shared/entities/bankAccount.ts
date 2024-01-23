/**
 * BankAccount
 */

export interface BankAccount {
  account?: string;
  accountHolderName?: string;
  accountHolderType?: string;
  bankName?: string;
  country?: string;
  currency?: string;
  customer?: string;
  defaultForCurrency?: boolean;
  fingerprint?: string;
  id?: string;
  instanceURL?: string;
  last4?: string;
  metadata?: any;
  object?: string;
  routingNumber?: string;
  status?: string;
  validated?: boolean;
}
