import { AbstractControl } from '@angular/forms';

interface LengthValidatorError {
  [BOAT_LENGTH_ERROR_NAME]: boolean;
}

export const BOAT_LENGTH_ERROR_NAME = 'invalidBoatLength' as const;
export const MIN_BOAT_LENGTH_IN_FEET = 1;
export const MAX_BOAT_LENGTH_IN_FEET = 100;
export const LENGTH_PATTERN = /^[1-9][0-9]*$/;

const isValid = (value: string | number): boolean => {
  if (typeof value === 'string' && LENGTH_PATTERN.test(value)) {
    const parsedValue = parseInt(value, 10);
    return !isNaN(parsedValue) && parsedValue >= MIN_BOAT_LENGTH_IN_FEET && parsedValue <= MAX_BOAT_LENGTH_IN_FEET;
  }

  return Number.isInteger(value) && value >= MIN_BOAT_LENGTH_IN_FEET && value <= MAX_BOAT_LENGTH_IN_FEET;
};

export const boatLengthValidator = (control: AbstractControl): LengthValidatorError | null => {
  if (typeof control?.value !== 'string' && typeof control?.value !== 'number') {
    return {
      [BOAT_LENGTH_ERROR_NAME]: true
    };
  }

  if (!isValid(control.value)) {
    return {
      [BOAT_LENGTH_ERROR_NAME]: true
    };
  }

  return null;
};

export const normalizeBoatLength = (value: unknown): string => {
  if ((typeof value !== 'string' && typeof value !== 'number') || !isValid(value)) {
    return `${MIN_BOAT_LENGTH_IN_FEET}`;
  }

  return `${value}`;
};
