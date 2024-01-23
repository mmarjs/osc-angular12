/**
 * SurveyorOutputDTO
 */

import { StoredObjectDescriptorDTO } from './storedObjectDescriptorDTO';

export interface SurveyorOutputDTO {
  about?: string;
  address?: string;
  address2?: string;
  city?: string;
  id?: number;
  images?: Array<StoredObjectDescriptorDTO>;
  name?: string;
  state?: string;
  zipCode?: string;
}

export enum SecurityOptions{
    PART_TIME = 'PART_TIME',
    FULL_TIME = 'FULL_TIME',
}