/**
 * Job
 */

import { Boat, JobStatus } from '@ocean/api/services';
import { NgxFileDropEntry } from 'ngx-file-drop';
import { Bid } from './bid';
import { JobItem } from './jobItem';
// import { LocalDate } from './localDate';
import { StoredObjectDescriptor } from './storedObjectDescriptor';

export interface Job {
  auctionEndDate?: Date;
  auctionStartDate?: Date;
  bids?: Array<Bid>;
  description?: string;
  id?: number;
  jobItems?: Array<JobItem>;
  name?: string;
  objects?: StoredObjectDescriptor;
  status?: JobStatus;
  type?: string;
  isStarted?: boolean;
  isFinished?: boolean;
  boat?:Boat
}

export interface JobItemNote {
  text: string;
  files: NgxFileDropEntry[];
}

export enum DurationUnit {
  HOURS = 'HOURS',
  DAYS = 'DAYS',
  MONTHS = 'MONTHS'
}

export interface BiddingTableFormModel {
  id: number;
  title: string;
  amount: number;
  quantity?: number;
  isStoredinDB: boolean;
  description: string;
  note?: JobItemNote;
  comments?:string;
}
