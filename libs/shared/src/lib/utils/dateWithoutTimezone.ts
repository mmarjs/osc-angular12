import * as moment from 'moment';
export const dateWithoutTimezone = (date: moment.MomentInput, timestamp= true): string => moment(date).format(`YYYY-MM-DD${timestamp ? 'THH:mm:ss' : ''}`);
