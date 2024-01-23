import * as moment from 'moment-timezone';

export interface FormattedTimeZone {
  title: string;
  value: string;
}

export function getFormattedTimeZones(): FormattedTimeZone[] {
  return moment.tz.names().map(e => ({title: '(' + moment.tz(e).format('Z') + ') ' + e, value: e}));
}
