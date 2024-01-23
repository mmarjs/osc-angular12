import { AbstractControl } from '@angular/forms';

export const ADDRESS_ERROR_NAME = 'invalidAddressPattern' as const;

export interface AddressValidatorError {
  [ADDRESS_ERROR_NAME]: boolean;
}

const ADDRESS_PATTERN = /^[^-\s][a-zA-Z0-9\s-]+$/;

export const addressValidator = (form: AbstractControl): AddressValidatorError | null => {
  if (!(form instanceof AbstractControl)) {
    return null;
  }

  if (typeof form?.value !== 'string' || !ADDRESS_PATTERN.test(form.value)) {
    return {
      [ADDRESS_ERROR_NAME]: true
    };
  }

  return null;
};
