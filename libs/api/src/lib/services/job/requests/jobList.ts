/**
 * JobListRequest
 */

import { JobTypes, Pageable } from '@ocean/api/shared';

export interface JobListRequest {
  searchKey?: string;
  pageable?: Pageable;
}

export interface JobLiveListRequest {
  type?: JobTypes;
  pageable?: Pageable;
}

export enum JobStatus {
  DRAFT = "DRAFT",
  AUCTION_LIVE = "AUCTION_LIVE",
  AUCTION_CANCELLED = "AUCTION_CANCELLED",
  JOB_IN_PROGRESS = "JOB_IN_PROGRESS",
  COMPLETED = "COMPLETED",
  AWARDED = "AWARDED"
}

export interface JobListByStatusRequest {
  status?: JobStatus[];
  pageable?: Pageable;
}
