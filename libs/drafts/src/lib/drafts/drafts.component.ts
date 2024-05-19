/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { Draft, Job, PagedResponse } from '@ocean/api/shared';
import { DraftsFacade } from '@ocean/client/state';
import { IconType } from '@ocean/icons';
import { delay, filter, map, tap } from 'rxjs';
import { DraftDialogs, JobDatasource } from '@ocean/api/data';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { MatPaginator } from '@angular/material/paginator';
import { MatTable } from '@angular/material/table';
import { PageEvent } from '@angular/material/paginator/paginator';

const COLUMNS = ['name', 'actions'] as const;

@Component({
  selector: 'ocean-drafts',
  templateUrl: './drafts.component.html',
  styleUrls: ['./drafts.component.scss'],
})
export class DraftsComponent implements OnInit, OnDestroy {
  readonly iconType = IconType;
  readonly columns = COLUMNS;
  readonly pageSizeOptions = [5, 10, 15, 20];

  @ViewChild(MatSort, { static: true }) readonly sort?: MatSort;

  @ViewChild(MatPaginator, { static: true }) readonly paginator?: MatPaginator;

  @ViewChild('draftTable') readonly draftTable?: MatTable<Draft<Job>>;

  hidePageSize = true;
  isLoading = true;
  pageIndex = 0;
  pageSize = 5;

  source?: JobDatasource;
  dataSource?: PagedResponse<Job>;

  readonly drafts$ = this.draftsFacade.drafts$.pipe(
    filter((res) => !!res),
    map((res) => {
      this.dataSource = res;

      if (
        res?.data?.length < 1 &&
        this.pageIndex >= 1 &&
        this.paginator instanceof MatPaginator
      ) {
        this.paginator.previousPage();
        this.dispatchLoadDrafts(this.paginator.pageIndex);
      }

      return res;
    }),
    tap(() => (this.isLoading = false))
  );

  constructor(
    private readonly draftsFacade: DraftsFacade,
    private readonly dialogs: DraftDialogs
  ) {
    this.drafts$.pipe(untilDestroyed(this)).subscribe();
  }

  ngOnInit() {
    this.loadDrafts();
  }

  loadDrafts() {
    this.draftsFacade.setSelectedDraft(null);
    this.dispatchLoadDrafts();
  }

  onDelete(row: Draft<Job>) {
    const name = row.name;
    this.dialogs
      .deletePrompt(name)
      .pipe(
        tap(() => this.draftsFacade.deleteDraft(row.id)),
        delay(500),
        untilDestroyed(this)
      )
      .subscribe(() => {
        this.dispatchLoadDrafts();
      });
  }

  pageEvents(event: PageEvent) {
    const { pageIndex: page, pageSize: size } = event;
    this.dispatchLoadDrafts(page, size);
  }

  dispatchLoadDrafts(page = this.pageIndex, size = this.pageSize) {
    this.isLoading = true;
    this.draftsFacade.loadDrafts({ page, size });
  }

  ngOnDestroy() {
    return;
  }
}
