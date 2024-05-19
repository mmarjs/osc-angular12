// FIXME: see WEB-454
/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import {
  BidProvider,
  DocumentStatus,
  JobProvider,
  JobStatus,
} from '@ocean/api/services';
import { Bid, Job } from '@ocean/api/shared';
import { AuctionsFacade, BidsFacade, RouterFacade } from '@ocean/client/state';
import { LocalizationService } from '@ocean/internationalization';
import { PATHS } from '@ocean/shared';
import { PromptDialogComponent, PromptDialogData } from '@ocean/shared/dialogs';
import { Document } from 'libs/documents/src/lib/state/models';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { filter, first, map, Observable, of, switchMap, tap } from 'rxjs';
import { ROUTE_MAPPING } from '../bids.module';

type FullData = { auction: Job; bid?: Bid; document?: Document };

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
    content: this.localizationService.translate(
      'COMMON.INFO.REALLY_WANT_TO_CANCEL_REPAIR'
    ),
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
  ) {}

  ngOnInit(): void {
    this.title = this.activatedRoute.firstChild?.routeConfig?.data?.title;
    this.auction$.pipe(untilDestroyed(this)).subscribe((res) => {
      this.auction = res;
    });

    this.loadProperSubroute();

    this.bidsFacade.selectAcceptedBid$
      .pipe(
        first((bid) => this.auction.id === bid?.job?.id && !!bid),
        switchMap((bid) => this.bidProvider.findById({ id: bid?.id })),
        tap((bid) => this.bidsFacade.setAcceptedBid(bid)),
        untilDestroyed(this)
      )
      .subscribe();

    this.bidsFacade.bid$.pipe(untilDestroyed(this)).subscribe((res) => {
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

    this.activatedRoute.params
      .pipe(
        map((params) => params.id),
        tap((id) => {
          if (
            this.auction.status === JobStatus.AWARDED ||
            this.auction.status === JobStatus.JOB_IN_PROGRESS
          ) {
            this.auctionsFacade.getDocuments(id);
          }
        }),
        untilDestroyed(this)
      )
      .subscribe();
  }

  cancelPrompt() {
    return this.dialog
      .open(PromptDialogComponent, { data: this.data })
      .afterClosed()
      .pipe(filter(Boolean));
  }

  cancelRepair(auctionId: string) {
    this.cancelPrompt()
      .pipe(
        tap(() => {
          this.jobProvider.markAsCancel(auctionId);
        }),
        untilDestroyed(this)
      )
      .subscribe(() => {
        this.routerFacade.go({ path: [`/dashboard`] });
      });
  }

  ngOnDestroy(): void {
    this.auctionsFacade.setSelectedAuction(undefined);
    this.auctionsFacade.setSelectedDocument(undefined);
  }

  private getBidAndDocumentInfoForAuction(auction: Job) {
    return this.bidsFacade.selectAcceptedBid$.pipe(
      first((bid) => !!bid),
      switchMap((bid) =>
        this.auctionsFacade.selectedDocument$.pipe(
          first((document) => !!document),
          map((document) => ({ bid, document, auction }))
        )
      )
    );
  }

  private loadProperSubroute() {
    this.auction$
      .pipe(
        switchMap((auction): Observable<FullData> => {
          if (auction.status === JobStatus.AUCTION_LIVE) {
            // no bids and documents for auction yet
            return of({ auction });
          } else {
            return this.getBidAndDocumentInfoForAuction(auction);
          }
        }),
        untilDestroyed(this)
      )
      .subscribe((params) => {
        this.redirectToProperSubpage(params);
      });
  }

  private prepareUrl(p: string, params: Record<string, string>) {
    const path = p.replace(/:(\w+)/g, (_, el) => params[el] ?? '');

    const url = this.router.createUrlTree([path], {
      relativeTo: this.activatedRoute,
    });

    return url;
  }

  private redirectToProperSubpage({ auction, bid, document }: FullData) {
    // eslint-disable-next-line no-useless-escape
    const pathRegex = new RegExp(`${PATHS.AUCTIONS}\/\\d+\/${PATHS.BIDS}`);
    const shouldMakeRedirect = pathRegex.test(this.router.url);
    if (!shouldMakeRedirect) return;

    let url = null;
    const prepUrl = (url: string) =>
      this.prepareUrl(url, { bidId: bid?.id?.toString() ?? '' });
    const documentCompleted = document?.status === DocumentStatus.Completed;

    if (auction.status === JobStatus.JOB_IN_PROGRESS) {
      url = prepUrl(ROUTE_MAPPING.reviewWork);
    } else if (bid?.id) {
      url = prepUrl(ROUTE_MAPPING.documents);
    } else if (documentCompleted) {
      url = prepUrl(ROUTE_MAPPING.deposit);
    } else {
      url = prepUrl(ROUTE_MAPPING.reviewBids);
    }
    this.router.navigateByUrl(url);
  }
}
