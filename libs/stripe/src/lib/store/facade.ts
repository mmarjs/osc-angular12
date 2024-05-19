import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import {
  selectAccount,
  selectBanks,
  selectCards,
  selectLoading,
  selectValidationErrors,
} from './selectors';
import { State } from './state';
import { stripeActions } from './actions';
import { RawBankAccountData } from '@ocean/api/shared/entities/stripe/bank-account';
import { STRIPE_DETAILS_EXIT_TYPE, StripeDetailsExit } from '../shared/types';
import { RawDebitCardData } from '@ocean/api/shared/entities/stripe/debit-card';
import { StripeAccount } from '@ocean/api/shared';
import { StripeProviderMethod } from '@ocean/api/services';

export const enum ProceedActionFor {
  CARDS = 'cards',
  BANKS = 'banks',
}

@Injectable({
  providedIn: 'root',
})
export class StripeFacadeService {
  cards$ = this.store.pipe(select(selectCards));
  banks$ = this.store.pipe(select(selectBanks));
  loading$ = this.store.pipe(select(selectLoading));
  account$ = this.store.pipe(select(selectAccount));
  validationErrors$ = this.store.pipe(select(selectValidationErrors));

  constructor(private readonly store: Store<State>) {}

  loadAccount() {
    this.store.dispatch(stripeActions.loadAccount());
  }

  loadValidationErrors() {
    this.store.dispatch(stripeActions.loadValidationErrors());
  }

  loadCards() {
    this.store.dispatch(stripeActions.loadCards());
  }

  loadBanks() {
    this.store.dispatch(stripeActions.loadBanks());
  }

  createAccount(
    account: StripeAccount,
    method: StripeProviderMethod.CREATE | StripeProviderMethod.EDIT
  ) {
    this.store.dispatch(
      stripeActions.createStripeAccount({
        account,
        method,
      })
    );
  }

  createDebitCard(debitCard: RawDebitCardData) {
    this.store.dispatch(
      stripeActions.createDebitCard({
        debitCard,
      })
    );
  }

  createBankAccount(bankAccount: RawBankAccountData) {
    this.store.dispatch(
      stripeActions.createBankAccount({
        bankAccount,
      })
    );
  }

  proceedAction(
    actionFor: ProceedActionFor,
    exitDetailData?: StripeDetailsExit
  ) {
    if (typeof exitDetailData !== 'object' || exitDetailData === null) {
      return;
    }

    const { id, status } = exitDetailData;

    if (
      typeof id !== 'string' ||
      typeof status !== 'string' ||
      !id.length ||
      !status.length
    ) {
      return;
    }

    const [markAction, deleteAction] =
      actionFor === ProceedActionFor.CARDS
        ? [stripeActions.markDebitCardAsDefault, stripeActions.deleteDebitCard]
        : [
            stripeActions.markBankAccountAsDefault,
            stripeActions.deleteBankAccount,
          ];

    if (status === STRIPE_DETAILS_EXIT_TYPE.MARK) {
      this.store.dispatch(
        markAction({
          id,
        })
      );
    } else if (status === STRIPE_DETAILS_EXIT_TYPE.DELETE) {
      this.store.dispatch(
        deleteAction({
          id,
        })
      );
    }
  }
}
