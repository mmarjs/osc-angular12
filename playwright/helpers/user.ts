import { faker } from '@faker-js/faker';
import { Constant } from './constant';
import mail from './mail';

export type UserType = 'surveyor' | 'shipyard' | 'boatOwner';

export interface UserLoginInfo {
  email: string;
  password: string;
  login: string;
}

const map = new Map<UserType, UserLoginInfo>();

export function saveLoginInfo(type: UserType, info: UserLoginInfo) {
  map.set(type, info);
}

export function getLoginInfo(type: UserType) {
  return map.get(type);
}


export function generateUserInfo() {
  return {
    emailAddress: mail.getEmail(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    userName: faker.lorem.word(6) + faker.datatype.number(100),
    password: Constant.defaultPassword,
  };
}

export function generateSurveyorInfo() {
  return {
    businessName: 'Surveyor',
    surveyingOfficeAddress1: '',
    surveyingOfficeAddress2: '',
    country: 'United States of America - USA',
    state: 'California',
    city: 'United State',
    address: '123 Abc',
    zipCode: '95697',
    phone: '+1 201-555-0123',
    businessEmail: 'surveyor@team764000.testinator.com',
  };
}

export function generateShipyardInfo() {
  return {
    name: 'shipyard',
    shipyardAddress1: '',
    shipyardAddress2: '',
    country: 'United States of America - USA',
    state: 'California',
    city: 'United State',
    address: '123 Abc',
    zipCode: '95697',
    phone: '+1 201-555-0123',
    businessEmail: 'shipyard@team764000.testinator.com',
  };
}
