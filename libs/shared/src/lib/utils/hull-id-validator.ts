import { AbstractControl } from '@angular/forms';

export const HULL_ID_ERROR_NAME = 'invalidHullIdPattern' as const;

export interface HullIdValidatorError {
  [HULL_ID_ERROR_NAME]: boolean;
}

const HULL_ID_PATTERN = /^[A-Z]+[0-9]{3,}[A-Z0-9]{3,}/;
const MAX_HULL_ID_LEN = 14;

export const hullIdValidator = (form: AbstractControl): HullIdValidatorError | null => {
  if (!(form instanceof AbstractControl)) {
    return null;
  }

  if (typeof form?.value !== 'string' ||
    form.value.length > MAX_HULL_ID_LEN ||
    HULL_ID_PATTERN.exec(form.value)?.[0]?.length !== form.value.length
  ) {
    return {
      [HULL_ID_ERROR_NAME]: true
    };
  }

  return null;
};
