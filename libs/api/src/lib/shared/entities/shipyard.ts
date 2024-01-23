/**
 * Shipyard
 */

import { StoredObjectDescriptor } from './storedObjectDescriptor';

export interface Shipyard {
  about?: string;
  address?: string;
  address2?: string;
  businessEmail?: string;
  city?: string;
  id?: number;
  name?: string;
  objects?: StoredObjectDescriptor;
  phone?: string;
  state?: string;
  website?: string;
  zipCode?: string;
}
