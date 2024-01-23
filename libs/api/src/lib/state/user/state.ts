import { PaymentMethod, PaymentSetUpIntent, User, UserTypeTitle } from '@ocean/api/shared';

export const KEY = 'user';

/**
 * State
 */
export interface AuthToken {
  // appState: string;
  // state: string;
  tokenType: string;
  accessToken: string;
  expiresIn: number;
  scope: string;
}

export interface State {
  loggedIn: boolean;
  // partial only to match Auth0 interface
  token?: Partial<AuthToken>;
  // user profile
  user?: User;
  userType?: UserTypeTitle;
  isUpdating?: boolean;
  paymentIntent?:PaymentSetUpIntent;
  savedCards?:PaymentMethod[];
  paymentId?:string;
  isLoading?: boolean;
  paymentMethodError?:boolean
}

export const initialState: State = {
  loggedIn: false,
};
