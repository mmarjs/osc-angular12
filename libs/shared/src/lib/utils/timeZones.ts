import { tz } from 'moment-timezone';

const DEFAULT_TIMEZONE = {
  title: '(-04:00) America/New_York',
  value: 'America/New_York',
};

function prepareTimeZone(obj: { title: string; value: string }) {
  const { title, value } = obj;
  return { title, value };
}

function timezonesList() {
  const list = tz.names().map((e) => ({
    title: '(' + tz(e).format('Z') + ') ' + e,
    value: e,
    offset: tz(e).utcOffset(),
  }));

  return list;
}

export function getFormattedTimeZones() {
  const list = timezonesList();

  list.sort((a, b) => a.offset - b.offset);

  return list.map((e) => prepareTimeZone(e));
}

function guesByOffset() {
  const list = timezonesList();
  const offset = -new Date().getTimezoneOffset();
  const timezoneByOffset = list.find((e) => e.offset === offset) ?? DEFAULT_TIMEZONE;
  return prepareTimeZone(timezoneByOffset);
}

export function guessTimeZone() {
  const list = timezonesList();
  try {
    const timezone = tz.guess();

    const timezoneInList = list.find((e) => e.value === timezone);
    if (timezoneInList) {
      return prepareTimeZone(timezoneInList);
    }
    return guesByOffset();
  } catch (error) {
    return guesByOffset();
  }
}
