/**
 * Surveyor
 */

import { StoredObjectDescriptor } from './storedObjectDescriptor';

export interface Surveyor {
  about: string;
  address: string;
  address2: string;
  city: string;
  id: number;
  name: string;
  objects?: StoredObjectDescriptor;
  state: string;
  zipCode: string;
}
