import { MediaResponse } from '@ocean/api/client';
import { StoredObjectDescriptorDTO } from '.';
import { Job } from './job';
import { StoredObjectDescriptor } from './storedObjectDescriptor';

export interface Boat {
  about?: string;
  address?: string;
  address2?: string;
  city?: string;
  id?: number;
  jobs?: Array<Job>;
  makeModelYear?: string;
  name?: string;
  objects?: StoredObjectDescriptor;
  state?: string;
  zipCode?: string;
  images?: StoredObjectDescriptorDTO[];
  imageTransforms?: MediaResponse[];
  type?: string;
  length?: string;
  country?: string;
  hullId?: string,
}
