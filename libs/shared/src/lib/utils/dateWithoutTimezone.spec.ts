import { dateWithoutTimezone } from '@ocean/shared/utils/dateWithoutTimezone';

describe('date without timezone', () => {
  it('should not match default iso string', () => {
    const date = new Date().toISOString();
    expect(date).not.toEqual(dateWithoutTimezone(date));
  });
});
