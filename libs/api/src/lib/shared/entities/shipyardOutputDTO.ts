/**
 * ShipyardOutputDTO
 */

import { StoredObjectDescriptorDTO } from './storedObjectDescriptorDTO';

export interface ShipyardOutputDTO {
  about?: string;
  address: string;
  address2?: string;
  businessEmail?: string;
  city?: string;
  id?: number;
  images?: Array<StoredObjectDescriptorDTO>;
  name: string;
  phone: string;
  state?: string;
  website?: string;
  zipCode?: string;
}
