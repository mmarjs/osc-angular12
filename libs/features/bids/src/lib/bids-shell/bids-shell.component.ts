// FIXME: see WEB-454
/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { BidProvider, JobProvider, JobStatus } from '@ocean/api/services';
import { Bid, Job } from '@ocean/api/shared';
import { AuctionsFacade, BidsFacade, RouterFacade } from '@ocean/client/state';
import { LocalizationService } from '@ocean/internationalization';
import { PromptDialogComponent, PromptDialogData } from '@ocean/shared/dialogs';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { filter, first, map, Observable, switchMap, tap } from 'rxjs';

@Component({
  selector: 'ocean-bids-shell',
  templateUrl: './bids-shell.component.html',
  styleUrls: ['./bids-shell.component.scss'],
})
export class BidsShellComponent implements OnInit, OnDestroy {
  auction$: Observable<Job> = this.activatedRoute.data.pipe(
    map(({ auction }) => auction as Job)
  );
  title = '';
  auction: Job = {};
  acceptedBid: Bid = {};
  auctionStatus = JobStatus;
  data: PromptDialogData = {
    title: this.localizationService.translate('COMMON.INFO.CANCEL_REPAIR'),
    content: this.localizationService.translate('COMMON.INFO.REALLY_WANT_TO_CANCEL_REPAIR')
  };

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private bidsFacade: BidsFacade,
    private dialog: MatDialog,
    private jobProvider: JobProvider,
    private routerFacade: RouterFacade,
    private auctionsFacade: AuctionsFacade,
    private localizationService: LocalizationService,
    private bidProvider: BidProvider
  ) { }

  ngOnInit(): void {
    this.title = this.activatedRoute.firstChild?.routeConfig?.data?.title
    this.auction$.pipe(untilDestroyed(this)).subscribe((res) => {
      this.auction = res;
    });

    this.bidsFacade.selectAcceptedBid$.pipe(
      first((bid) => {
        return this.auction.id === bid?.job?.id && !!bid;
      }),
      switchMap((bid) => this.bidProvider.findById({ id: bid?.id }).pipe(
        tap((bid) => this.bidsFacade.setAcceptedBid(bid))
      )),
      untilDestroyed(this)
    ).subscribe();

    this.bidsFacade.bid$.pipe(untilDestroyed(this)).subscribe(res => {
      this.acceptedBid = res;
    });

    this.bidsFacade.loadBids();

    this.router.events
      .pipe(
        filter((evt) => evt instanceof NavigationEnd),
        map(() => this.activatedRoute?.firstChild?.routeConfig?.data?.title),
        tap((title) => (this.title = title)),
        untilDestroyed(this)
      )
      .subscribe();

    this.activatedRoute.params.pipe(
      map((params) => {
        return params.id
      }),
      tap((id) => {
        if (this.auction.status === this.auctionStatus.AWARDED || this.auction.status === this.auctionStatus.JOB_IN_PROGRESS) {
          this.auctionsFacade.getDocuments(id)
        }
      }),
      untilDestroyed(this)).subscribe();
  }

  cancelPrompt() {
    return this.dialog
      .open(PromptDialogComponent, { data: this.data }).afterClosed().pipe(filter(Boolean))
  }

  cancelRepair(auctionId: string) {
    this.cancelPrompt().pipe(
      tap(() => {
        this.jobProvider.markAsCancel(auctionId)
      }),
      untilDestroyed(this)
    ).subscribe(() => {
      this.routerFacade.go({ path: [`/dashboard`] });
    })
  }

  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method, @typescript-eslint/no-empty-function
  ngOnDestroy(): void {
    this.auctionsFacade.setSelectedAuction(undefined);
    this.auctionsFacade.setSelectedDocument(undefined);
  }
}
