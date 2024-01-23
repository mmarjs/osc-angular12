import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import {
  Bid,
  BidItem,
  BidStatus,
  Job,
  Pageable,
  PagedResponse,
  PaymentEvent,
} from '@ocean/api/shared';
import { IconType } from '@ocean/icons';
import { toggle } from '@ocean/animations';
import { catchError, Observable, of, Subscription, tap, forkJoin } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { BidsFacade } from '@ocean/client/state';
import { BidProvider, JobProvider, JobStatus } from '@ocean/api/services';
import { SortItem } from '@ocean/shared';

type StatusType = 'SIGN' | 'PAY' | 'START_REPAIR';

@Component({
  selector: 'ocean-bids-table',
  templateUrl: './bids-table.component.html',
  styleUrls: ['./bids-table.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [toggle()],
})
export class BidsTableComponent implements OnInit, OnDestroy {
  @Output() acceptBid: EventEmitter<Bid> = new EventEmitter();
  @Output() rejectBid: EventEmitter<number> = new EventEmitter();
  @Output() sendMessage: EventEmitter<boolean> = new EventEmitter();

  @Input() bids!: Bid[];
  @Input() source: PagedResponse<Bid>;
  @Input() filterValue!: Observable<string>;
  @Input() sortValue: SortItem;
  @Input() limit: number;
  @Input() hidePageSize: boolean;
  @Input() isReviewBids: boolean = false;
  @Input() isLoading: boolean = true;

  readonly columns = ['name', 'bidPrices', 'bidDates', 'actions'];
  readonly iconType = IconType;

  readonly JOB_STATUS_AWARDED = JobStatus.AWARDED;
  readonly bidStatus = BidStatus;

  isBidLoading: boolean;
  pageable: Pageable;
  bidItems: BidItem[];
  expandedElementId: number | null;
  paymentStatus = PaymentEvent;

  bidByIdSubscription$: Subscription | undefined;
  paginatorSubscription$: Subscription | undefined;
  sourceSubscription$: Subscription | undefined;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private readonly router: Router,
    private readonly bidsFacade: BidsFacade,
    private readonly bidProvider: BidProvider,
    private readonly jobProvider: JobProvider,
    private readonly cd: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.paginatorSubscription$ = this.paginator.page.subscribe((res) => {
      const pageable = {
        page: res.pageIndex,
        size: res.pageSize,
        sort: this.sortValue
          ? `${this.sortValue?.active},${this.sortValue?.direction}`
          : null,
      };
      if (!this.isReviewBids) {
        this.bidsFacade.loadMyBids({ pageable });
      }
    });
  }

  ngOnChanges() {
    if (this.source)
      this.sourceSubscription$ = forkJoin(this.source?.data
        .map((bid: Bid) => this.bidProvider.findById({ id: bid?.id})))
        .subscribe(data => {
          const tempData = this.source.data.map((cell, index) => {
            return {...cell, ...data[index]}
          })
          this.source = {...this.source, data: tempData};
        });
    }

  ngOnDestroy(): void {
    this.bidByIdSubscription$?.unsubscribe();
    this.paginatorSubscription$?.unsubscribe();
    this.sourceSubscription$?.unsubscribe();
  }

  onNavigate(bid: Bid) {
    this.router.navigate([`auctions/${bid.job.id}/edit-details/${bid.id}`]);
  }

  isAuctionEnded(auction: Job) {
    const currentDate = new Date();
    const endDate = new Date(auction.auctionEndDate);
    return (
      currentDate > endDate || auction.status === JobStatus.AUCTION_CANCELLED
    );
  }

  getBidStatus(bid: Bid): StatusType | null {
    // nothing if bid is not accepted and job is not awarded
    if (
      bid.status !== BidStatus.ACCEPTED ||
      bid.job.status !== JobStatus.AWARDED
    ) {
      return null;
    }

    if (bid.job.commissionPaid > bid.startDeposit) {
      return 'START_REPAIR';
    }

    if (bid.job.commissionPaid <= bid.startDeposit) {
      return 'PAY';
    }

    return 'SIGN';
  }

  onBidDetails(bid: Bid) {
    if (this.expandedElementId === bid.id) {
      this.isBidLoading = true;
      this.bidByIdSubscription$ = this.bidProvider
        .findById({ id: bid.id })
        .pipe(
          tap((res) => (this.bidItems = res.bidItems)),
          catchError((err) => {
            this.bidItems = [];
            return of(err);
          })
        )
        .subscribe(() => {
          this.cd.markForCheck();
          this.isBidLoading = false;
        });
    } else {
      this.bidItems = bid.bidItems;
    }
  }

  onViewBidDetails(bid: Bid) {
    this.expandedElementId = this.expandedElementId === bid.id ? null : bid.id;
    this.onBidDetails(bid);
  }

  onStartProgress(bid: Bid) {
    const {
      status: bidStatus,
      job: { status: jobStatus, id },
    } = bid ?? {};

    if (
      bidStatus !== BidStatus.ACCEPTED ||
      jobStatus !== this.JOB_STATUS_AWARDED ||
      typeof id !== 'number'
    ) {
      return;
    }

    this.jobProvider.markAsInProgress({
      id,
    });
  }
}
