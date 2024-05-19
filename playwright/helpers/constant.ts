export class Constant {
  public static readonly resourcePath = 'resources/';
  public static readonly defaultPassword = 'Abcd1234!';
  public static readonly longWaitElementVisible = 50 * 1000;
}

export type UserInfo = {
  firstName: string;
  lastName: string;
  userName: string;
  emailAddress: string;
  password: string;
}

export type ShipyardInfo = {
  name: string;
  shipyardAddress1: string;
  shipyardAddress2: string;
  country: string;
  state: string;
  city: string;
  address: string;
  zipCode: string;
  phone: string;
  businessEmail: string
}

export type SurveyorInfo = {
  businessName: string;
  country: string;
  surveyingOfficeAddress1: string;
  surveyingOfficeAddress2: string;
  state: string;
  city: string;
  address: string;
  zipCode: string;
  phone: string;
  businessEmail: string
}

export type BoatInfo = {
  deviceName: string;
  yearOfBoat: string;
  lengthOfBoat: string;
  typeOfBoat: string;
  hullID: string;
  about: string;
  country: string;
  state: string;
  city: string;
  address: string;
  zipCode: string;
  phone: string;
}
