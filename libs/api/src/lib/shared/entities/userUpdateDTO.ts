/**
 * UserUpdateDTO
 */

import { SecurityOptions } from './surveyorOutputDTO';

export interface UserUpdateDTO {
  firstName?: string;
  langKey?: string;
  lastName?: string;
  phoneNumber?: string;
  address?: string;
  cell?: number;
  dob?: Date;
  driverLicense?: string;
  passportNumber?: string;
  representativeName?: string;
  representativeContact?: string;
  dockageFee?: number;
  utilityFee?: number;
  garbageFee?: number;
  ampServiceFee?: number;
  security?: SecurityOptions;
  arbitrationLocation?: string;
  warrantyDays?: number;
  surveyorFee?: number;
}

export type UserPatchDTO = {
  [K in keyof UserUpdateDTO]: UserUpdateDTO[K]
};
