import { FormBuilder } from '@angular/forms';
import { TEXT_ERROR_NAME, textValidator } from './text-validator';

describe('text validator', () => {
  const fb = new FormBuilder();
  const key = 'city';
  const form = fb.group({
    [key]: ['', textValidator]
  });

  it('should return null', () => expect(textValidator(undefined)).toEqual(null));

  it.each([
    '',
    'a',
    '1432 Webster St NW',
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
    expect(form.controls[key].errors).toHaveProperty(TEXT_ERROR_NAME, true);
  });

  it('should be valid (Webster St NW)', () => {
    form.get(key)?.setValue('Webster St NW');
    expect(form.valid).toEqual(true);
    expect(form.errors).toEqual(null);
  });
});
