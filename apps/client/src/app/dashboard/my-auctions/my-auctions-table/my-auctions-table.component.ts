import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { delay, filter, switchMap, tap } from 'rxjs';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { getterPaginator, getterSort } from '@ocean/material';
import { IconType } from '@ocean/icons';
import { UserAuctionsDatasource } from '@ocean/api/data';
import { JobProvider, JobStatus } from '@ocean/api/services';
import { PromptDialogComponent } from '@ocean/shared/dialogs';
import { LocalizationService } from '@ocean/internationalization';

@Component({
  selector: 'app-my-auctions-table',
  templateUrl: './my-auctions-table.component.html',
})
export class MyAuctionsTableComponent implements OnInit, OnDestroy {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  @Input() source: UserAuctionsDatasource;

  readonly jobAwarded = JobStatus.AWARDED;

  private readonly data = {
    title: this.localizationService.translate('AUCTIONS.DIALOG.DELETE.TITLE'),
    content: this.localizationService.translate('AUCTIONS.DIALOG.DELETE.DESC'),
  };

  readonly columns: string[] = [
    'name',
    'auctionStartDate',
    'type',
    'status',
    'actions',
  ];
  readonly iconType = IconType;

  constructor(
    private readonly jobProvider: JobProvider,
    private readonly dialog: MatDialog,
    private readonly localizationService: LocalizationService
  ) {}

  ngOnInit() {
    this.source.pageSize = 5;
    this.source.setPaginator(this.paginator, getterPaginator(this.paginator));
    this.source.setSort(this.sort, getterSort(this.sort));
  }

  ngOnDestroy() {}

  cancelPrompt = () =>
    this.dialog
      .open(PromptDialogComponent, { data: this.data })
      .afterClosed()
      .pipe(filter(Boolean));

  isLastElementOnPage = (): boolean =>
    this.source.total % this.source.pageSize === 1;

  onDeleteAuction(auctionId: string) {
    this.cancelPrompt()
      .pipe(
        switchMap(() => this.jobProvider.markAsCancel(auctionId)),
        delay(500),
        tap(() => {
          if (this.isLastElementOnPage()) {
            this.paginator.previousPage();
          }
          this.source.refresh();
        }),
        untilDestroyed(this)
      )
      .subscribe();
  }
}
