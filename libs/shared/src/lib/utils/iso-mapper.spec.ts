import {
  countryHasProvinces,
  countryHasRegions,
  countryHasStates, getCountryAdministrativeUnits,
  getCountryISO2ByISO3,
  getCountryISO3ByISO2
} from './iso-mapper';

describe('iso mapper', () => {
  it('should map ISO2 properly (lowercase)', () => {
    expect(getCountryISO2ByISO3('ukr')).toEqual('UA');
  });

  it('should map ISO2 properly (uppercase)', () => {
    expect(getCountryISO2ByISO3('UKR')).toEqual('UA');
  });

  it('should map ISO2 properly (Unknown country)', () => {
    // @ts-ignore
    expect(getCountryISO2ByISO3('TEST')).toEqual('');
  });

  it('should map ISO3 properly (lowercase)', () => {
    expect(getCountryISO3ByISO2('ua')).toEqual('UKR');
  });

  it('should map ISO3 properly (uppercase)', () => {
    expect(getCountryISO3ByISO2('UA')).toEqual('UKR');
  });

  it('should map ISO3 properly (Unknown country)', () => {
    // @ts-ignore
    expect(getCountryISO3ByISO2('TEST')).toEqual('');
  });
});

describe('states mapper', () => {
  it('should map states properly (Ukraine) (lowercase) (ISO2)', () => {
    expect(countryHasStates('ua')).toEqual(false);
  });

  it('should map states properly (Ukraine) (uppercase) (ISO2)', () => {
    expect(countryHasStates('UA')).toEqual(false);
  });

  it('should map states properly (Ukraine) (lowercase) (ISO3)', () => {
    expect(countryHasStates('ukr')).toEqual(false);
  });

  it('should map states properly (Ukraine) (uppercase) (ISO3)', () => {
    expect(countryHasStates('UKR')).toEqual(false);
  });

  it('should map states properly (United States of America) (lowercase) (ISO2)', () => {
    expect(countryHasStates('us')).toEqual(true);
  });

  it('should map states properly (United States of America) (uppercase) (ISO2)', () => {
    expect(countryHasStates('US')).toEqual(true);
  });

  it('should map states properly (United States of America) (lowercase) (ISO3)', () => {
    expect(countryHasStates('usa')).toEqual(true);
  });

  it('should map states properly (United States of America) (uppercase) (ISO3)', () => {
    expect(countryHasStates('USA')).toEqual(true);
  });
});

describe('provinces / oblasts mapper', () => {
  it('should map oblasts properly (Ukraine) (lowercase) (ISO2)', () => {
    expect(countryHasProvinces('ua')).toEqual(true);
  });

  it('should map oblasts properly (Ukraine) (uppercase) (ISO2)', () => {
    expect(countryHasProvinces('UA')).toEqual(true);
  });

  it('should map oblasts properly (Ukraine) (lowercase) (ISO3)', () => {
    expect(countryHasProvinces('ukr')).toEqual(true);
  });

  it('should map oblasts properly (Ukraine) (uppercase) (ISO3)', () => {
    expect(countryHasProvinces('UKR')).toEqual(true);
  });

  it('should map provinces properly (Canada) (lowercase) (ISO2)', () => {
    expect(countryHasProvinces('ca')).toEqual(true);
  });

  it('should map provinces properly (Canada) (uppercase) (ISO2)', () => {
    expect(countryHasProvinces('CA')).toEqual(true);
  });

  it('should map provinces properly (Canada) (lowercase) (ISO3)', () => {
    expect(countryHasProvinces('can')).toEqual(true);
  });

  it('should map provinces properly (Canada) (uppercase) (ISO3)', () => {
    expect(countryHasProvinces('CAN')).toEqual(true);
  });
});

describe('regions mapper', () => {
  it('should map regions properly (Ukraine) (lowercase) (ISO2)', () => {
    expect(countryHasRegions('ua')).toEqual(true);
  });

  it('should map regions properly (Ukraine) (uppercase) (ISO2)', () => {
    expect(countryHasRegions('UA')).toEqual(true);
  });

  it('should map regions properly (Ukraine) (lowercase) (ISO3)', () => {
    expect(countryHasRegions('ukr')).toEqual(true);
  });

  it('should map regions properly (Ukraine) (uppercase) (ISO3)', () => {
    expect(countryHasRegions('UKR')).toEqual(true);
  });

  it('should map regions properly (Mexico) (lowercase) (ISO2)', () => {
    expect(countryHasRegions('mx')).toEqual(true);
  });

  it('should map regions properly (Mexico) (uppercase) (ISO2)', () => {
    expect(countryHasRegions('MX')).toEqual(true);
  });

  it('should map regions properly (Mexico) (lowercase) (ISO3)', () => {
    expect(countryHasRegions('MEX')).toEqual(true);
  });

  it('should map regions properly (Mexico) (uppercase) (ISO3)', () => {
    expect(countryHasRegions('MEX')).toEqual(true);
  });
});

describe('Country Administrative Units', () => {
  it('should return valid administrative units for USA ', () => {
    expect(getCountryAdministrativeUnits('USA')).toEqual({
      states: true,
      provinces: false,
      regions: true
    });
  });

  it('should return valid administrative units for UKR', () => {
    expect(getCountryAdministrativeUnits('UKR')).toEqual({
      states: false,
      provinces: true,
      regions: true
    });
  });

  it('should return valid administrative units for TEST', () => {
    // @ts-ignore
    expect(getCountryAdministrativeUnits('TEST')).toEqual({
      states: false,
      provinces: false,
      regions: false
    });
  });
});
