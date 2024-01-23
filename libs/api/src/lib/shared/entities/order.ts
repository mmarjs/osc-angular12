/**
 * Order
 */

import { Customer } from './customer';
import { OrderItem } from './orderItem';
import { OrderReturnCollection } from './orderReturnCollection';
import { ShippingDetails } from './shippingDetails';
import { ShippingMethod } from './shippingMethod';
import { StatusTransitions } from './statusTransitions';

export interface Order {
  amount?: number;
  amountReturned?: number;
  application?: string;
  applicationFee?: number;
  charge?: string;
  created?: number;
  currency?: string;
  customer?: string;
  customerObject?: Customer;
  email?: string;
  externalCouponCode?: string;
  id?: string;
  items?: Array<OrderItem>;
  livemode?: boolean;
  metadata?: any;
  object?: string;
  returns?: OrderReturnCollection;
  selectedShippingMethod?: string;
  shipping?: ShippingDetails;
  shippingMethods?: Array<ShippingMethod>;
  status?: string;
  statusTransitions?: StatusTransitions;
  updated?: number;
  upstreamId?: string;
}
