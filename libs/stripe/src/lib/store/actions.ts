import { createAction, props } from '@ngrx/store';
import {
  DebitCard,
  RawDebitCardData,
} from '@ocean/api/shared/entities/stripe/debit-card';
import {
  BankAccount,
  RawBankAccountData,
} from '@ocean/api/shared/entities/stripe/bank-account';
import { StripeAccount } from '@ocean/api/shared';
import { StripeProviderMethod } from '@ocean/api/services';
import { StripeValidation } from '../helpers/stripe-account-validation';

export const stripeActions = {
  createStripeAccount: createAction(
    '[Stripe] Create / Patch Stripe Account',
    props<{
      account: StripeAccount;
      method: StripeProviderMethod.CREATE | StripeProviderMethod.EDIT;
    }>()
  ),
  createStripeAccountSuccess: createAction(
    '[Stripe] Create / Patch Stripe Account Success',
    props<{ account: StripeAccount }>()
  ),
  createStripeAccountFailure: createAction(
    '[Stripe] Create / Patch Stripe Account Failure'
  ),
  loadAccount: createAction('[Stripe] Load Account'),
  loadAccountSuccessful: createAction(
    '[Stripe] Load Account Successful',
    props<{ account: StripeAccount }>()
  ),
  loadAccountFailure: createAction('[Stripe] Load Account Failure'),
  loadValidationErrors: createAction('[Stripe] Load Validation'),
  loadValidationErrorsSuccess: createAction(
    '[Stripe] Load Validation Success',
    props<{ validation: StripeValidation }>()
  ),
  loadValidationErrorsFailure: createAction('[Stripe] Load Validation Failure'),
  loadCards: createAction('[Stripe] Load Cards'),
  loadCardsSuccess: createAction(
    '[Stripe] Load Cards Success',
    props<{ cards: DebitCard[] }>()
  ),
  loadCardsFailure: createAction('[Stripe] Load Cards Failure'),
  loadBanks: createAction('[Stripe] Load Banks'),
  loadBanksSuccess: createAction(
    '[Stripe] Load Banks Success',
    props<{ banks: BankAccount[] }>()
  ),
  loadBanksFailure: createAction('[Stripe] Load Banks Failure'),
  createDebitCard: createAction(
    '[Stripe] Create Debit Card',
    props<{ debitCard: RawDebitCardData }>()
  ),
  createDebitCardSuccess: createAction('[Stripe] Create Debit Card Success'),
  createDebitCardFailure: createAction('[Stripe] Create Debit Card Failure'),
  createBankAccount: createAction(
    '[Stripe] Create Bank Account',
    props<{ bankAccount: RawBankAccountData }>()
  ),
  createBankAccountSuccess: createAction(
    '[Stripe] Create Bank Account Success'
  ),
  createBankAccountFailure: createAction(
    '[Stripe] Create Bank Account Failure'
  ),
  markDebitCardAsDefault: createAction(
    '[Stripe] Mark Debit Card As Default',
    props<{ id: string }>()
  ),
  markDebitCardAsDefaultSuccessful: createAction(
    '[Stripe] Mark Debit Card As Default Successful'
  ),
  markDebitCardAsDefaultFailure: createAction(
    '[Stripe] Mark Debit Card As Default Failure'
  ),
  markBankAccountAsDefault: createAction(
    '[Stripe] Mark Bank Account As Default',
    props<{ id: string }>()
  ),
  markBankAccountAsDefaultSuccessful: createAction(
    '[Stripe] Mark Bank Account As Default Success'
  ),
  markBankAccountAsDefaultFailure: createAction(
    '[Stripe] Mark Bank Account As Default Failure'
  ),
  deleteDebitCard: createAction(
    '[Stripe] Delete Debit Card',
    props<{ id: string }>()
  ),
  deleteDebitCardSuccessful: createAction(
    '[Stripe] Delete Debit Card Successful'
  ),
  deleteDebitCardFailure: createAction('[Stripe] Delete Debit Card Failure'),
  deleteBankAccount: createAction(
    '[Stripe] Delete Bank Account',
    props<{ id: string }>()
  ),
  deleteBankAccountSuccessful: createAction(
    '[Stripe] Delete Bank Account Success'
  ),
  deleteBankAccountFailure: createAction(
    '[Stripe] Delete Bank Account Failure'
  ),
};
