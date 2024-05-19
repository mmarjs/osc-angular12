import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { BidDTO, JobDTO } from '@ocean/api/shared';
import { auctionsQuery } from './selectors';
import { PartialState } from './state.partial';
import { AuctionsActions } from './actions';
import { Document } from 'libs/documents/src/lib/state/models';

@Injectable({
  providedIn: 'root',
})
export class AuctionsFacade {
  constructor(private store: Store<PartialState>) {}

  isCreating$: Observable<boolean> = this.store.pipe(
    select(auctionsQuery.getIsCreating)
  );

  isCreateSuccess$: Observable<boolean> = this.store.pipe(
    select(auctionsQuery.getIsCreateSuccess)
  );

  isBidCreating$: Observable<boolean> = this.store.pipe(
    select(auctionsQuery.getIsBidCreating)
  );

  isBidCreated$: Observable<boolean> = this.store.pipe(
    select(auctionsQuery.getIsBidCreated)
  );

  selectedAuction$: Observable<JobDTO> = this.store.pipe(
    select(auctionsQuery.getSelectedAuction)
  );

  selectedDocument$: Observable<Document> = this.store.pipe(
    select(auctionsQuery.getSelectedDocument)
  );

  selectedBid$: Observable<BidDTO> = this.store.pipe(
    select(auctionsQuery.getSelectedBid)
  );

  refreshed$: Observable<boolean> = this.store.pipe(
    select(auctionsQuery.getRefreshStatus)
  );

  init() {
    this.store.dispatch(AuctionsActions.initAuction());
  }

  refresh() {
    this.store.dispatch(
      AuctionsActions.refresh({
        status: true,
      })
    );
  }

  getAuctionById(id: number) {
    this.store.dispatch(
      AuctionsActions.getAuctionById({
        id,
      })
    );
  }

  setSelectedAuction(auction?: JobDTO) {
    this.store.dispatch(
      AuctionsActions.setSelectedAuction({
        auction,
      })
    );
  }

  create(jobDto: JobDTO, files: File[]) {
    this.store.dispatch(
      AuctionsActions.createAuction({
        auction: jobDto,
        files,
      })
    );
  }

  edit(jobDto: JobDTO, files: File[]) {
    this.store.dispatch(
      AuctionsActions.editAuction({
        auction: jobDto,
        files,
      })
    );
  }

  createBid(bidDto: BidDTO) {
    this.store.dispatch(
      AuctionsActions.createBidOnAuction({
        bid: bidDto,
      })
    );
  }

  pay(auctionId: string) {
    this.store.dispatch(
      AuctionsActions.payAuction({
        id: auctionId,
      })
    );
  }

  cancel(auctionId: number) {
    this.store.dispatch(
      AuctionsActions.auctionCancel({
        id: auctionId,
      })
    );
  }

  getBidByAuction(auctionId: number) {
    this.store.dispatch(
      AuctionsActions.getBidByAuction({
        id: auctionId,
      })
    );
  }

  resetSelectedBid() {
    this.store.dispatch(AuctionsActions.resetSelectedBid());
  }

  getDocuments(jobId: number | undefined) {
    if (
      (typeof jobId === 'number' || typeof jobId === 'string') &&
      !isNaN(+jobId)
    ) {
      this.store.dispatch(AuctionsActions.getDocuments({ auctionId: +jobId }));
    }
  }

  setSelectedDocument(document: Document | undefined) {
    this.store.dispatch(
      AuctionsActions.setSelectedDocument({
        document,
      })
    );
  }

  markAsInProgress(auctionId: number) {
    this.store.dispatch(
      AuctionsActions.markAsInProgress({
        id: auctionId,
      })
    );
  }

  markAsCompleted(auctionId: number) {
    this.store.dispatch(
      AuctionsActions.markAsCompleted({
        id: auctionId,
      })
    );
  }

  extendAuctionEndDate(auctionId: number) {
    this.store.dispatch(
      AuctionsActions.extendEndDate({
        id: auctionId,
      })
    );
  }
}
