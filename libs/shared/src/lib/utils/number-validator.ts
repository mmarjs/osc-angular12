import { AbstractControl, ValidatorFn } from '@angular/forms';

const NUMBER_RANGE_ERROR_NAME = 'INVALID_NUMBER_RANGE' as const;

interface Parts {
  integer: number;
  fraction: number;
}

interface NumberRangeErrorValidator {
  [NUMBER_RANGE_ERROR_NAME]: boolean;
  parts: Parts;
}

const onlyPositiveNumbers = (): ValidatorFn => {
  return (control) => {
    if (control.value) {
      return (
        (isNaN(control.value) || control.value < 0) && {
          invalidNumber: true,
          message: 'FORMS.ERRORS.SHOULD_BE_GREATER_THAN_ZERO',
        }
      );
    } else {
      return null;
    }
  };
};

const onlyIntegers = (): ValidatorFn => {
  return (control) => {
    if (control.value) {
      return (
        !control?.value?.toString().match(/^\d+$/) && {
          invalidNumber: true,
          message: 'FORMS.ERRORS.SHOULD_BE_INTEGER',
        }
      );
    } else {
      return null;
    }
  };
};

const digits = (integer = 6, fraction = 0): ValidatorFn => {
  return (control): NumberRangeErrorValidator | null => {
    if (!(control instanceof AbstractControl) || !control?.value) {
      return null;
    }

    const parts: Parts = {
      integer: Math.max(1, integer),
      fraction: Math.max(1, fraction),
    };

    const range = new RegExp(
      `^\\d{1,${parts.integer}}(\\.\\d{1,${parts.fraction}})?$`
    );

    return (
      !range.test(control.value?.toString()) && {
        [NUMBER_RANGE_ERROR_NAME]: true,
        parts,
      }
    );
  };
};

export const NumberValidator = {
  onlyPositiveNumbers,
  onlyIntegers,
  digits,
  NUMBER_RANGE_ERROR_NAME,
};
