import { FormBuilder } from '@angular/forms';
import {
  LAST4_ERROR_NAME,
  last4Validator,
} from '@ocean/shared/utils/last4-validator';

describe('Last 4 validator', () => {
  const keys = ['taxId', 'last4'];
  const fb = new FormBuilder();

  it.each([null, undefined, '000'])('should return null', (type) => {
    const form = fb.group(
      {
        [keys[0]]: type,
        [keys[1]]: type,
      },
      {
        validators: [last4Validator(keys[0], keys[1])],
      }
    );

    expect(form.errors).toEqual(null);
  });

  it('should call updateValue', () => {
    const form = fb.group(
      {
        [keys[0]]: '1111',
        [keys[1]]: '0000',
      },
      {
        validators: [last4Validator(keys[0], keys[1])],
      }
    );

    const spy = jest.spyOn(form.get(keys[0]), 'updateValueAndValidity');
    form.patchValue({
      [keys[0]]: '0000',
      [keys[1]]: '0000',
    });

    expect(spy).toHaveBeenCalled();
  });

  it('should be invalid', () => {
    const form = fb.group(
      {
        [keys[0]]: '0000',
        [keys[1]]: '0001',
      },
      {
        validators: [last4Validator(keys[0], keys[1])],
      }
    );

    expect(form.controls[keys[0]].invalid).toEqual(true);
    expect(form.controls[keys[1]].invalid).toEqual(true);
    expect(form.controls[keys[0]].errors).toHaveProperty(
      LAST4_ERROR_NAME,
      true
    );
    expect(form.controls[keys[1]].errors).toHaveProperty(
      LAST4_ERROR_NAME,
      true
    );
    expect(form.invalid).toEqual(true);
  });

  it('should validate properly', () => {
    const form = fb.group(
      {
        [keys[0]]: '123456789',
        [keys[1]]: '6789',
      },
      {
        validators: [last4Validator(keys[0], keys[1])],
      }
    );

    expect(form.controls[keys[0]].valid).toEqual(true);
    expect(form.controls[keys[1]].valid).toEqual(true);
    expect(form.controls[keys[0]].errors).toEqual(null);
    expect(form.controls[keys[1]].errors).toEqual(null);
    expect(form.valid).toEqual(true);
  });
});
