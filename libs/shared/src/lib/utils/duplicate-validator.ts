import { AbstractControl, FormArray, ValidationErrors, ValidatorFn } from '@angular/forms';

export const DUPLICATE_ERROR_NAME = 'duplicate' as const;

interface DuplicateError {
  [DUPLICATE_ERROR_NAME]: boolean;
}

export const duplicateValidator = <K extends string = string>(unique: K): ValidatorFn => {
  return (form: AbstractControl): DuplicateError | null => {
    if (!(form instanceof FormArray) || unique?.length === 0 || form?.controls?.length === 0) {
      return null;
    }

    const controls: AbstractControl[] = form?.controls ?? [];

    const pairs =
      controls
        ?.reduce((perv, cur, idx) => {
          return {
            [cur?.value?.[unique]?.toLowerCase()]: idx,
            ...perv,
          };
        }, {});

    for (const [idx, control] of controls.entries()) {
      const field: AbstractControl | null = controls?.[idx]?.get(unique);
      const errors: ValidationErrors = controls?.[idx]?.errors ?? {};

      if (field?.hasError(DUPLICATE_ERROR_NAME)) {
        const {[DUPLICATE_ERROR_NAME]: _, ...rest} = errors;
        field?.setErrors(rest);
      }

      if (idx !== pairs?.[control?.value?.[unique]?.toLowerCase()]) {
        field?.setErrors({
          ...errors,
          [DUPLICATE_ERROR_NAME]: true
        });

        return {
          [DUPLICATE_ERROR_NAME]: true
        };
      }
    }

    return null;
  };
};
