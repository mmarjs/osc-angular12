import { FormControl } from '@angular/forms';
import { NumberValidator } from '@ocean/shared/utils/number-validator';

describe('onlyPositiveNumbers validator', () => {
  it.each(['', '0', '1', '1.5', 1, 1.5])('should be valid (%s)', (value) => {
    const control = new FormControl(
      value,
      NumberValidator.onlyPositiveNumbers()
    );
    expect(control.valid).toBe(true);
  });

  it.each(['text', '-1', '-1.5', -1])('should be invalid (%s)', (value) => {
    const control = new FormControl(
      value,
      NumberValidator.onlyPositiveNumbers()
    );
    expect(control.errors).toEqual({
      invalidNumber: true,
      message: 'FORMS.ERRORS.SHOULD_BE_GREATER_THAN_ZERO',
    });
  });
});

describe('onlyIntegers validator', () => {
  it.each(['', '0', '1', '10', 10])('should be valid (%s)', (value) => {
    const control = new FormControl(value, NumberValidator.onlyIntegers());
    expect(control.valid).toBe(true);
  });

  it.each(['text', '-1', '-1.5', -10])('should be invalid (%s)', (value) => {
    const control = new FormControl(value, NumberValidator.onlyIntegers());
    expect(control.errors).toEqual({
      invalidNumber: true,
      message: 'FORMS.ERRORS.SHOULD_BE_INTEGER',
    });
  });
});
