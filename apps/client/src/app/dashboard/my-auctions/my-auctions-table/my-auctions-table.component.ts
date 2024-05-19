import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { UserAuctionsDatasource } from '@ocean/api/data';
import { JobProvider, JobStatus } from '@ocean/api/services';
import { Job } from '@ocean/api/shared';
import { IconType } from '@ocean/icons';
import { LocalizationService } from '@ocean/internationalization';
import { getterPaginator, getterSort } from '@ocean/material';
import { PromptDialogComponent } from '@ocean/shared/dialogs';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { delay, filter, switchMap, tap } from 'rxjs';
import { AuctionsFacade } from '@ocean/client/state';

@Component({
  selector: 'app-my-auctions-table',
  templateUrl: './my-auctions-table.component.html',
})
export class MyAuctionsTableComponent implements OnInit, OnDestroy {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  @Input() source: UserAuctionsDatasource;

  private readonly data = {
    title: this.localizationService.translate('AUCTIONS.DIALOG.DELETE.TITLE'),
    content: this.localizationService.translate('AUCTIONS.DIALOG.DELETE.DESC'),
  };

  readonly columns = [
    'name',
    'auctionStartDate',
    'type',
    'status',
    'actions',
  ] as const;

  readonly iconType = IconType;

  constructor(
    private readonly jobProvider: JobProvider,
    private readonly dialog: MatDialog,
    private readonly localizationService: LocalizationService,
    private readonly auctionsFacade: AuctionsFacade
  ) {}

  ngOnInit() {
    this.source.pageSize = 5;
    this.source.setPaginator(this.paginator, getterPaginator(this.paginator));
    this.source.setSort(this.sort, getterSort(this.sort));

    this.auctionsFacade.refreshed$
      .pipe(untilDestroyed(this))
      .subscribe((status) => {
        return status && this.refreshOnDelete();
      });
  }

  ngOnDestroy() {}

  cancelPrompt() {
    return this.dialog
      .open(PromptDialogComponent, { data: this.data })
      .afterClosed()
      .pipe(filter(Boolean));
  }

  isLastElementOnPage() {
    return this.source.total % this.source.pageSize === 1;
  }

  shouldShowOnDelete(auction: Job) {
    return auction?.status !== JobStatus.AWARDED;
  }

  getAuctionStatus(auction: Job) {
    const status = auction.status;
    // expired case
    if (
      status === JobStatus.AUCTION_LIVE &&
      new Date(auction?.auctionEndDate) < new Date()
    ) {
      return this.localizationService.translate(`AUCTIONS.STATUS.EXPIRED`);
    }
    return this.localizationService.translate(`AUCTIONS.STATUS.${status}`);
  }

  onDeleteAuction(auctionId: string) {
    this.cancelPrompt()
      .pipe(
        switchMap(() => this.jobProvider.markAsCancel(auctionId)),
        delay(500),
        tap(() => this.refreshOnDelete()),
        untilDestroyed(this)
      )
      .subscribe();
  }

  refreshOnDelete() {
    if (this.isLastElementOnPage()) {
      this.paginator.previousPage();
    }

    this.source.refresh();
  }
}
