/**
 * Account
 */

import { AccountDeclineChargeOn } from './accountDeclineChargeOn';
import { AccountTosAcceptance } from './accountTosAcceptance';
import { AccountTransferSchedule } from './accountTransferSchedule';
import { ExternalAccountCollection } from './externalAccountCollection';
import { Keys } from './keys';
import { LegalEntity } from './legalEntity';
import { Verification } from './verification';

export interface Account {
  businessLogo?: string;
  businessName?: string;
  businessPrimaryColor?: string;
  businessURL?: string;
  chargesEnabled?: boolean;
  country?: string;
  currenciesSupported?: Array<string>;
  debitNegativeBalances?: boolean;
  declineChargeOn?: AccountDeclineChargeOn;
  defaultCurrency?: string;
  detailsSubmitted?: boolean;
  displayName?: string;
  email?: string;
  externalAccounts?: ExternalAccountCollection;
  id?: string;
  keys?: Keys;
  legalEntity?: LegalEntity;
  managed?: boolean;
  metadata?: any;
  object?: string;
  productDescription?: string;
  statementDescriptor?: string;
  supportEmail?: string;
  supportPhone?: string;
  supportURL?: string;
  timezone?: string;
  tosAcceptance?: AccountTosAcceptance;
  transferSchedule?: AccountTransferSchedule;
  transfersEnabled?: boolean;
  verification?: Verification;
}
