import { createReducer, on } from '@ngrx/store';
import { initialState } from './state';
import { stripeActions } from './actions';

export const stripeReducer = createReducer(
  initialState,
  on(
    stripeActions.loadAccount,
    stripeActions.loadValidationErrors,
    stripeActions.loadCards,
    stripeActions.loadBanks,
    stripeActions.createStripeAccount,
    stripeActions.createDebitCard,
    stripeActions.createBankAccount,
    stripeActions.markBankAccountAsDefault,
    stripeActions.markDebitCardAsDefault,
    stripeActions.deleteDebitCard,
    stripeActions.deleteBankAccount,
    (state) => ({
      ...state,
      loading: true,
    })
  ),
  on(
    stripeActions.loadCardsFailure,
    stripeActions.loadBanksFailure,
    stripeActions.createStripeAccountFailure,
    stripeActions.createDebitCardSuccess,
    stripeActions.createDebitCardFailure,
    stripeActions.createBankAccountSuccess,
    stripeActions.createBankAccountFailure,
    stripeActions.markDebitCardAsDefaultSuccessful,
    stripeActions.markDebitCardAsDefaultFailure,
    stripeActions.markBankAccountAsDefaultSuccessful,
    stripeActions.markBankAccountAsDefaultFailure,
    stripeActions.deleteDebitCardSuccessful,
    stripeActions.deleteDebitCardFailure,
    stripeActions.deleteBankAccountSuccessful,
    stripeActions.deleteBankAccountFailure,
    stripeActions.loadValidationErrorsFailure,
    stripeActions.loadAccountFailure,
    (state) => ({
      ...state,
      loading: false,
    })
  ),
  on(
    stripeActions.createStripeAccountSuccess,
    stripeActions.loadAccountSuccessful,
    (state, { account }) => ({
      ...state,
      account,
      loading: false,
    })
  ),
  on(stripeActions.loadCardsSuccess, (state, { cards }) => ({
    ...state,
    cards,
    loading: false,
  })),
  on(stripeActions.loadBanksSuccess, (state, { banks }) => ({
    ...state,
    banks,
    loading: false,
  })),
  on(stripeActions.loadValidationErrorsSuccess, (state, { validation }) => ({
    ...state,
    validation,
    loading: false,
  }))
);
