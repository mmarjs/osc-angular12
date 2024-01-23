import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, withLatestFrom } from 'rxjs/operators';
import { of, switchMap, tap, zip } from 'rxjs';
import {
  BidProvider,
  DocumentProvider,
  JobProvider,
} from '@ocean/api/services';
import { NotifierService } from '@ocean/shared/services';
import { BidStatus } from '@ocean/api/shared';
import { PATHS } from '@ocean/shared';
import { RouterFacade } from '../router';
import { AuctionsActions } from './actions';
import { AuctionsFacade } from '.';
import { ImageFacadeService } from '@ocean/client/state/images/image-facade.service';
import { UserFacade } from '@ocean/api/state';

@Injectable()
export class AuctionsEffects {
  constructor(
    private readonly notifier: NotifierService,
    private readonly translate: TranslateService,
    private readonly jobProvider: JobProvider,
    private readonly bidProvider: BidProvider,
    private readonly auctionsFacade: AuctionsFacade,
    private readonly actions$: Actions,
    private readonly routerFacade$: RouterFacade,
    private readonly imagesFacade: ImageFacadeService,
    private readonly documentsProvider: DocumentProvider,
    private readonly userFacade: UserFacade,
    private readonly imageFacadeService: ImageFacadeService
  ) {}

  getAuction$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuctionsActions.getAuctionById),
      mergeMap(({ id }) => this.jobProvider.findById({ id })),
      map((auction) => AuctionsActions.setSelectedAuction({ auction })),
      tap((resp) => AuctionsActions.getAuctionByIdSuccess({ auction: resp.auction })),
      catchError((err) => {
        this.notifier.error(err?.message ?? 'Error');
        return of(
          AuctionsActions.getAuctionByIdFailure({
            error: err,
          })
        );
      })
    )
  );

  createAuction$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuctionsActions.createAuction),
      switchMap(({ auction, files }) =>
        zip(this.jobProvider.createJob({ job: auction }), of(files))
      ),
      map(([auction, files]) => {
        this.imagesFacade.updateImages(files, auction.id, auction.name);
        return AuctionsActions.setSelectedAuction({ auction });
        // return AuctionsActions.createAuctionSuccess({auction});
      }),
      tap((response) => {
        AuctionsActions.createAuctionSuccess({ auction: response.auction });
      }),
      tap(({ auction }) => {
        const translateValue = this.translate.instant(
          'AUCTIONS.AUCTION_CREATED'
        );
        this.notifier.success(translateValue);
        this.routerFacade$.go({
          path: [`/auctions/${auction.id}/payment`],
        });
      }),
      catchError((err) => {
        this.notifier.error(err?.message ?? 'Error');
        return of(
          AuctionsActions.createAuctionFailure({
            error: err,
          })
        );
      })
    )
  );

  editAuction$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuctionsActions.editAuction),
      withLatestFrom(this.auctionsFacade.selectedAuction$),
      switchMap(([{ auction, files }, { id }]) => {
        this.imagesFacade.updateImages(files, id, auction.name);
        return this.jobProvider.editJob({ job: { ...auction, id } });
      }),
      tap(() => {
        const translateValue = this.translate.instant(
          'AUCTIONS.AUCTION_UPDATED'
        );
        this.notifier.success(translateValue);
      }),
      map((auction) => AuctionsActions.setSelectedAuction({ auction })),
      tap((resp) =>
        AuctionsActions.editAuctionSuccess({ auction: resp.auction })
      ),
      tap(({ auction }) => {
        this.notifier.success('Auction updated');
        this.routerFacade$.go({
          path: [`/auctions/${auction.id}/payment`],
        });
      }),
      catchError((err) => {
        this.notifier.error(err?.message ?? 'Error');
        return of(
          AuctionsActions.editAuctionFailure({
            error: err,
          })
        );
      })
    )
  );

  setSelectedAuction$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuctionsActions.setSelectedAuction),
        withLatestFrom(this.userFacade.id$),
        tap(([{ auction }, id]) => {
          if (typeof auction?.id === 'number') {
            this.imageFacadeService.loadImages(auction.id, id);
          }
        })
      ),
    { dispatch: false }
  );

  bidOnAuction$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuctionsActions.createBidOnAuction),
      withLatestFrom(this.auctionsFacade.selectedAuction$),
      switchMap(([{ bid }, { id: jobId }]) =>
        this.bidProvider.createBid({ bidDto: { ...bid, jobId } })
      ),
      map((bid) => {
        const translateValue = this.translate.instant('BIDS.BID_CREATED');
        this.notifier.success(translateValue);
        return AuctionsActions.createBidOnAuctionSuccess({
          bid: {
            ...bid,
            status: BidStatus.IN_REVIEW,
          },
        });
      }),
      catchError((err) => {
        this.notifier.error(err?.message ?? 'Error');
        return of(
          AuctionsActions.createBidOnAuctionFailure({
            error: err,
          })
        );
      })
    )
  );

  cancelAuction$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuctionsActions.auctionCancel),
      switchMap(({ id }) => this.jobProvider.markAsCancel(id.toString())),
      map((res) => {
        const translateValue = this.translate.instant(
          'AUCTIONS.AUCTION_CANCELLED'
        );
        this.notifier.success(translateValue);
        this.routerFacade$.go({
          path: [`/${PATHS.DASHBOARD}`],
        });
        return AuctionsActions.auctionCancelSuccess({
          auction: res,
        });
      }),
      catchError((err) => {
        this.notifier.error(err?.message ?? 'Error');
        return of(
          AuctionsActions.auctionCancelFailure({
            error: err,
          })
        );
      })
    )
  );

  getBidByAuction$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuctionsActions.getBidByAuction),
      switchMap(({ id }) =>
        this.bidProvider
          .getBidByAuctionId(id)
          .pipe(catchError((err) => of(null)))
      ),
      map((bid) => AuctionsActions.getBidByAuctionSuccess({ bid }))
    )
  );

  markAsCompleted$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuctionsActions.markAsCompleted),
      tap(() => {
        this.auctionsFacade.setSelectedAuction(null);
      }),
      switchMap(({ id }) => this.jobProvider.markAsCompleted({ id })),
      mergeMap((auction) => [
        AuctionsActions.getAuctionById({ id: auction.id }),
      ]),
    )
  );

  markForProgress$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuctionsActions.markAsInProgress),
      switchMap(({ id }) => this.jobProvider.markAsInProgress({ id })),
      mergeMap((auction) => [
        AuctionsActions.markAsInProgressSuccess({ auction }),
        AuctionsActions.getBidByAuction({ id: auction.id }),
        AuctionsActions.getAuctionById({ id: auction.id }),
      ]),
      catchError((err) => {
        this.notifier.error(err?.message ?? 'Error');
        return of(
          AuctionsActions.markAsInProgressFailure({
            error: err,
          })
        );
      })
    )
  );

  getDocumentsByAuctionId$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuctionsActions.getDocuments),
      switchMap(({ auctionId }) =>
        this.documentsProvider.getDocumentsForJob(auctionId)
      ),
      map((documents) =>
        AuctionsActions.getDocumentsSuccess({ document: documents[0] })
      ),
      catchError((err) => {
        this.notifier.error(err?.message ?? 'Error');
        return of(
          AuctionsActions.getDocumentsFailure({
            error: err,
          })
        );
      })
    )
  );
}
