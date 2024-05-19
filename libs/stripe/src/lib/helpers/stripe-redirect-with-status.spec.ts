import { stripeRedirectWithStatus } from './stripe-redirect-with-status';
import { Router } from '@angular/router';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { StripeProviderMethod } from '@ocean/api/services';

describe('stripeRedirectWithStatus', () => {
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
    });

    router = TestBed.inject(Router);
  });

  it('should redirect with proper status', () => {
    const spy = jest
      .spyOn(router, 'navigate')
      .mockImplementationOnce(() => null);

    const url = 'my custom url';
    const method = StripeProviderMethod.READ;

    stripeRedirectWithStatus(router, url, method);

    expect(spy).toHaveBeenCalledWith([url], {
      replaceUrl: false,
      state: {
        method,
      },
    });
  });
});
