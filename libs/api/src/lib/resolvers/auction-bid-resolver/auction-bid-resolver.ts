import { Injectable, OnDestroy } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { combineLatestWith, firstValueFrom, map, tap } from 'rxjs';
import { first } from 'rxjs/operators';
import { DocumentsFacadeService } from '@ocean/documents';
import { AuctionsFacade } from '@ocean/client/state';
import { JobStatus } from '@ocean/api/services';
import { BidDTO, JobDTO, PaymentEvent } from '@ocean/api/shared';
import { PreloadedDataForAuction } from './types';

@Injectable({
  providedIn: 'root',
})
export class AuctionBidResolver
  implements Resolve<PreloadedDataForAuction>, OnDestroy
{
  private readonly auction$ = this.auctionFacade.selectedAuction$.pipe(
    tap((auction) => {
      if (typeof auction?.id === 'number') {
        this.auctionFacade.getBidByAuction(auction.id);
        if (auction?.status === JobStatus.AWARDED) {
          this.documentsFacade.loadDocuments(auction.id);
        }
      }
    }),
    map((auction) => auction)
  );

  private readonly bid$ = this.auctionFacade.selectedBid$.pipe(
    first((value) => typeof value === 'object')
  );

  private readonly shouldSignDocument$ = this.documentsFacade.documents$.pipe(
    combineLatestWith(this.auction$),
    first(([documents, auction]) => {
      if (auction?.status === JobStatus.AWARDED) {
        return Array.isArray(documents) && documents?.length > 0;
      }

      return !!documents;
    }),
    map(([documents]) => this.documentsFacade.hasActiveValidDocument(documents))
  );

  getFullAmountPaid(auction?: JobDTO, bid?: BidDTO) {
    return auction?.status === JobStatus.COMPLETED
      ? false
      : bid?.paymentItemDTO?.eventType === PaymentEvent.SUCCEEDED;
  }

  getBidAmountPaid(auction?: JobDTO, bid?: BidDTO) {
    return (
      bid?.paymentItemDTO?.eventType === PaymentEvent.SUCCEEDED &&
      auction?.status === JobStatus.AWARDED
    );
  }

  getMessage(shouldSignDocument: boolean, auction?: JobDTO, bid?: BidDTO) {
    if (auction?.status === JobStatus.COMPLETED) {
      return 'AUCTIONS.DETAILS.BID_STATUSES.COMPLETED.DESC';
    }

    switch (bid?.paymentItemDTO?.eventType) {
      case PaymentEvent.SUCCEEDED:
        return 'AUCTIONS.DETAILS.BID_STATUSES.ACCEPTED.FULL_AMOUNT_PAID';
      case PaymentEvent.FAILED:
        return 'AUCTIONS.DETAILS.BID_STATUSES.REJECTED.FULL_AMOUNT_ERROR';
      default:
        return shouldSignDocument
          ? 'AUCTIONS.DETAILS.BID_STATUSES.ACCEPTED.SIGN_DOCUMENTS'
          : 'AUCTIONS.DETAILS.BID_STATUSES.ACCEPTED.WAIT_FOR_BOAT_OWNER';
    }
  }

  constructor(
    private readonly auctionFacade: AuctionsFacade,
    private readonly documentsFacade: DocumentsFacadeService
  ) {}

  async resolve(route: ActivatedRouteSnapshot) {
    const { auction, bid, sign } = await firstValueFrom(
      this.auction$.pipe(
        combineLatestWith(this.bid$, this.shouldSignDocument$),
        map(([a, b, c]) => ({
          auction: a,
          bid: b,
          sign: c,
        }))
      )
    );

    return {
      bid,
      isAbleToSignDocument: sign,
      isFullAmountPaid: this.getFullAmountPaid(auction, bid),
      isBidAmountPaid: this.getBidAmountPaid(auction, bid),
      message: this.getMessage(sign, auction, bid),
    };
  }

  ngOnDestroy() {
    return;
  }
}
