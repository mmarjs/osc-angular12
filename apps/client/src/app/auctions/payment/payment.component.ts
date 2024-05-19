/* eslint-disable @nrwl/nx/enforce-module-boundaries */
// tslint:disable: nx-enforce-module-boundaries
import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JobProvider } from '@ocean/api/services';
import { JobDTO, PaymentMethod } from '@ocean/api/shared';
import { AuctionsFacade, BoatsFacade, RouterFacade } from '@ocean/client/state';
import { ImageFacadeService } from '@ocean/client/state/images/image-facade.service';
import { LocalizationService } from '@ocean/internationalization';
import { NotifierService } from '@ocean/shared/services';
import { untilDestroyed } from 'ngx-take-until-destroy';
import {
  catchError,
  combineLatestWith,
  delay,
  map,
  Observable,
  of,
  switchMap,
  tap,
} from 'rxjs';
import { IconType } from '@ocean/icons';

const STEPS = [
  { translation: 'AUCTIONS.WIZARD_STEPS.WORK_DESCRIPTION', completed: true },
  {
    translation: 'AUCTIONS.WIZARD_STEPS.SURVEY_INFORMATION',
    completed: true,
  },
  { translation: 'AUCTIONS.WIZARD_STEPS.LIST_BOAT', completed: true },
  { translation: 'AUCTIONS.WIZARD_STEPS.START_AUCTION', completed: false },
];

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss'],
})
export class PaymentComponent implements OnDestroy {
  readonly auction$: Observable<JobDTO> = this.activatedRoute.parent.data.pipe(
    map(({ auction }) => auction)
  );

  readonly images$ = this.imageFacadeService.local$.pipe(
    combineLatestWith(this.auction$),
    switchMap(([_, auction]) =>
      this.imageFacadeService.images$(auction?.id).pipe(
        map((images) => images),
        catchError(() => of([]))
      )
    )
  );

  readonly depositAmount = 10;
  readonly steps = STEPS;
  readonly iconType = IconType;

  depositSuccess = false;
  cardDetails: PaymentMethod;

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly jobProvider: JobProvider,
    private readonly notifier: NotifierService,
    private readonly routerFacade: RouterFacade,
    private readonly auctionsFacade: AuctionsFacade,
    private readonly boatFacade: BoatsFacade,
    private readonly localizationService: LocalizationService,
    private readonly imageFacadeService: ImageFacadeService
  ) {}

  setCard(card: PaymentMethod) {
    this.cardDetails = card;
  }

  pay({ id: auctionId }: JobDTO) {
    const data = {
      autoConfirm: true,
      offSession: true,
      stripePaymentMethodId: this.cardDetails.stripeMethodId,
    };
    this.jobProvider
      .hasPaid(auctionId)
      .pipe(
        map((auction) => {
          if (auction.commissionPaid) {
            this.notifier.success(
              this.localizationService.translate('COMMON.INFO.ALREADY_PAID')
            );
            throw Error('Already paid');
          }
          return auction as JobDTO;
        }),
        switchMap(() => this.jobProvider.pay(auctionId, data)),
        delay(500),
        switchMap(() => this.jobProvider.hasPaid(auctionId)),
        switchMap((auction) => {
          if (!auction.commissionPaid) {
            throw new Error(
              this.localizationService.translate('COMMON.INFO.PAYMENT_FAILED')
            );
          }
          return this.jobProvider.startAuction(auctionId);
        }),
        catchError((err) => {
          if (err.message === 'Already paid') {
            this.notifier.success(
              this.localizationService.translate('COMMON.INFO.ALREADY_PAID')
            );
            return of(true);
          }
          throw err;
        }),
        tap(() => {
          this.depositSuccess = true;
          // smooth scroll to top
          window.scrollTo({
            top: 0,
            behavior: 'smooth',
          });
        }),
        untilDestroyed(this)
      )
      .subscribe({
        error: (err) => {
          this.depositSuccess = false;
          this.notifier.error(err);
        },
      });
  }

  goToDashboard() {
    this.routerFacade.go({ path: [`/dashboard`] });
  }

  onEditAuction(auction: JobDTO) {
    this.auctionsFacade.setSelectedAuction(auction);
    this.boatFacade.setSelectedBoat(auction.boat);
  }

  ngOnDestroy() {
    return;
  }
}
