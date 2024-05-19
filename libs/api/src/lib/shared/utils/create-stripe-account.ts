import { StripeAccount, StripeForm } from '../entities/stripe';
import { dateWithoutTimezone } from '@ocean/shared/utils/dateWithoutTimezone';
import { FormGroup } from '@angular/forms';

const STRIPE_ACCOUNT_MCC = '5551';

const normalizeLocation = (units: (string | null)[]): string =>
  units.find((unit) => typeof unit === 'string' && unit.length) ?? '';

export const createStripeAccount = (form: FormGroup): StripeAccount => {
  const fields = form.value as StripeForm;

  const account: StripeAccount = {
    mcc: STRIPE_ACCOUNT_MCC,
    email: fields?.email ?? '',
    businessUrl: fields?.businessUrl ?? '',
    individual: {
      firstName: fields?.firstName ?? '',
      lastName: fields?.lastName ?? '',
      phone: fields?.phone?.e164Number ?? '',
      dob: dateWithoutTimezone(fields?.dob ?? 0, false),
      gender: fields?.gender ?? '',
      address: {
        city: fields?.city ?? '',
        line1: fields?.line1 ?? '',
        postalCode: fields?.postalCode ?? '0000',
        country: fields?.country?.alpha2Code ?? '',
        state: normalizeLocation([
          fields?.state,
          fields?.province,
          fields?.region,
        ]),
      },
    },
  };

  if (fields?.line2?.length) {
    account.individual.address.line2 = fields.line2;
  }

  // taxId - false, SSN - true
  if (fields?.taxIdOrSSN) {
    account.ssnLast4 = fields?.ssnLast4 ?? '';
  } else {
    account.individual.taxId = fields?.taxId?.replace(/ /g, '') ?? '';
  }

  return account;
};
