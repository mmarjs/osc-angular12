/* eslint-disable @nrwl/nx/enforce-module-boundaries */
// tslint:disable: nx-enforce-module-boundaries
import { Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JobProvider } from '@ocean/api/services';
import { JobDTO, PaymentMethod } from '@ocean/api/shared';
import { AuctionsFacade, BoatsFacade, RouterFacade } from '@ocean/client/state';
import { LocalizationService } from '@ocean/internationalization';
import { NotifierService } from '@ocean/shared/services';
import { CreditCardComponent } from '@ocean/stripe';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { catchError, delay, map, Observable, of, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss'],
})
export class PaymentComponent implements OnDestroy {
  @ViewChild(CreditCardComponent) oceanCard!: CreditCardComponent;
  @ViewChild('dashboardElement') dashboardElement!: ElementRef<HTMLElement>;
  cardDetails: PaymentMethod;
  auction$: Observable<JobDTO> = this.activatedRoute.parent.data.pipe(
    map(({ auction }) => auction)
  );
  steps: { translation: string; completed: boolean }[] = [
    { translation: 'AUCTIONS.WIZARD_STEPS.WORK_DESCRIPTION', completed: true },
    {
      translation: 'AUCTIONS.WIZARD_STEPS.SURVEY_INFORMATION',
      completed: true,
    },
    { translation: 'AUCTIONS.WIZARD_STEPS.LIST_BOAT', completed: true },
    { translation: 'AUCTIONS.WIZARD_STEPS.START_AUCTION', completed: false },
  ];
  readonly depositAmount = 10;
  depositSuccess: boolean = false;
  hasPaid: boolean;
  constructor(
    private activatedRoute: ActivatedRoute,
    private jobProvider: JobProvider,
    private notifier: NotifierService,
    private routerFacade: RouterFacade,
    private auctionsFacade: AuctionsFacade,
    private boatFacade: BoatsFacade,
    private localizationService: LocalizationService
  ) {}

  setCard(card: PaymentMethod): void {
    this.cardDetails = card;
  }

  pay({ id: auctionId }: JobDTO): void {
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
          requestAnimationFrame(() => {
            this.dashboardElement?.nativeElement?.scrollIntoView({
              behavior: 'smooth',
            });
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

  goToDashboard(): void {
    this.routerFacade.go({ path: [`/dashboard`] });
  }

  onEditAuction(auction: JobDTO): void {
    this.auctionsFacade.setSelectedAuction(auction);
    this.boatFacade.setSelectedBoat(auction.boat);
  }

  ngOnDestroy(): void {}
}
