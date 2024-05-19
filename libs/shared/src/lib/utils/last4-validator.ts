import { AbstractControl, ValidatorFn } from '@angular/forms';

export const LAST4_ERROR_NAME = 'invalidLast4' as const;

interface Last4ValidatorError {
  [LAST4_ERROR_NAME]: boolean;
}

const LENGTH = 4;

const setError = (field: AbstractControl) => {
  field.setErrors({
    ...(field.errors ?? {}),
    [LAST4_ERROR_NAME]: true,
  });
};

const updateFieldStatus = (field: AbstractControl) => {
  if (field.errors?.[LAST4_ERROR_NAME]) {
    field.updateValueAndValidity();
  }
};

export const last4Validator = (
  firstField: string,
  secondField: string
): ValidatorFn => {
  return (form: AbstractControl): Last4ValidatorError | null => {
    const [first, second] = [form.get(firstField), form.get(secondField)];

    if (
      first?.disabled ||
      second?.disabled ||
      typeof first?.value !== 'string' ||
      typeof second?.value !== 'string' ||
      first.value.trim().length < LENGTH ||
      second.value.trim().length < LENGTH
    ) {
      return null;
    }

    const firstLast4 = first.value.slice(-LENGTH);
    const secondLast4 = second.value.slice(-LENGTH);

    if (firstLast4 !== secondLast4) {
      setError(first);
      setError(second);

      return {
        [LAST4_ERROR_NAME]: true,
      };
    } else {
      updateFieldStatus(first);
      updateFieldStatus(second);

      return null;
    }
  };
};
