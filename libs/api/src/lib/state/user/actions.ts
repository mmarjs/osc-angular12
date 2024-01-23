import { createAction, props } from '@ngrx/store';
import {
  ApiError,
  EditUserPayment,
  PaymentMethod,
  PaymentSetUpIntent,
  PaymentSetUpIntentFailure,
  User,
  UserInputDTO,
  UserTypeTitle,
  UserUpdateDTO
} from '@ocean/api/shared';
import { Auth0DecodedHash } from 'auth0-js';

export const UserActions = {
  tokenLoaded: createAction('[User] Token Loaded', props<{ hash: Auth0DecodedHash }>()),
  signUpUser: createAction('[User] Sign Up', props<{ user: UserInputDTO }>()),
  logoutUser: createAction('[User] Logout'),
  reauth: createAction('[User] Re-authentication'),

  switchAccount: createAction('[User] Switch Account', props<{ title: UserTypeTitle }>()),

  updateUserAvatar: createAction('[User] Update Avatar', props<{ file: File }>()),

  resetPaymentId: createAction('[User] Reset Payment Id'),

  openEditPaymentMethodModal: createAction('[User] Open Edit Payment Method Modal'),

  loginUser: createAction('[User] Login'),
  loginUserSuccess: createAction('[User] Login Success', props<{ user: User }>()),
  loginUserFailure: createAction('[User] Login Failure', props<{ error?: ApiError }>()),

  updateUser: createAction('[User] Update', props<{ user: UserUpdateDTO }>()),
  updateUserSuccess: createAction('[User] Update Success', props<{ user: Partial<User> }>()),
  updateUserFailure: createAction('[User] Update Failure', props<{ error?: Error }>()),

  setUpIntent: createAction('[User] Set Up Intent'),
  setUpIntentSuccess: createAction('[User] Set Up Intent Success', props<{ payment: PaymentSetUpIntent }>()),
  setUpIntentFailure: createAction('[User] Set Up Intent Failure', props<{ payment: PaymentSetUpIntentFailure }>()),

  getUserCards: createAction('[User] Get User Cards'),
  getUserCardsSuccess: createAction('[User] Get User Cards Success', props<{ paymentMethods: PaymentMethod[] }>()),
  getUserCardsFailure: createAction('[User] Get User Cards Failure', props<{ error?: Error }>()),

  deletePaymentMethod: createAction('[User] Delete Payment Method', props<{ id: number }>()),
  deletePaymentMethodSuccess: createAction('[User] Delete Payment Method Success', props<{ id: number }>()),
  deletePaymentMethodFailure: createAction('[User] Delete Payment Method Failure', props<{ error?: Error }>()),

  editPaymentMethod: createAction('[User] Edit Payment Method', props<{ edit: EditUserPayment }>()),
  editPaymentMethodSuccess: createAction('[User] Edit Payment Method Success'),
  editPaymentMethodFailure: createAction('[User] Edit Payment Method Failure', props<{ error?: Error }>()),
};
