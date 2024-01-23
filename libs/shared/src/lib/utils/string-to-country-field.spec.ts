import { stringToCountryField } from './string-to-country-field';

describe('Converting a string to country entity', () => {
  it('should return empty entity (undefined)', () => {
    expect(stringToCountryField(undefined)).toEqual({
      name: '',
      alpha2Code: '',
      alpha3Code: '',
      numericCode: '',
      callingCode: ''
    });
  });

  it('should return empty entity (less than 2 chars)', () => {
    expect(stringToCountryField('A')).toEqual({
      name: '',
      alpha2Code: '',
      alpha3Code: '',
      numericCode: '',
      callingCode: ''
    });
  });

  it('should return empty entity (more than 3 chars)', () => {
    expect(stringToCountryField('AFGB')).toEqual({
      name: '',
      alpha2Code: '',
      alpha3Code: '',
      numericCode: '',
      callingCode: ''
    });
  });

  it('should return country entity', () => {
    expect(stringToCountryField('AFG')).toEqual({
      name: '',
      alpha2Code: 'AF',
      alpha3Code: 'AFG',
      numericCode: '',
      callingCode: ''
    });
  });
});
