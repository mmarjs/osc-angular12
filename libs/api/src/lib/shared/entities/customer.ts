/**
 * Customer
 */

import { CustomerCardCollection } from './customerCardCollection';
import { CustomerSubscriptionCollection } from './customerSubscriptionCollection';
import { Discount } from './discount';
import { ExternalAccountCollection } from './externalAccountCollection';
import { NextRecurringCharge } from './nextRecurringCharge';
import { ShippingDetails } from './shippingDetails';
import { Subscription } from './subscription';

export interface Customer {
  accountBalance?: number;
  businessVatId?: string;
  cards?: CustomerCardCollection;
  created?: number;
  currency?: string;
  defaultCard?: string;
  defaultSource?: string;
  deleted?: boolean;
  delinquent?: boolean;
  description?: string;
  discount?: Discount;
  email?: string;
  id?: string;
  livemode?: boolean;
  metadata?: any;
  nextRecurringCharge?: NextRecurringCharge;
  object?: string;
  shipping?: ShippingDetails;
  sources?: ExternalAccountCollection;
  subscription?: Subscription;
  subscriptions?: CustomerSubscriptionCollection;
  trialEnd?: number;
}
