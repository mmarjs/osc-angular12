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
} from '@ocean/api/shared';
import { IconType } from '@ocean/icons';
import { toggle } from '@ocean/animations';
import { catchError, Observable, of, Subscription, tap } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { BidsFacade } from '@ocean/client/state';
import { BidProvider, JobProvider, JobStatus } from '@ocean/api/services';
import { SortItem } from '@ocean/shared';

@Component({
  selector: 'ocean-bids-table',
  templateUrl: './bids-table.component.html',
  styleUrls: ['./bids-table.component.scss'],
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

  bidByIdSubscription$?: Subscription;
  paginatorSubscription$?: Subscription;
  sourceSubscription$?: Subscription;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private readonly router: Router,
    private readonly bidsFacade: BidsFacade,
    private readonly bidProvider: BidProvider,
    private readonly jobProvider: JobProvider,
    private readonly cd: ChangeDetectorRef
  ) { }

  canUpdateBid(element: Bid) {
    const canUpdateBidStatuses = [BidStatus.NA, BidStatus.IN_REVIEW];
    if (canUpdateBidStatuses.includes(element.status)) {
      return true;
    }

    const canUpdateBidJobStatuses = [JobStatus.AUCTION_LIVE, JobStatus.DRAFT];
    if (canUpdateBidJobStatuses.includes(element.job.status)) {
      return true;
    }

    return false;
  }

  ngOnInit() {
    this.paginatorSubscription$ = this.paginator.page.subscribe((res) => {
      if (!this.isReviewBids) {
        const pageable = {
          page: res.pageIndex,
          size: res.pageSize,
          sort: this.sortValue
            ? `${this.sortValue?.active},${this.sortValue?.direction}`
            : null,
        };
        this.bidsFacade.loadMyBids({ pageable });
      }
    });
  }

  ngOnDestroy(): void {
    this.bidByIdSubscription$?.unsubscribe();
    this.paginatorSubscription$?.unsubscribe();
    this.sourceSubscription$?.unsubscribe();
  }

  onNavigate(bid: Bid) {
    const jobId = bid.job.id;
    if (this.canUpdateBid(bid)) {
      this.router.navigate([`auctions/${jobId}/edit-details/${bid.id}`]);
    } else {
      this.router.navigate([`auctions/${jobId}/details`]);
    }
  }

  isAuctionEnded(auction: Job) {
    const currentDate = new Date();
    const endDate = new Date(auction.auctionEndDate);
    return (
      currentDate > endDate || auction.status === JobStatus.AUCTION_CANCELLED
    );
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
