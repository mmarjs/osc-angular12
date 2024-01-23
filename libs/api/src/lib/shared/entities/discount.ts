/**
 * Discount
 */

import { Coupon } from './coupon';

export interface Discount {
  coupon?: Coupon;
  customer?: string;
  end?: number;
  id?: string;
  object?: string;
  start?: number;
  subscription?: string;
}
