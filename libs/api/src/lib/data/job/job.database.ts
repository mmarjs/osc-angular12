import { Injectable } from '@angular/core';
import {
  JobFindByBoatIdRequest,
  JobFindByIdRequest,
  JobLiveListRequest,
  JobProvider,
} from '@ocean/api/services';
import { JobDTO, PagedResponse } from '@ocean/api/shared';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class JobDatabase {
  constructor(private api: JobProvider) {}

  fetch(args: JobLiveListRequest): Observable<PagedResponse<JobDTO>> {
    return this.api.getLiveAuctions(args);
  }

  findByBoatId(args: JobFindByBoatIdRequest) {
    return this.api.findByBoatId(args);
  }

  findById(args: JobFindByIdRequest): Observable<JobDTO> {
    return this.api.findById(args);
  }
}
