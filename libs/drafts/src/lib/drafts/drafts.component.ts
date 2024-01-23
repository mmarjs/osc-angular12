/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { Job, PagedResponse } from '@ocean/api/shared';
import { DraftsFacade } from '@ocean/client/state';
import { IconType } from '@ocean/icons';
import { delay, filter, map, Observable, Subscription, tap } from 'rxjs';
import { DraftDialogs, JobDatasource } from '@ocean/api/data';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { MatPaginator, _MatPaginatorBase } from '@angular/material/paginator';

import { MatTable } from '@angular/material/table';

@Component({
  selector: 'ocean-drafts',
  templateUrl: './drafts.component.html',
  styleUrls: ['./drafts.component.scss']
})
export class DraftsComponent implements OnInit, OnDestroy {
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild('draftTable') draftTable!: MatTable<any>;
  source!: JobDatasource;
  drafts$: Observable<PagedResponse<Job>> = this.draftsFacade.drafts$;
  columns = ['id', 'name', 'actions'];
  hidePageSize: boolean = true;
  iconType = IconType;
  dataSource!: PagedResponse<Job>;
  isLoading: boolean = true;
  pagedDataOfMyDraftsSubscription!: Subscription;
  pageSize: number = 5;
  pageSizeOptions = [5, 10, 15, 20];
  pageIndex: number = 0;
  constructor(
    private draftsFacade: DraftsFacade,
    private dialogs: DraftDialogs,
  ) { }

  ngOnInit() {
    this.loadDrafts();
  }

  loadDrafts() {
    this.pagedDataOfMyDraftsSubscription = this.draftsFacade.drafts$.pipe(
      tap(() => this.isLoading = true),
      delay(500),
      filter(res => !!res),
      map(res => {
        this.dataSource = res;
        if (res.data.length < 1 && this.pageIndex == 1) {
          this.paginator.pageIndex = 0;
          this.dispatchLoadDrafts(0);
        }
      })
    ).subscribe(() => {
      this.isLoading = false;
    })
    this.draftsFacade.setSelectedDraft(null);
    this.dispatchLoadDrafts();
  }

  onDelete(id: string) {
    this.dialogs.deletePrompt(id)
      .pipe(
        tap(() => this.draftsFacade.deleteDraft(id)),
        delay(500),
        untilDestroyed(this)
      ).subscribe(() => {
        this.dispatchLoadDrafts();
      })
  }

  pageEvents(event: any) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    const pageable = {
      page: event.pageIndex,
      size: event.pageSize,
    }
    this.draftsFacade.loadDrafts(pageable);
  }

  dispatchLoadDrafts(pageIndex: number = this.pageIndex, pageSize: number = this.pageSize) {
    const pageable = {
      page: pageIndex,
      size: pageSize
    }
    this.draftsFacade.loadDrafts(pageable);
  }

  ngOnDestroy() {
    this.pagedDataOfMyDraftsSubscription.unsubscribe();
  }
}

