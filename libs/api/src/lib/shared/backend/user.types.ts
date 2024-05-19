import { UserType } from '../entities';

/**
 * Types
 */

export type UserTypeId = '0' | '1' | '2' | '3';

export type UserTypeTitle = 'ADMIN' | 'BOAT_OWNER' | 'SHIPYARD' | 'SURVEYOR';

export interface EditUserPayment {
  dbPaymentId: number;
  editedYearAndMonth: EditPaymentMethod;
}

export interface EditPaymentMethod {
  expMonth: number,
  expYear: number
}

export interface PaymentSetUpIntent {
  clientSecret: string,
  setupIntentId: string
}

export interface PaymentSetUpIntentFailure {
  error: string
}

export interface PaymentMethod {
  details: string,
  id: number,
  stripeMethodId: string,
  type: string
}

export interface EditPayment {
  paymentMethodId: string
}

// independency layer of the backend values

export enum UserTypeTitles {
  ADMIN = 'ADMIN',
  BOAT_OWNER = 'BOAT_OWNER',
  SHIPYARD = 'SHIPYARD',
  SURVEYOR = 'SURVEYOR'
}

/**
 * Variables
 */

export const userTypes = ['ADMIN', 'BOAT_OWNER', 'SHIPYARD', 'SURVEYOR'] as const;

export function getUserTypes(withAdmin = false): Array<UserType> {
  return userTypes
    .map((type, id) => ({
      id,
      type
    }))
    .filter(v => v.type !== 'ADMIN' || withAdmin);
}

export function getUserType(type: UserTypeTitles): UserType | null {
  if (!type || !userTypes.includes(type)) {
    return null;
  }

  return {
    id: userTypes.indexOf(type),
    type
  };
}

/**
 * Utility definitions
 */
export const coreUserFields = [
  'authId',
  'id',
  'firstName',
  'lastName',
  'phoneNo',
  'email',
  'login',
  'address',
  'cell',
  'dob',
  'driverLicense',
  'passportNumber',
  'representativeName',
  'representativeContact',
  'dockageFee',
  'utilityFee',
  'garbageFee',
  'ampServiceFee',
  'security',
  'arbitrationLocation',
  'warrantyDays',
  'surveyorFee'
];
