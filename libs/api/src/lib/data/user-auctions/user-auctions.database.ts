import { Injectable } from '@angular/core';
import { JobListRequest, JobProvider, JobStatus } from '@ocean/api/services';
import { JobDTO, PagedResponse } from '@ocean/api/shared';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserAuctionsDatabase {
  constructor(private api: JobProvider) {}

  fetch(args: JobListRequest): Observable<PagedResponse<JobDTO>> {
    return this.api.getAuctions({
      pageable: args.pageable,
      status: [JobStatus.AUCTION_LIVE, JobStatus.JOB_IN_PROGRESS, JobStatus.AWARDED],
    });
  }
}
