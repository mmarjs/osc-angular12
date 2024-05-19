import {
  EXPIRE_CARD_DATE_ERROR_NAME,
  expireCardDateValidator,
} from '@ocean/shared/utils/expire-card-date-validator';
import { FormBuilder } from '@angular/forms';

describe('Expire Card Date Validator', () => {
  const fb = new FormBuilder();
  const key = 'expireDate';
  const form = fb.group({
    [key]: ['', expireCardDateValidator],
  });

  beforeEach(() => {
    const mockedDate = new Date('2023-2-1');

    jest.useFakeTimers();
    jest.setSystemTime(mockedDate);
  });

  afterAll(() => {
    jest.setSystemTime(jest.getRealSystemTime());
    jest.useRealTimers();
  });

  it('should return null', () =>
    expect(expireCardDateValidator(undefined)).toEqual(null));

  it.each([
    '',
    '0323',
    '03/23/84',
    '0/98',
    '97/1',
    '97/98',
    '-5/23',
    '23/-5',
    null,
    undefined,
  ])('should be invalid (%s)', (value) => {
    form.get(key)?.setValue(value);
    expect(form.valid).toEqual(false);
    expect(form.controls[key].errors).toHaveProperty(
      EXPIRE_CARD_DATE_ERROR_NAME,
      true
    );
  });

  it.each(['01/23', '00/23', '19/23', '01/22', '10/22', null, undefined])(
    'should has invalid date (%s)',
    (value) => {
      form.get(key)?.setValue(value);
      expect(form.valid).toEqual(false);
      expect(form.controls[key].errors).toHaveProperty(
        EXPIRE_CARD_DATE_ERROR_NAME,
        true
      );
    }
  );

  it.each(['02/23', '03/23', '12/23', '01/30', '10/29'])(
    'should be valid (%s)',
    (value) => {
      form.get(key)?.setValue(value);
      expect(form.invalid).toEqual(false);
      expect(form.controls[key].errors).toEqual(null);
    }
  );
});
