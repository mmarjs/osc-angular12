import * as moment from 'moment';
import type { unitOfTime } from 'moment';

const DAY = 1000 * 60 * 60 * 24;

export function getTimezoneOffset(): number {
  return new Date().getTimezoneOffset();
}

export function diff(
  date: Date,
  dateDiff: Date,
  unit?: unitOfTime.Diff
): number {
  return moment(date).diff(moment(dateDiff), unit);
}

export function isBefore(isBeforeDate: Date, dateToCheck: Date = new Date()) {
  return moment(isBeforeDate).isBefore(dateToCheck);
}

export function getTimeDiffBetweenDates(date: Date, dateDiff: Date) {
  const futureDate = moment(dateDiff);

  if (futureDate.isBefore(date)) {
    return null;
  }

  const timeDiff = futureDate.toDate().getTime() - date.getTime();
  const duration = moment.duration(timeDiff);

  return {
    days: futureDate.diff(date, 'days'),
    hours: duration.hours(),
    minutes: duration.minutes(),
    seconds: duration.seconds(),
  };
}

export function getDiffInDays(
  date: Date | string,
  today: Date | string
): number {
  return Math.floor(
    (new Date(date).getTime() - new Date(today).getTime()) / DAY
  );
}
