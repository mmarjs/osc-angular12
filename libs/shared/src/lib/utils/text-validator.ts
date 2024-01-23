import { AbstractControl } from '@angular/forms';

export const TEXT_ERROR_NAME = 'invalidTextPattern' as const;

export interface TextValidatorError {
  [TEXT_ERROR_NAME]: boolean;
}

const TEXT_PATTERN = /^[^-\s][a-zA-Z\s-]+$/;

export const textValidator = (form: AbstractControl): TextValidatorError | null => {
  if (!(form instanceof AbstractControl)) {
    return null;
  }

  if (typeof form?.value !== 'string' || !TEXT_PATTERN.test(form.value)) {
    return {
      [TEXT_ERROR_NAME]: true
    };
  }

  return null;
};
