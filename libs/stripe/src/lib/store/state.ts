import { DebitCard } from '@ocean/api/shared/entities/stripe/debit-card';
import { BankAccount } from '@ocean/api/shared/entities/stripe/bank-account';
import { StripeAccount } from '@ocean/api/shared';
import { StripeValidation } from '../helpers/stripe-account-validation';

export const STRIPE_FEATURE_KEY = 'stripe';

export interface State {
  cards: DebitCard[];
  banks: BankAccount[];
  loading: boolean;
  account?: StripeAccount;
  validation?: StripeValidation;
}

export const initialState: State = {
  cards: [],
  banks: [],
  loading: false,
};
