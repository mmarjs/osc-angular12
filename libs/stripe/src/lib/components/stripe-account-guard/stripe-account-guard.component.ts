import { Component, OnDestroy } from '@angular/core';
import { BehaviorSubject, map, tap } from 'rxjs';
import { take } from 'rxjs/operators';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { PATHS } from '@ocean/shared';
import { UserFacade } from '@ocean/api/state';
import { StripeProvider, StripeProviderMethod } from '@ocean/api/services';
import {
  stripeAccountValidation,
  StripeAccountValidationStatus,
} from '../../helpers/stripe-account-validation';

@Component({
  selector: 'app-stripe-account-guard',
  templateUrl: './stripe-account-guard.component.html',
  styleUrls: ['./stripe-account-guard.component.scss'],
})
export class StripeAccountGuardComponent implements OnDestroy {
  readonly STRIPE_URL = `/${PATHS.STRIPE}`;

  readonly STRIPE_ACCOUNT_STATES = StripeAccountValidationStatus;
  readonly STRIPE_PROVIDER_METHOD = StripeProviderMethod;

  readonly isLoading$ = new BehaviorSubject<boolean>(true);

  readonly stripeAccountValidation$ = stripeAccountValidation(
    this.userFacade,
    this.stripeProvider
  ).pipe(
    tap(() => this.isLoading$.next(false)),
    map(({ status }) => status),
    untilDestroyed(this),
    take(1)
  );

  constructor(
    private readonly userFacade: UserFacade,
    private readonly stripeProvider: StripeProvider
  ) {
    this.stripeAccountValidation$.subscribe();
  }

  ngOnDestroy() {
    this.isLoading$.complete();
  }
}
