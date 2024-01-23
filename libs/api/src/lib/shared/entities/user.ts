/**
 * User
 */

import { Bid } from './bid';
import { Boat } from './boat';
import { Job } from './job';
import { Notification } from './notification';
import { Shipyard } from './shipyard';
import { StoredObjectDescriptor } from './storedObjectDescriptor';
import { StripeAccount } from './stripe/stripeAccount';
import { Surveyor } from './surveyor';
import { SecurityOptions } from './surveyorOutputDTO';
import { UserType } from './userType';

export interface User {
  authId?: string;
  bids?: Array<Bid>;
  boats?: Array<Boat>;
  chargeAccount?: StripeAccount;
  chargeAccounts?: Array<StripeAccount>;
  email?: string;
  firstName?: string;
  id?: number;
  jobs?: Array<Job>;
  langKey?: string;
  lastName?: string;
  login?: string;
  notifications?: Array<Notification>;
  objects?: StoredObjectDescriptor;
  payoutAccount?: StripeAccount;
  payoutAccounts?: Array<StripeAccount>;
  phoneNo?: string;
  reviews?: any;
  shipyards?: Array<Shipyard>;
  surveyors?: Array<Surveyor>;
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
  warrantyDays?:number;
  surveyorFee?:number;
}
