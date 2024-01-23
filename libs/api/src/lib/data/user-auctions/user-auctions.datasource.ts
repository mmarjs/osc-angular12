import { Injectable } from '@angular/core';
import { DataSourceItem, ReactiveDataSource } from '@ocean/material';
import { Observable } from 'rxjs';
import { JobListRequest } from '@ocean/api/services';
import { JobDTO, PagedResponse } from '@ocean/api/shared';
import { UserAuctionsDatabase } from './user-auctions.database';

@Injectable()
export class UserAuctionsDatasource extends ReactiveDataSource<
  JobListRequest,
  PagedResponse<JobDTO>,
  any
> {
  constructor(protected database: UserAuctionsDatabase) {
    super();

    this.config = { debug: false };
  }

  rawDefault(): PagedResponse<JobDTO> {
    return {
      data: [],
      currentPageNo: 0,
      totalPages: 1,
      totalRecords: 0,
    };
  }

  rawFetch(args: JobListRequest): Observable<PagedResponse<JobDTO>> {
    return this.database.fetch(args);
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
