/**
 * Owner
 */

import { Address } from './address';
import { DateOfBirth } from './dateOfBirth';
import { Verification } from './verification';

export interface Owner {
  address?: Address;
  dob?: DateOfBirth;
  firstName?: string;
  lastName?: string;
  verification?: Verification;
}
