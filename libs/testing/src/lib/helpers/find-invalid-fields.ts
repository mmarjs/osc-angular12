import { FormGroup } from '@angular/forms';

export const findInvalidFields = (form: FormGroup) => {
  const invalid = [];
  const controls = form.controls;
  for (const name in controls) {
    if (controls[name].invalid) {
      invalid.push(name);
    }
  }
  return invalid;
};
