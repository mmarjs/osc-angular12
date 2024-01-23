import { FormControl, FormGroup, Validators } from '@angular/forms';
import { conditionalValidator } from './conditional-validator';

describe('conditionalValidator', () => {
  it('should return null if the condition is false', () => {
    const validator = conditionalValidator(
      Validators.compose([Validators.required, Validators.minLength(3)]),
      () => false
    );
    const form = new FormControl('a');
    expect(validator(form)).toBeNull();
  });

  it('should return the validator result if the condition is true', () => {
    const validator = conditionalValidator(
      Validators.compose([Validators.required, Validators.minLength(3)]),
      () => true
    );
    const form = new FormControl('a');
    expect(validator(form)).toEqual({
      minlength: { requiredLength: 3, actualLength: 1 },
    });
  });

  it('should pass root form to the condition callback', () => {
    const fn = jest.fn(() => true);
    let form: FormGroup;
    const validator = conditionalValidator(
      Validators.compose([Validators.required, Validators.minLength(3)]),
      fn
    );
     form = new FormGroup({
      data: new FormGroup({
        obj: new FormGroup({
          name: new FormControl(),
        }),
      }),
    });

    form.get('data.obj.name').setValidators(validator);

    form.setValue({ data: { obj: { name: 'Bruce Lee' } } });

    expect(fn).toHaveBeenCalledWith(form);
    expect(fn).toHaveBeenCalledTimes(1);
  });
});
