/**
 * LegalEntity
 */

import { Address } from './address';
import { DateOfBirth } from './dateOfBirth';
import { Owner } from './owner';
import { Verification } from './verification';

export interface LegalEntity {
  additionalOwners?: Array<Owner>;
  address?: Address;
  businessName?: string;
  businessTaxIdProvided?: boolean;
  dob?: DateOfBirth;
  firstName?: string;
  lastName?: string;
  personalAddress?: Address;
  personalIdNumberProvided?: boolean;
  ssnLast4Provided?: boolean;
  type?: string;
  verification?: Verification;
}
