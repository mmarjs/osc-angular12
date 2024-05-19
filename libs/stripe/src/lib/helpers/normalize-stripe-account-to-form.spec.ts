import { normalizeStipeAccountToForm } from './normalize-stipe-account-to-form';
import { StripeAccount } from '@ocean/api/shared';
import { CountryISO } from 'ngx-intl-tel-input';
import { stringToCountryField } from '@ocean/shared/utils/string-to-country-field';
import {
  getCountryAdministrativeUnits,
  ISO,
} from '@ocean/shared/utils/iso-mapper';

describe('normalizeStipeAccountToForm', () => {
  const defaultsTestValues = [
    undefined,
    null,
    false,
    40,
    jest.fn(),
    'test string',
  ];

  it.each(defaultsTestValues)(`should return undefined (value: %s)`, (type) => {
    expect(normalizeStipeAccountToForm(type as any)).toEqual(undefined);
  });

  it.each(defaultsTestValues)(`should return undefined (value: %s)`, (type) => {
    const obj = { individual: type };
    expect(normalizeStipeAccountToForm(obj as any)).toEqual(undefined);
  });

  it.each(defaultsTestValues)(`should return undefined (value: %s)`, (type) => {
    const obj = { individual: { address: type } };
    expect(normalizeStipeAccountToForm(obj as any)).toEqual(undefined);
  });

  it.each(defaultsTestValues)(`should return undefined (value: %s)`, (type) => {
    const obj = { individual: { address: { country: type } } };
    expect(normalizeStipeAccountToForm(obj as any)).toEqual(undefined);
  });

  it.each([CountryISO.UnitedStates, CountryISO.Canada, CountryISO.Germany])(
    `should return normalized form data (value: %s)`,
    (type) => {
      const account: StripeAccount = {
        mcc: '5551',
        ssnLast4: '0000',
        email: 'email',
        businessUrl: 'business url',
        individual: {
          firstName: 'first name',
          lastName: 'last name',
          phone: '+24548745521145',
          dob: '1/1/1901',
          taxId: '000000000',
          gender: 'male',
          address: {
            city: 'city',
            line1: 'line1',
            line2: 'line2',
            postalCode: '454785',
            state: 'Florida',
            country: type,
          },
        },
      };

      const country = stringToCountryField(type);

      const { states, provinces } = getCountryAdministrativeUnits(
        country.alpha2Code as ISO
      );

      const state = account.individual.address.state;

      expect(normalizeStipeAccountToForm(account)).toEqual({
        firstName: account.individual.firstName,
        lastName: account.individual.lastName,
        email: account.email,
        businessUrl: account.businessUrl,
        phone: {
          number: account.individual.phone,
          countryCode: country.alpha2Code.toUpperCase(),
        },
        gender: account.individual.gender,
        dob: account.individual.dob,
        taxId: account.individual.taxId,
        ssnLast4: account.ssnLast4,
        city: account.individual.address.city,
        line1: account.individual.address.line1,
        line2: account.individual.address.line2,
        postalCode: account.individual.address.postalCode,
        country: country,
        state: states ? state : '',
        province: !states && provinces ? state : '',
        region: !(states && provinces) ? state : '',
      });
    }
  );
});
