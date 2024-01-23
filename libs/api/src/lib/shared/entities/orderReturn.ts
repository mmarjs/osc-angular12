/**
 * OrderReturn
 */

import { OrderItem } from './orderItem';

export interface OrderReturn {
  amount?: number;
  created?: number;
  currency?: string;
  id?: string;
  items?: Array<OrderItem>;
  livemode?: boolean;
  object?: string;
  order?: string;
  refund?: string;
}
