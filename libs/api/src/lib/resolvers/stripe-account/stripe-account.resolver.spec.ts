import { TestBed } from '@angular/core/testing';
import { StripeProvider, StripeProviderMethod } from '@ocean/api/services';
import { StripeAccountResolver } from './stripe-account.resolver';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NotifierService } from '@ocean/shared/services';
import { LocalizationService } from '@ocean/internationalization';
import { Router } from '@angular/router';
import { lastValueFrom, of, throwError } from 'rxjs';
import { StripeAccount, StripeForm } from '@ocean/api/shared';
import { stringToCountryField } from '@ocean/shared/utils/string-to-country-field';
import { getCountryAdministrativeUnits, ISO } from '@ocean/shared/utils/iso-mapper';

const routerMock = {
  getCurrentNavigation() {
    return {
      extras: {
        state: undefined
      }
    };
  }
};

const notifierMock = {
  error: jest.fn()
};

const localizationMock = {
  translate: v => v
};

const stripeMock = {
  [StripeProviderMethod.READ]: jest.fn()
};

const response: StripeAccount = {
  mcc: '5551',
  ssnLast4: '0000',
  email: 'test@mail.com',
  businessUrl: 'test@mail.com',
  individual: {
    firstName: 'first name',
    lastName: 'last name',
    phone: '0000000',
    dob: '2023-01-01',
    taxId: '0000000',
    gender: 'male',
    address: {
      city: 'city',
      line1: 'line1',
      line2: 'line2',
      postalCode: '00000',
      state: 'Florida',
      country: 'USA',
    }
  }
};

const form = (): StripeForm => {
  const country = stringToCountryField(response?.individual?.address?.country);
  const {states, provinces} = getCountryAdministrativeUnits(country?.alpha2Code as ISO);
  const state = response?.individual?.address?.state;

  return {
    firstName: response.individual.firstName,
    lastName: response.individual.lastName,
    email: response.email,
    businessUrl: response.businessUrl,
    phone: {
      number: response?.individual?.phone,
      countryCode: country?.alpha2Code?.toUpperCase()
    },
    gender: response?.individual?.gender,
    dob: response?.individual?.dob,
    taxId: response?.individual?.taxId,
    ssnLast4: response?.ssnLast4,
    city: response?.individual?.address?.city,
    line1: response?.individual?.address?.line1,
    line2: response?.individual?.address?.line2,
    postalCode: response?.individual?.address?.postalCode,
    country: country,
    state: states ? state : '',
    province: (!states && provinces) ? state : '',
    region: !(states && provinces) ? state : '',
  };
};

const configure = (_routerMock: object, _notifierMock: object, _localizationMock: object, _stripeMock: object) => {
  return TestBed.configureTestingModule({
    imports: [MatDialogModule, MatSnackBarModule],
    providers: [
      {provide: Router, useFactory: () => _routerMock},
      {provide: NotifierService, useFactory: () => _notifierMock},
      {provide: LocalizationService, useFactory: () => _localizationMock},
      {provide: StripeProvider, useFactory: () => _stripeMock},
    ]
  });
};

describe('StripeAccountResolver', () => {
  let resolver: StripeAccountResolver;

  it('should be created', () => {
    configure(routerMock, notifierMock, localizationMock, stripeMock);
    resolver = TestBed.inject(StripeAccountResolver);
    expect(resolver).toBeTruthy();
  });

  it('should return undefined as method isn\'t read', async () => {
    configure(routerMock, notifierMock, localizationMock, stripeMock);
    resolver = TestBed.inject(StripeAccountResolver);
    const result = await lastValueFrom(resolver.resolve());
    expect(result).toEqual(undefined);
  });

  it('should return undefined on backend error', async () => {
    configure({
        getCurrentNavigation: () => ({
          extras: {
            state: {
              method: StripeProviderMethod.READ
            }
          }
        })
      },
      notifierMock,
      localizationMock,
      {
        [StripeProviderMethod.READ]: jest.fn(() => throwError(() => 'error'))
      }
    );

    resolver = TestBed.inject(StripeAccountResolver);
    const spy = jest.spyOn(notifierMock, 'error');
    const result = await lastValueFrom(resolver.resolve());

    expect(spy).toHaveBeenCalledWith('STRIPE.ERROR.READING');
    expect(result).toEqual(undefined);
  });

  it('should return valid stripe form', async () => {
    configure({
        getCurrentNavigation: () => ({
          extras: {
            state: {
              method: StripeProviderMethod.READ
            }
          }
        })
      },
      notifierMock,
      localizationMock,
      {
        [StripeProviderMethod.READ]: jest.fn(() => of(response))
      }
    );

    resolver = TestBed.inject(StripeAccountResolver);
    const result = await lastValueFrom(resolver.resolve());

    expect(result).toEqual(form());
  });
});
