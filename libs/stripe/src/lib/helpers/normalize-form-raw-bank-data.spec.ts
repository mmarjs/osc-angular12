import { stringToCountryField } from '@ocean/shared/utils/string-to-country-field';
import { CountryISO } from 'ngx-intl-tel-input';
import { normalizeFormRawBankData } from './normalize-form-raw-bank-data';

describe('normalizeFormRawBankData', () => {
  let value;
  const countryISO = CountryISO.UnitedStates.toUpperCase();

  beforeEach(() => {
    value = {
      bankName: 'Test Bank Name',
      accountHolderName: 'Test Account Holder Name',
      accountNumber: '000000',
      country: stringToCountryField(countryISO),
      currency: 'USD',
      routingNumber: '000000000',
    } as any;
  });

  it('should return undefined (invalid country)', () => {
    value.country = 'USA';
    expect(normalizeFormRawBankData(value)).toEqual(undefined);
  });

  it.each([null, undefined])(`should return undefined (value: %s)`, (type) => {
    expect(normalizeFormRawBankData(type)).toEqual(undefined);
  });

  it('should return normalized data', () => {
    expect(normalizeFormRawBankData(value)).toEqual({
      bankName: 'Test Bank Name',
      accountHolderName: 'Test Account Holder Name',
      accountNumber: '000000',
      country: countryISO,
      currency: 'USD',
      routingNumber: '000000000',
    });
  });
});
