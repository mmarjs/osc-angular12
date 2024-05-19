import { Injectable } from '@angular/core';
import { ClientService } from '@ocean/api/client';
import { StripeAccount } from '@ocean/api/shared';
import {
  DebitCard,
  RawDebitCardData,
} from '@ocean/api/shared/entities/stripe/debit-card';
import {
  BankAccount,
  RawBankAccountData,
} from '@ocean/api/shared/entities/stripe/bank-account';

export enum StripeProviderMethod {
  CREATE = 'createAccount',
  EDIT = 'updateAccount',
  READ = 'getAccount',
}

@Injectable({
  providedIn: 'root',
})
export class StripeProvider {
  private readonly stripeApiUrl = '/api/users/individualAccount';

  constructor(private readonly api: ClientService) {}

  [StripeProviderMethod.CREATE](request: StripeAccount) {
    return this.api.request<StripeAccount>({
      url: this.stripeApiUrl,
      method: 'POST',
      data: request,
    });
  }

  getStripeAccountErrors() {
    return this.api.request<object>({
      url: `${this.stripeApiUrl}/validations`,
      method: 'POST',
      data: {},
    });
  }

  attachDebitCard(debitCard: RawDebitCardData) {
    return this.api.request<DebitCard>({
      url: `${this.stripeApiUrl}/debitCard`,
      method: 'POST',
      data: debitCard,
    });
  }

  attachBankAccount(bankAccount: RawBankAccountData) {
    return this.api.request<BankAccount>({
      url: `${this.stripeApiUrl}/bankAccount`,
      method: 'POST',
      data: bankAccount,
    });
  }

  [StripeProviderMethod.EDIT](request: StripeAccount) {
    return this.api.request<StripeAccount>({
      url: this.stripeApiUrl,
      method: 'PUT',
      data: request,
    });
  }

  makeDebitCardAsDefault(id: string) {
    return this.api.request<void>({
      url: `${this.stripeApiUrl}/debitCard/${id}/default`,
      method: 'PUT',
      data: {},
    });
  }

  makeBankAccountAsDefault(id: string) {
    return this.api.request<void>({
      url: `${this.stripeApiUrl}/bankAccount/${id}/default`,
      method: 'PUT',
      data: {},
    });
  }

  [StripeProviderMethod.READ]() {
    return this.api.request<StripeAccount>({
      url: this.stripeApiUrl,
      method: 'GET',
    });
  }

  getDebitCards() {
    return this.api.request<DebitCard[]>({
      url: `${this.stripeApiUrl}/debitCard`,
      method: 'GET',
    });
  }

  getBankAccounts() {
    return this.api.request<BankAccount[]>({
      url: `${this.stripeApiUrl}/bankAccount`,
      method: 'GET',
    });
  }

  deleteDebitCard(id: string) {
    return this.api.request<void>({
      url: `${this.stripeApiUrl}/debitCard/${id}`,
      method: 'DELETE',
    });
  }

  deleteBankAccount(id: string) {
    return this.api.request<void>({
      url: `${this.stripeApiUrl}/bankAccount/${id}`,
      method: 'DELETE',
    });
  }
}
