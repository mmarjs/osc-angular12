import { AbstractControl, FormGroup, ValidatorFn } from '@angular/forms';

export type ConditionFn = (form: FormGroup) => boolean;
export const conditionalValidator =
  (validator: ValidatorFn, condition: ConditionFn) =>
  (control: AbstractControl) => {
    const rootForm = control?.root as FormGroup;

    if (condition(rootForm)) {
      return validator(control);
    }

    return null;
  };
