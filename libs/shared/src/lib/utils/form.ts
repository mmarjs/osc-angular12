import { AbstractControl } from "@angular/forms";

export function isRequired(field: AbstractControl) {
  if (field.validator) {
    const validator = field.validator(field);
    if (validator && validator.required) {
      return true;
    }
  }
  return false;
}
