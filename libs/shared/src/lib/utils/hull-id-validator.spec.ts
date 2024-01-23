import { FormBuilder } from '@angular/forms';
import { HULL_ID_ERROR_NAME, hullIdValidator } from '@ocean/shared/utils/hull-id-validator';

describe('hull id validator', () => {
  const fb = new FormBuilder();
  const key = 'url';
  const form = fb.group({
    [key]: ['', hullIdValidator]
  });

  it('should return null', () => expect(hullIdValidator(undefined)).toEqual(null));

  it.each([
    '',
    'adwawdawd',
    '0000000',
    'ABC12345D404ACVB',
    'ABC12345D404a',
    1432,
    // @ts-ignore
    1n,
    jest.fn(),
    {test: 'test'},
    true,
  ])('should be invalid (%s)', (value) => {
    form.get(key)?.setValue(value);
    expect(form.valid).toEqual(false);
    expect(form.controls[key].errors).toHaveProperty(HULL_ID_ERROR_NAME, true);
  });

  it.each([
    'ABC12345D404',
    'SMK72301B898',
    'SEAL9894M83E',
    'FLZBT345G690',
    'APK21781K596',
    'H119132EH899',
    'CRL43965M73F',
    'PLE012611900',
    'XKA13704C898',
    'ACBJ6665M7',
  ])('should be valid (%s)', value => {
    form.get(key)?.setValue(value);
    expect(form.valid).toEqual(true);
    expect(form.errors).toEqual(null);
  });
});
