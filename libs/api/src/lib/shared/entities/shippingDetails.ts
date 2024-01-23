/**
 * ShippingDetails
 */

import { Address } from './address';

export interface ShippingDetails {
  address?: Address;
  name?: string;
  phone?: string;
}
