import { FormBuilder } from '@angular/forms';
import { WEB_URL_ERROR_NAME, webUrlValidator } from '@ocean/shared/utils/web-url-validator';

describe('web url validator', () => {
  const fb = new FormBuilder();
  const key = 'url';
  const form = fb.group({
    [key]: ['', webUrlValidator]
  });

  it('should return null', () => expect(webUrlValidator(undefined)).toEqual(null));

  it.each([
    '',
    'adwawdawd',
    'http://localhost:4200/dashboard/',
    1432,
    // @ts-ignore
    1n,
    jest.fn(),
    {test: 'test'},
    true
  ])('should be invalid (%s)', (value) => {
    form.get(key)?.setValue(value);
    expect(form.valid).toEqual(false);
    expect(form.controls[key].errors).toHaveProperty(WEB_URL_ERROR_NAME, true);
  });

  it('should be valid (http://localhost.com/dashboard/profile)', () => {
    form.get(key)?.setValue('http://localhost.com/dashboard/profile');
    expect(form.valid).toEqual(true);
    expect(form.errors).toEqual(null);
  });
});
