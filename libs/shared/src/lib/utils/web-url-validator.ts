import { AbstractControl } from '@angular/forms';

export const WEB_URL_ERROR_NAME = 'invalidWebUrl' as const;

export interface WebUrlValidatorError {
  [WEB_URL_ERROR_NAME]: boolean;
}

const URL_PATTERN = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;

export const webUrlValidator = (form: AbstractControl): WebUrlValidatorError | null => {
  if (!(form instanceof AbstractControl)) {
    return null;
  }

  if (typeof form?.value !== 'string' || !URL_PATTERN.test(form.value)) {
    return {
      [WEB_URL_ERROR_NAME]: true
    };
  }

  return null;
};
