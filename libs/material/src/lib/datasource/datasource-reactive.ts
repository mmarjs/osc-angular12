import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MatDataSource } from './datasource';
import {
  nonNumericPageSize,
  setPageSize,
  srcAdded,
  srcEmpty
} from './messages';
import { DataSourceGetter, DataSourceItem } from './types';

export abstract class ReactiveDataSource<REQ, RAW, RES> extends MatDataSource<
  REQ,
  RAW,
  RES
> {
  /**
   * Pagination Settings
   */
  get pageSize() {
    return this._pageSize;
  }
  set pageSize(size: number) {
    if (size) {
      this._logger.check(isNaN(Number(size)), nonNumericPageSize());
      this._logger.print(setPageSize(), Number(size));
      this._pageSize = Number(size);
    }
  }
  private _pageSize = 10;

  // be sure the paginator's view has been initialized
  setPaginator(
    paginator: MatPaginator,
    getter: (pageSize: number) => DataSourceGetter<REQ>
  ) {
    this._logger.debug(
      srcAdded('MatPaginator'),
      srcEmpty('MatPaginator'),
      paginator
    );

    this.addOptional({
      name: 'MatPaginator',
      stream: paginator.page,
      getter: getter(this.pageSize)
    });
  }

  // sort changes emitted will trigger an update
  setSort(sort: MatSort, getter: DataSourceGetter<REQ>) {
    this._logger.debug(srcAdded('MatSort'), srcEmpty('MatSort'), sort);

    this.addOptional({
      name: 'MatSort',
      stream: sort?.sortChange,
      getter
    });
  }

  /**
   * Attachs an autocompleter with this data source filtered. Note that
   * the stream provided will be accessed during change detection and should not directly change
   * values that are bound in template views.
   * @returns Observable that emits a new value when the data changes.
   */
  attach(): Observable<Array<DataSourceItem>> {
    return this.connect().pipe(map(res => this.resFilter(res)));
  }

  // customized filter trigger
  abstract filter(query: string, limit: number): void;

  // customized result mapper
  abstract resFilter(result: Array<RES>): Array<DataSourceItem>;
}
