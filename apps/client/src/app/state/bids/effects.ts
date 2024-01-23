import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  catchError,
  map,
  mergeMap,
  switchMap,
  tap,
  withLatestFrom,
} from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import * as BidsActions from './actions';
import { AuctionsFacade, RouterFacade } from '..';
import { BidProvider } from '@ocean/api/services';
import { NotifierService } from '@ocean/shared/services';
import { LocalizationService } from '@ocean/internationalization';
import { Params } from '@angular/router';
import { BidsFacade } from './facade';

@Injectable()
export class BidsEffects {
  loadBids$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BidsActions.loadBids),
      withLatestFrom(this.auctionsFacade.selectedAuction$),
      switchMap(([_, selectedAuction]) =>
        this.bidService.findByAuctionId(selectedAuction?.id).pipe(
          map((data) => BidsActions.loadBidsSuccess({ data })),
          catchError((error) =>
            of(BidsActions.loadBidsFailure({ payload: error }))
          )
        )
      )
    )
  );

  loadBid$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(BidsActions.loadBid),
      withLatestFrom(this.routerFacade.params$ as Observable<Params>),
      switchMap(([_, param]) =>
        this.bidService.findById({ id: param.bidId }).pipe(
          map((data) => BidsActions.loadBidSuccess({ data })),
          catchError((error) =>
            of(BidsActions.loadBidFailure({ payload: error }))
          )
        )
      )
    );
  });

  acceptBid$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(BidsActions.acceptBid),
      switchMap((id) =>
        this.bidService.acceptBid(id).pipe(
          tap(() =>
            this.notifier.success(
              this.localizationService.translate('BIDS.BID_ACCEPTED')
            )
          ),
          map((data) => BidsActions.acceptBidSuccess({ data })),
          catchError((error) => {
            return of(BidsActions.acceptBidFailure({ payload: error }));
          })
        )
      )
    );
  });

  rejectBids$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(BidsActions.rejectBid),
      switchMap((id) => this.bidService.rejectBid(id)),
      tap(() =>
        this.notifier.success(
          this.localizationService.translate('BIDS.BID_REJECTED')
        )
      ),
      map((data) => BidsActions.rejectBidSuccess({ data })),
      catchError((error) => {
        return of(BidsActions.rejectBidFailure({ payload: error }));
      })
    );
  })

  editBid$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(BidsActions.editBid),
      switchMap(({ data }) =>
        this.bidService.editBidWithoutBidId({ bidDto: data }).pipe(
          tap(() =>
            this.notifier.success(
              this.localizationService.translate('BIDS.BID_EDITED')
            )
          ),
          map((bid) => {
            this.routerFacade.go({
              path: ['/mybids'],
            })
            return BidsActions.editBidSuccess({ data: bid })
          }),
          catchError((error) => {
            return of(BidsActions.editBidFailure({ payload: error }));
          })
        )
      )
    );
  });

loadMyBids$ = createEffect(() => this.actions$.pipe(
  ofType(BidsActions.loadMyBids),
  mergeMap((action) =>  this.bidService.getMyBids(action.payload)
    .pipe(
      map((res) => {
        return  BidsActions.loadMyBidsSuccess(res)
      }),
      catchError(err => of(BidsActions.loadMyBidsFailure({ payload: err })))
    )
  )
)
);

  payBid$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(BidsActions.payBid),
      withLatestFrom(this.bidsFacade.selectAcceptedBid$),
      switchMap(([{ data }, { id }]) => this.bidService.payBid(id, data)),
      map(() => {
        this.notifier.success(this.localizationService.translate('COMMON.INFO.PAYMENT_SUCCESS'));
        return BidsActions.payBidSuccess({data : true})
      }),
      catchError((error) => {
        this.notifier.error(error)
        return of(BidsActions.payBidFailure({ payload: error }));
      })
    );
  })

  constructor(
    private actions$: Actions,
    private bidService: BidProvider,
    private auctionsFacade: AuctionsFacade,
    private notifier: NotifierService,
    private localizationService: LocalizationService,
    private routerFacade: RouterFacade,
    private bidsFacade: BidsFacade
  ) {}
}
