import { AbstractControl } from '@angular/forms';

export const EXPIRE_CARD_DATE_ERROR_NAME =
  'invalidCardExpireDatePattern' as const;

export interface ExpireCardDateValidatorError {
  [EXPIRE_CARD_DATE_ERROR_NAME]: boolean;
}

export const expireCardDateValidator = (
  form: AbstractControl
): ExpireCardDateValidatorError | null => {
  if (!(form instanceof AbstractControl)) {
    return null;
  }

  if (
    typeof form?.value !== 'string' ||
    !form.value.length ||
    !form.value.match(/^\d\d\/\d\d$/)
  ) {
    return {
      [EXPIRE_CARD_DATE_ERROR_NAME]: true,
    };
  }

  const [month = -1, year = -1] = form.value.split('/');
  const date = new Date();
  const currentYear = `${date.getFullYear()}`.slice(-2);
  const currentMonth = date.getMonth() + 1;

  if (
    (month < currentMonth && year === currentYear) ||
    month < 1 ||
    month > 12 ||
    year < +currentYear ||
    year > +currentYear + 10
  ) {
    return {
      [EXPIRE_CARD_DATE_ERROR_NAME]: true,
    };
  }

  return null;
};
