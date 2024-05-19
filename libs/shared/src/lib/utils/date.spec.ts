import { getTimeDiffBetweenDates } from './date';

describe('Date', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date('2020-01-01T00:00:00.000Z'));
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  describe('getTimeDiffBetweenDates', () => {
    it('should maximal unit be days', () => {
      expect(
        getTimeDiffBetweenDates(
          new Date(),
          new Date('2020-03-12T02:23:17.000Z')
        )
      ).toEqual({
        days: 71,
        hours: 2,
        minutes: 23,
        seconds: 17,
      });
    });
  });
});
