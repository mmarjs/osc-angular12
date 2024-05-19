import { FormBuilder, FormControl } from '@angular/forms';
import { addressValidator, ADDRESS_ERROR_NAME } from './address-validator';

describe('address validator', () => {
  const fb = new FormBuilder();
  const key = 'address';
  const form = fb.group({
    [key]: ['', addressValidator(false)]
  });

  it('should return null', () => expect(addressValidator(false)(undefined)).toEqual(null));

  it('should allow empty value for optional', () => {
    const validator = addressValidator(true);
    expect(validator(
      new FormControl('')
    )).toEqual(null);
  });

  it.each([
    '',
    'a',
    ' 1432 Webster St NW',
    1432,
    // @ts-ignore
    1n,
    jest.fn(),
    {test: 'test'},
    true
  ])('should be invalid (%s)', (value) => {
    form.get(key)?.setValue(value);
    expect(form.valid).toEqual(false);
    expect(form.controls[key].errors).toHaveProperty(ADDRESS_ERROR_NAME, true);
  });

  it('should be valid (1432 Webster St NW)', () => {
    form.get(key)?.setValue('1432 Webster St NW');
    expect(form.valid).toEqual(true);
    expect(form.errors).toEqual(null);
  });
});
