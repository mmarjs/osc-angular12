import { Injectable } from '@angular/core';
import { DataSourceItem, ReactiveDataSource } from '@ocean/material';
import { Observable } from 'rxjs';

import { BoatSearchBoatsRequest } from '@ocean/api/services';
import { BoatOutputDTO, PagedResponse } from '@ocean/api/shared';
import { BoatDatabase } from './boat.database';

@Injectable()
export class BoatDatasource extends ReactiveDataSource<
  BoatSearchBoatsRequest,
  PagedResponse<BoatOutputDTO>,
  any
> {
  constructor(protected database: BoatDatabase) {
    super();

    this.config = { debug: false };
  }

  rawDefault(): PagedResponse<BoatOutputDTO> {
    return {
      data: [],
      currentPageNo: 0,
      totalPages: 1,
      totalRecords: 0,
    };
  }

  rawFetch(
    args: BoatSearchBoatsRequest
  ): Observable<PagedResponse<BoatOutputDTO>> {
    return this.database.fetch(args);
  }

  rawTotal(result: PagedResponse<BoatOutputDTO>) {
    return result.totalRecords;
  }

  rawResult(result: PagedResponse<BoatOutputDTO>): BoatOutputDTO[] {
    return result.data;
  }

  filter(query: string, limit: number): void {
    throw new Error('Method not implemented.');
  }

  resFilter(result: BoatOutputDTO[]): DataSourceItem[] {
    throw new Error('Method not implemented.');
  }
}
