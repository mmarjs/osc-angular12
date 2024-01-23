import { TimeCounter } from '@ocean/api/shared';
import * as moment from 'moment';
import { unitOfTime } from 'moment';

export function getTimezoneOffset(): number {
  return new Date().getTimezoneOffset();
}

export function diff(date: Date, dateDiff: Date, unit?: unitOfTime.Diff): number {
  return moment(date).diff(moment(dateDiff), unit);
}

export function isBefore(isBeforeDate: Date, dateToCheck: Date = new Date()) {
  return moment(isBeforeDate).isBefore(dateToCheck);
}

export function getTimeDiffBetweenDates(date: Date, dateDiff: Date): TimeCounter {
  const futureDate = moment(dateDiff);

  if (futureDate.isBefore(date)) {
    return null;
  }

  const timeDiff = futureDate.toDate().getTime() - date.getTime();
  const duration = moment.duration(timeDiff);

  return {
    days: duration.days(),
    hours: duration.hours(),
    minutes: duration.minutes(),
    seconds: duration.seconds()
  };
}
