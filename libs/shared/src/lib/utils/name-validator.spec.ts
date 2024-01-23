import { FormControl } from '@angular/forms';
import { nameValidator } from './name-validator';

describe('Name validator', () => {
  it.each`
    name
    ${'John'}
    ${'Anna-Maria'}
    ${'Daniel Jr'}
    ${"O'Conner"}
    ${'James III'}
  `('should "$name" be valid person name', ({ name }) => {
    const control = new FormControl(name, nameValidator);

    expect(control.valid).toBe(true);
  });

  it.each`
    name
    ${'John!'}
    ${' Anna&Maria'}
    ${'Daniel 3'}
    ${'Daniel (Dan)'}
  `('should "$name" be invalid person name', ({ name }) => {
    const control = new FormControl(name, nameValidator);
    expect(control.errors).toEqual({
      invalidName: true,
      message: 'FORMS.ERRORS.NAME',
    });
  });
});
