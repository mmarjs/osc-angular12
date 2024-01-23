/**
 * JobDTO
 */

import { JobStatus } from '@ocean/api/services';
import { Boat, JobItem } from '.';
import { JobTypes } from './jobTypes';
import { LocalDate } from './localDate';

export interface JobDTO {
  auctionEndDate?: LocalDate | string;
  auctionStartDate?: LocalDate | string;
  boatId?: number;
  description?: string;
  id?: number;
  jobItems?: Array<JobItem>;
  name?: string;
  status?: JobStatus;
  type?: JobTypes; // SURVEY, REPAIR
  commissionPaid?: number;
  currencyCode?: string;
  isStarted?: boolean;
  isFinished?: boolean;
  boat?: Boat;
  bidders?: number;
}
