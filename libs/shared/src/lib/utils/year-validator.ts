import { ValidatorFn } from '@angular/forms';

const yearCheck = (): ValidatorFn => {
  return (control) => {
    const year: string = control.value;
    const currentYear: number = new Date().getFullYear();
    const minYear = 1960;

    const formatError = {
      invalidDate: true,
      message: 'FORMS.ERRORS.YEAR_FORMAT',
    };

    if (typeof year === 'string') {
      if (year.length !== 4) {
        return formatError;
      }

      if (+year > currentYear) {
        return {
          invalidDate: true,
          message: 'FORMS.ERRORS.SHOULD_NOT_GREATER_THAN_CURRENT_YEAR',
        };
      }

      if (+year < minYear) {
        return {
          invalidDate: true,
          message: {
            translation: 'FORMS.ERRORS.SHOULD_NOT_LESS_THAN',
            params: { value: minYear },
          },
        };
      }
    } else {
      return formatError;
    }
  };
};

export const YearValidator = {
  yearCheck,
};
