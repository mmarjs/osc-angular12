import { StripeProviderMethod } from '@ocean/api/services';
import { Router } from '@angular/router';

export const stripeRedirectWithStatus = async (
  router: Router,
  url: string,
  method: StripeProviderMethod
) =>
  router.navigate([url], {
    replaceUrl: false,
    state: {
      method,
    },
  });
