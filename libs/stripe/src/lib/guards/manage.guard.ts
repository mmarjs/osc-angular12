import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { first, firstValueFrom } from 'rxjs';
import { StripeFacadeService } from '../store/facade';
import { PATHS } from '@ocean/shared';
import { StripeAccountValidationStatus } from '../helpers/stripe-account-validation';
import { stripeRedirectWithStatus } from '../helpers/stripe-redirect-with-status';
import { StripeProviderMethod } from '@ocean/api/services';

@Injectable({
  providedIn: 'root',
})
export class ManageGuard implements CanActivate {
  private readonly errors$ = this.stripeFacadeService.validationErrors$.pipe(
    first((value) => typeof value === 'object')
  );

  constructor(
    private readonly router: Router,
    private readonly stripeFacadeService: StripeFacadeService
  ) {
    this.stripeFacadeService.loadValidationErrors();
  }

  async canActivate(): Promise<boolean | UrlTree> {
    const validation = await firstValueFrom(this.errors$);

    const { status, errors } = validation ?? {};

    if (
      typeof errors !== 'object' ||
      typeof status !== 'string' ||
      status === StripeAccountValidationStatus.UNINITIALIZED
    ) {
      return this.router.parseUrl(`/${PATHS.DASHBOARD}`);
    }

    if (
      [
        StripeAccountValidationStatus.NOT_CREATED,
        StripeAccountValidationStatus.PROCEED,
      ].includes(status)
    ) {
      await stripeRedirectWithStatus(
        this.router,
        PATHS.CREATE_STRIPE_ACCOUNT,
        status === StripeAccountValidationStatus.NOT_CREATED
          ? StripeProviderMethod.CREATE
          : StripeProviderMethod.READ
      );

      return false;
    }
    return true;
  }
}
