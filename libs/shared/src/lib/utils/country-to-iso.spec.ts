import { countryEntityToISO } from './country-to-iso';
import { Country } from '@angular-material-extensions/select-country';

describe('Country to ISO 3166-1 Alpha-3 codes', () => {
  it('should return empty string (less than 2)', () => {
    expect(countryEntityToISO('A')).toBe('');
  });

  it('should return empty string (more than 3)', () => {
    expect(countryEntityToISO('AFGB')).toBe('');
  });

  it('should return empty string (null provided)', () => {
    expect(countryEntityToISO(null)).toBe('');
  });

  it('should return empty string (undefined provided)', () => {
    expect(countryEntityToISO(undefined)).toBe('');
  });

  it('should return empty string (no alpha3Code field)', () => {
    const country = {
      parameter: 'parameter'
    };

    // @ts-ignore
    expect(countryEntityToISO(country)).toBe('');
  });

  it('should return AFG (plain text)', () => {
    expect(countryEntityToISO('AFG')).toBe('AFG');
  });

  it('should return AFG (country object)', () => {
    const country: Country = {
      name: 'Afghanistan',
      alpha2Code: 'AF',
      alpha3Code: 'AFG',
      numericCode: '',
      callingCode: '',
    };

    expect(countryEntityToISO(country)).toBe('AFG');
  });
});
