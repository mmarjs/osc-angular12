/**
 * Card
 */

export interface Card {
  account?: string;
  addressCity?: string;
  addressCountry?: string;
  addressLine1?: string;
  addressLine1Check?: string;
  addressLine2?: string;
  addressState?: string;
  addressZip?: string;
  addressZipCheck?: string;
  brand?: string;
  country?: string;
  currency?: string;
  customer?: string;
  cvcCheck?: string;
  defaultForCurrency?: boolean;
  description?: string;
  dynamicLast4?: string;
  expMonth?: number;
  expYear?: number;
  fingerprint?: string;
  funding?: string;
  id?: string;
  iin?: string;
  instanceURL?: string;
  issuer?: string;
  last4?: string;
  metadata?: any;
  name?: string;
  object?: string;
  recipient?: string;
  status?: string;
  tokenizationMethod?: string;
  type?: string;
}
