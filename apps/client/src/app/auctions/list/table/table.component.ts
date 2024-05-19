import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { Subscription } from 'rxjs';
import { JobDatasource, JobDialogs } from '@ocean/api/data';
import { BidsFacade } from '@ocean/client/state';
import { getterPaginator } from '@ocean/material';
import { BidDTO, JobDTO } from '@ocean/api/shared';
import { STORAGE_BID_STATUS_KEY } from '@ocean/shared/constants/storage';

@Component({
  selector: 'app-auctions-list-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class AuctionsListTableComponent implements OnInit, OnDestroy {
  @Input() source: JobDatasource;
  @Input() hidePageSize: boolean;
  @Input() limit: number;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  readonly columns = ['info'];

  bids: BidDTO[];
  bidsFacadeSubscribe$: Subscription | undefined;

  constructor(
    private readonly dialogs: JobDialogs,
    private readonly bidsFacade: BidsFacade
  ) {}

  ngOnInit() {
    this.source.pageSize = this.limit;

    if (this.source?.setPaginator) {
      this.source.setPaginator(this.paginator, getterPaginator(this.paginator));
    }

    this.bidsFacade.loadMyBids({
      pageable: {
        page: 0,
        size: 299,
      },
    });

    this.bidsFacadeSubscribe$ = this.bidsFacade.bids$.subscribe((res) => {
      this.bids = res;
    });
  }

  ngOnDestroy() {
    this.bidsFacadeSubscribe$?.unsubscribe();
  }

  onAccept(e: MouseEvent, row: JobDTO) {
    e.preventDefault();
    e.stopPropagation();

    this.dialogs.acceptPrompt(row).subscribe(() => this.source.refresh());
  }

  findBidById = (auction: JobDTO) =>
    this.bids.find((bid) => bid.job.id === auction.id);

  storeIsBidded(auction: JobDTO) {
    localStorage.setItem(
      STORAGE_BID_STATUS_KEY,
      JSON.stringify(!!this.findBidById(auction))
    );
  }
}
