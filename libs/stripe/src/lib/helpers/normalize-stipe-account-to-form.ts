import { StripeAccount, StripeForm } from '@ocean/api/shared';
import { stringToCountryField } from '@ocean/shared/utils/string-to-country-field';
import {
  getCountryAdministrativeUnits,
  ISO,
} from '@ocean/shared/utils/iso-mapper';

export const normalizeStipeAccountToForm = (
  account?: StripeAccount
): StripeForm | undefined => {
  if (
    typeof account !== 'object' ||
    account === null ||
    typeof account?.individual !== 'object' ||
    account.individual === null ||
    typeof account.individual?.address !== 'object' ||
    account.individual?.address === null
  ) {
    return;
  }

  const country = stringToCountryField(account.individual.address.country);

  if (country.alpha2Code === '') {
    return;
  }

  const { states, provinces } = getCountryAdministrativeUnits(
    country.alpha2Code as ISO
  );

  const state = account.individual.address.state;

  return {
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
  } as StripeForm;
};
