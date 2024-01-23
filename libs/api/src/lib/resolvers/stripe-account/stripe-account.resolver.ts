import { Injectable } from '@angular/core';
import { Resolve, Router } from '@angular/router';
import { StripeForm } from '@ocean/api/shared/entities/stripe/stripe-form';
import { catchError, map, of, Observable } from 'rxjs';
import { StripeProvider, StripeProviderMethod } from '@ocean/api/services';
import { NotifierService } from '@ocean/shared/services';
import { LocalizationService } from '@ocean/internationalization';
import { stringToCountryField } from '@ocean/shared/utils/string-to-country-field';
import { getCountryAdministrativeUnits, ISO } from '@ocean/shared/utils/iso-mapper';

@Injectable({
  providedIn: 'root',
})
export class StripeAccountResolver implements Resolve<StripeForm | undefined> {
  private method: StripeProviderMethod | undefined = this.router.getCurrentNavigation()?.extras?.state?.method;

  constructor(
    private stripeProvider: StripeProvider,
    private notifierService: NotifierService,
    private localizationService: LocalizationService,
    private router: Router
  ) {
  }

  resolve(): Observable<StripeForm | undefined> {
    if (this.method === StripeProviderMethod.READ) {
      return this.stripeProvider
        ?.[StripeProviderMethod.READ]
        ?.()
        ?.pipe(
          catchError((err) => {
            this.notifierService.error(err?.message ?? this.localizationService.translate('STRIPE.ERROR.READING'));
            return of(undefined);
          }),
          map((res) => {
            if (typeof res !== 'object' || res === null) {
              return undefined;
            }

            const country = stringToCountryField(res?.individual?.address?.country);
            const {states, provinces} = getCountryAdministrativeUnits(country?.alpha2Code as ISO);
            const state = res?.individual?.address?.state;

            const stripeAccountDetail: StripeForm = {
              firstName: res?.individual?.firstName,
              lastName: res?.individual?.lastName,
              email: res?.email,
              businessUrl: res?.businessUrl,
              phone: {
                number: res?.individual?.phone,
                countryCode: country?.alpha2Code?.toUpperCase()
              },
              gender: res?.individual?.gender,
              dob: res?.individual?.dob,
              taxId: res?.individual?.taxId,
              ssnLast4: res?.ssnLast4,
              city: res?.individual?.address?.city,
              line1: res?.individual?.address?.line1,
              line2: res?.individual?.address?.line2,
              postalCode: res?.individual?.address?.postalCode,
              country: country,
              state: states ? state : '',
              province: (!states && provinces) ? state : '',
              region: !(states && provinces) ? state : '',
            };
            return stripeAccountDetail;
          })
        );
    } else {
      return of(undefined);
    }
  }
}
