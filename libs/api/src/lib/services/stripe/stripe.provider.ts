import { Injectable } from '@angular/core';
import { ClientService } from '@ocean/api/client';
import { StripeAccount } from '@ocean/api/shared';

export enum StripeProviderMethod {
  CREATE = 'createAccount',
  EDIT = 'updateAccount',
  READ = 'getAccount'
}

@Injectable({
  providedIn: 'root'
})
export class StripeProvider {
  private readonly stripeApiUrl = '/api/users/individualAccount';

  constructor(private readonly api: ClientService) {
  }

  [StripeProviderMethod.CREATE](request: StripeAccount) {
    return this.api.request<StripeAccount>({
      url: this.stripeApiUrl,
      method: 'POST',
      data: request
    });
  }

  [StripeProviderMethod.EDIT](request: StripeAccount) {
    return this.api.request<StripeAccount>({
      url: this.stripeApiUrl,
      method: 'PUT',
      data: request
    });
  }
 
  [StripeProviderMethod.READ]() {
    return this.api.request<StripeAccount>({
      url: this.stripeApiUrl,
      method: 'GET'
    });
  }

  getStripeAccountErrors() {
    return this.api.request<object>({
      url: `${this.stripeApiUrl}/validations`,
      method: 'POST',
      data: {}
    });
  }
}
