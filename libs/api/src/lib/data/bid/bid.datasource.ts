import { Injectable } from '@angular/core';
import { DataSourceItem, ReactiveDataSource } from '@ocean/material';
import { Observable } from 'rxjs';

import { BidFindByBoatIdRequest } from '@ocean/api/services';
import { BidDTO } from '@ocean/api/shared';
import { BidDatabase } from './bid.database';

@Injectable()
export class BidDatasource extends ReactiveDataSource<
BidFindByBoatIdRequest,
Array<BidDTO>,
any
> {
  constructor(protected database: BidDatabase) {
    super();

    this.config = { debug: false };
  }

  rawDefault(): Array<BidDTO> {
    return [];
  }

  rawFetch(args: BidFindByBoatIdRequest): Observable<Array<BidDTO>> {
    return this.database.fetch(args);
  }

  rawTotal(result: Array<BidDTO>) {
    return result.length;
  }

  rawResult(result: Array<BidDTO>): Array<BidDTO> {
    return result;
  }

  filter(query: string, limit: number): void {
    throw new Error('Method not implemented.');
  }

  resFilter(result: Array<BidDTO>): DataSourceItem[] {
    throw new Error('Method not implemented.');
  }
}
