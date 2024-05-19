import { registerTimezone, reset } from 'mock-browser-timezone';
import { tz } from 'moment-timezone';
import * as timezoneMock from 'timezone-mock';
import { getFormattedTimeZones, guessTimeZone } from './timeZones';

jest.mock('moment-timezone', () => {
  const moment = jest.requireActual('moment-timezone');
  return {
    ...moment,
    tz: moment.tz,
  };
});

describe('timeZones', () => {
  afterEach(() => {
    reset();
    timezoneMock.unregister();
    jest.clearAllMocks();
    jest.resetAllMocks();
  });

  it('should return a list of time zones sorted by UTC offset', () => {
    const timeZones = getFormattedTimeZones();
    expect(timeZones).toMatchSnapshot();
  });

  it.each([
    ['Australia/Adelaide', 'Australia/Adelaide'],
    ['Etc/GMT-8', 'Asia/Brunei'],
    ['Brazil/East', 'America/Araguaina'],
    ['US/Pacific', 'America/Creston'],
  ])('should guess the %s time zone', (actual, expected) => {
    registerTimezone(actual);
    timezoneMock.register(actual as timezoneMock.TimeZone);

    jest.spyOn(tz, 'guess').mockReturnValue('Imaginary/Time_Zone');
    expect(guessTimeZone()).toMatchObject({ value: expected });
  });

  it("should return timezone if it's in the list", () => {
    registerTimezone('Europe/Paris');
    expect(guessTimeZone()).toMatchObject({ value: 'Europe/Paris' });
  });
});
