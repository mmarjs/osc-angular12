import { FormBuilder } from '@angular/forms';
import {
  BOAT_LENGTH_ERROR_NAME,
  boatLengthValidator,
  MIN_BOAT_LENGTH_IN_FEET,
  MAX_BOAT_LENGTH_IN_FEET,
  normalizeBoatLength
} from './boat-length-validator';

describe('boat validator (FORM)', () => {
  const fb = new FormBuilder();
  const key = 'length';

  it.each([
    undefined,
    null,
    '',
    MIN_BOAT_LENGTH_IN_FEET - 1,
    MAX_BOAT_LENGTH_IN_FEET + 1,
    'this is my boat',
    '054684',
    '50.6',
    50.6
  ])(`should has ${BOAT_LENGTH_ERROR_NAME} error (%s)`, (value) => {
    const form = fb.group({
      [key]: [value, [boatLengthValidator]],
    });

    expect(form.invalid).toEqual(true);
    expect(form.controls[key].errors).toHaveProperty(BOAT_LENGTH_ERROR_NAME, true);
  });

  it.each([50, '50'])(`should be valid (%s)`, (value) => {
    const form = fb.group({
      [key]: [value, [boatLengthValidator]],
    });

    expect(form.valid).toEqual(true);
    expect(form.controls[key].errors).toEqual(null);
  });

});

describe('boat validator (Function)', () => {
  it.each([
    undefined,
    null,
    false,
    true,
    // @ts-ignore
    1n,
    {test: 'test'},
    jest.fn(),
    50.6,
    '50.6'
  ])(`should return ${MIN_BOAT_LENGTH_IN_FEET} for unsupported type (%s)`, (value) => {
    expect(normalizeBoatLength(value)).toEqual(`${MIN_BOAT_LENGTH_IN_FEET}`);
  });

  it(`should return 25 for string type`, () => expect(normalizeBoatLength('25')).toEqual('25'));
  it(`should return 25 for number type`, () => expect(normalizeBoatLength(25)).toEqual('25'));
});
