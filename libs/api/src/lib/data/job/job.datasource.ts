import { Injectable } from '@angular/core';
import { DataSourceItem, ReactiveDataSource } from '@ocean/material';
import { Observable } from 'rxjs';

import { JobListRequest, JobLiveListRequest } from '@ocean/api/services';
import { JobDTO, JobTypes, PagedResponse, UserTypeTitle, UserTypeTitles } from '@ocean/api/shared';
import { JobDatabase } from './job.database';
import { UserFacade } from '@ocean/api/state';

@Injectable()
export class JobDatasource extends ReactiveDataSource<
JobListRequest,
PagedResponse<JobDTO>,
any
> {
  userType:UserTypeTitle
  constructor(protected database: JobDatabase,private userFacade:UserFacade) {
    super();
    this.userFacade.userType$.subscribe(type=>{
      this.userType=type
    })
    this.config = { debug: false };
  }
  rawDefault(): PagedResponse<JobDTO> {
    return {
      data: [],
      currentPageNo: 1,
      totalPages: 1,
      totalRecords: 0
    };
  }

  rawFetch(args: JobLiveListRequest): Observable<PagedResponse<JobDTO>> {
      let params={
      type:this.userType === UserTypeTitles.SHIPYARD ? JobTypes.REPAIR : JobTypes.SURVEY,
      page:args.pageable.page,
      size:args.pageable.size
    }
    return this.database.fetch(params);
  }

  rawTotal(result: PagedResponse<JobDTO>) {
    return result.totalRecords;
  }

  rawResult(result: PagedResponse<JobDTO>): Array<JobDTO> {
    return result.data;
  }

  filter(query: string, limit: number): void {
    throw new Error('Method not implemented.');
  }

  resFilter(result: Array<JobDTO>): DataSourceItem[] {
    throw new Error('Method not implemented.');
  }
}
