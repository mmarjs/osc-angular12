import { ADULT_AGE, getValidBirthDateInterval, OLD_AGE } from '@ocean/shared/utils/getValidBirthDateInterval';

describe('Get valid birthdate range', () => {
  it('should return valid range', () => {
    const mockedDate = new Date('2023-1-12');

    jest.useFakeTimers();
    jest.setSystemTime(mockedDate);

    const date = new Date();
    const minDate = new Date(date.getFullYear() - OLD_AGE, date.getMonth(), date.getDate());
    const maxDate = new Date(date.getFullYear() - ADULT_AGE, date.getMonth(), date.getDate());

    expect(new Date().valueOf()).toBe(mockedDate.valueOf());
    expect(getValidBirthDateInterval(date)).toEqual({
      minDate,
      maxDate
    });
  });
});
