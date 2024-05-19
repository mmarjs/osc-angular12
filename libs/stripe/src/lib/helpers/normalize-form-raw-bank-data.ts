import { stripeBankFields } from '@ocean/forms-config';
import { RawBankAccountData } from '@ocean/api/shared/entities/stripe/bank-account';
import { Country } from '@angular-material-extensions/select-country';
import { ISO2 } from '@ocean/shared/utils/iso-mapper';

type FormRawData = {
  [K in keyof Exclude<
    typeof stripeBankFields,
    'country'
  >]: keyof typeof stripeBankFields[K];
} & {
  country: Country;
};

export const normalizeFormRawBankData = (
  data?: FormRawData
): RawBankAccountData | undefined => {
  if (typeof data !== 'object' || !data?.country?.alpha2Code) {
    return;
  }

  return {
    ...data,
    country: data.country.alpha2Code as ISO2,
  };
};
