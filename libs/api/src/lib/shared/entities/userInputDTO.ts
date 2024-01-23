/**
 * UserInputDTO
 */

import { Boat } from './boat';
import { Shipyard } from './shipyard';
import { Surveyor } from './surveyor';
import { SecurityOptions } from './surveyorOutputDTO';
import { UserType } from './userType';

export interface UserInputDTO {
  boatDetails?: Boat;
  email: string;
  firstName?: string;
  langKey?: string;
  lastName?: string;
  login: string;
  password: string;
  phoneNo?: string;
  shipyardDetails?: Shipyard;
  surveyorDetails?: Surveyor;
  userTypes?: Array<UserType>;
  address?:string;
  cell?:number;
  dob?:Date;
  driverLicense?:string;
  passportNumber?:string;
  representativeName?:string;
  representativeContact?:string;
  dockageFee?:number;
  utilityFee?:number;
  garbageFee?:number;
  ampServiceFee?:number;
  security?:SecurityOptions;
  arbitrationLocation?:string;
  warrantyDays?:string;
  surveyorFee?:number;
}
