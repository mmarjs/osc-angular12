/**
 * LocalDate
 */

import { Era } from './era';
import { IsoChronology } from './isoChronology';

export interface LocalDate {
  chronology?: IsoChronology;
  dayOfMonth?: number;
  dayOfWeek?: string;
  dayOfYear?: number;
  era?: Era;
  leapYear?: boolean;
  month?: string;
  monthValue?: number;
  year?: number;
}
