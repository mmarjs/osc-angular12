import { Component } from '@angular/core';
import { PATHS } from '@ocean/shared';
import { StripeProviderMethod } from '@ocean/api/services';
import { UserFacade } from '@ocean/api/state';
import { UserTypeTitles } from '@ocean/api/shared';

@Component({
  selector: 'app-stripe-integration-details',
  templateUrl: './stripe-integration-details.component.html',
  styleUrls: ['./stripe-integration-details.component.scss'],
})
export class StripeIntegrationDetailsComponent {
  readonly STRIPE_URL = `/${PATHS.STRIPE}`;
  readonly STRIPE_PROVIDER_METHOD = StripeProviderMethod;
  readonly USER_TYPES = UserTypeTitles;

  readonly userType$ = this.userFacade.userType$;

  constructor(private readonly userFacade: UserFacade) {}
}
