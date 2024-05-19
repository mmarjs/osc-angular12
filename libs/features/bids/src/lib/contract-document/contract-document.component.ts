import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Params, Router } from '@angular/router';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import {
  Document,
  DocumentProvider,
  DocumentStatus,
  UserStatus,
} from '@ocean/api/services';
import { PaymentEvent } from '@ocean/api/shared';
import { AuctionsFacade, BidsFacade } from '@ocean/client/state';
import { DocumentViewerComponent } from 'libs/dialogs/src/lib/document-viewer/document-viewer.component';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { catchError, filter, of, switchMap } from 'rxjs';
import { tap } from 'rxjs/operators';
import { getSignLink, getValidatedSignLink } from './helpers';

@Component({
  selector: 'ocean-contract-document',
  templateUrl: './contract-document.component.html',
  styleUrls: ['./contract-document.component.scss'],
})
export class ContractDocumentComponent implements OnInit, OnDestroy {
  readonly documentStatus = DocumentStatus;
  readonly userStatus = UserStatus;
  readonly paymentStatus = PaymentEvent;

  readonly bid$ = this.bidsFacade.bid$;

  bidId?: number | string;
  jobId?: number | string;

  document?: Document;
  isLoading?: boolean;
  link?: string;

  constructor(
    private readonly documentsProvider: DocumentProvider,
    private readonly matDialog: MatDialog,
    private readonly auctionsFacade: AuctionsFacade,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly bidsFacade: BidsFacade
  ) {}

  ngOnInit() {
    this.route.params
      .pipe(
        tap((params) => this.setJobAndBid(params)),
        filter(() => this.filterByValidJobId()),
        switchMap(() =>
          this.documentsProvider.getDocumentsForJob(this.jobId as number).pipe(
            tap(() => this.setLoadingStatus(true)),
            switchMap((documents) =>
              getSignLink(this.documentsProvider, documents)
            ),
            tap(([document, link]) => {
              this.link = getValidatedSignLink(link);
              this.document = document;

              this.setLoadingStatus(false);
            }),
            catchError(() => this.setLoadingStatus(false))
          )
        ),
        untilDestroyed(this)
      )
      .subscribe();
  }

  viewDocument() {
    this.matDialog.open(DocumentViewerComponent, {
      height: '900px',
      width: '100%',
      disableClose: true,
      data: {
        link: this.link,
        jobId: this.jobId,
      },
    });
  }

  gotoDepositPage() {
    this.router.navigate(['../../deposit', this.bidId], {
      relativeTo: this.route,
    });
  }

  private setJobAndBid(params: Params) {
    this.jobId = params.id;
    this.bidId = params.bidId;
  }

  private filterByValidJobId() {
    return (
      typeof this.jobId === 'number' ||
      (typeof this.jobId === 'string' && !isNaN(+this.jobId))
    );
  }

  private setLoadingStatus(status: boolean) {
    this.isLoading = status;
    return of(status);
  }

  ngOnDestroy() {
    return;
  }
}
