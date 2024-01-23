import { FormBuilder } from '@angular/forms';
import { duplicateValidator, DUPLICATE_ERROR_NAME } from './duplicate-validator';

describe('find duplicates in form values', () => {
  const key = 'jobItems';
  const fb = new FormBuilder();

  it(`should has ${DUPLICATE_ERROR_NAME} error`, () => {
    const form = fb.group({
      [key]: fb.array([
          fb.group({title: 'sef', description: 'sef'}),
          fb.group({title: 'sef', description: 'sef'}),
        ],
        [
          duplicateValidator('title')
        ])
    });

    expect(form.controls[key].invalid).toEqual(true);
    expect(form.invalid).toEqual(true);
    expect(form.controls[key].errors).toHaveProperty(DUPLICATE_ERROR_NAME, true);
  });

  it(`should has ${DUPLICATE_ERROR_NAME} error (Lower / Upper case)`, () => {
    const form = fb.group({
      [key]: fb.array([
          fb.group({title: 'SEF', description: 'sef'}),
          fb.group({title: 'sef', description: 'sef'}),
        ],
        [
          duplicateValidator('title')
        ])
    });

    expect(form.controls[key].invalid).toEqual(true);
    expect(form.invalid).toEqual(true);
    expect(form.controls[key].errors).toHaveProperty(DUPLICATE_ERROR_NAME, true);
  });

  it('should pass', () => {
    const form = fb.group({
      [key]: fb.array([
          fb.group({title: 'sef', description: 'sef'}),
          fb.group({title: 'sef1', description: 'sef'}),
        ],
        [
          duplicateValidator('title')
        ])
    });

    expect(form.controls[key].invalid).not.toEqual(true);
    expect(form.invalid).not.toEqual(true);
    expect(form.controls[key].errors).toEqual(null);
  });
});
