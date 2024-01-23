/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { ChangeDetectionStrategy, Component, OnDestroy, } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PaymentMethod, PaymentEvent } from '@ocean/api/shared';
import { BidsFacade } from '@ocean/client/state';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { delay, filter, tap } from 'rxjs';

@Component({
  selector: 'ocean-escrow-deposit',
  templateUrl: './escrow-deposit.component.html',
  styleUrls: ['./escrow-deposit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EscrowDepositComponent implements OnDestroy {
  bid$ = this.bidsFacade.bid$;
  selectedCard: PaymentMethod | null = null;
  paymentEvent = PaymentEvent;
  constructor(
    private bidsFacade: BidsFacade,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  setCard(card: PaymentMethod) {
    this.selectedCard = card;
  }
  payFullAmount(
    paymentMethodId?: string,
    bidId?: number,
  ) {
    if (!paymentMethodId || !bidId) {
      return;
    }

    this.bidsFacade.payBid({
      offSession: true,
      autoConfirm: true,
      stripePaymentMethodId: paymentMethodId,
    });
    this.bidsFacade.selectWinningBid$
      .pipe(
        filter((winningBid) => !!winningBid),
        delay(500),
        tap(() => this.bidsFacade.loadBids()),
        untilDestroyed(this)
      )
      .subscribe(() => {
        this.router.navigate(['../../', 'review-work', bidId], {
          relativeTo: this.route,
        });
      });
  }

  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method, @typescript-eslint/no-empty-function
  ngOnDestroy(): void {}
}
