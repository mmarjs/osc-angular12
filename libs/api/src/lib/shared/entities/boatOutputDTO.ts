/**
 * BoatOutputDTO
 */

import { StoredObjectDescriptorDTO } from './storedObjectDescriptorDTO';

export interface BoatOutputDTO {
  about?: string;
  address?: string;
  address2?: string;
  city?: string;
  id?: number;
  type?: string;
  length?: string;
  images?: Array<StoredObjectDescriptorDTO>;
  makeModelYear?: string;
  name?: string;
  state?: string;
  zipCode?: string;
  flag?: string;
  loa?: string;
  beam?: string;
  draft?: string;
  displacement?: string;
  hullId?: string;
  electricalRequirements?: string;
  boatClass?: string;
  insuranceNumber?: string;
  damage?: string;
  country?: string;
}
