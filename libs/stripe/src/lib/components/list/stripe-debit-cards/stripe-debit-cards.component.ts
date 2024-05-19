import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { filter, take } from 'rxjs/operators';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { firstValueFrom, tap } from 'rxjs';
import { DebitCard } from '@ocean/api/shared/entities/stripe/debit-card';
import { CreateStripeCardComponent } from '../../create/create-stripe-card/create-stripe-card.component';
import { StripeDebitCardDetailsComponent } from '../../details/stripe-debit-card-details/stripe-debit-card-details.component';
import { ProceedActionFor, StripeFacadeService } from '../../../store/facade';
import { IconType } from '@ocean/icons';

@Component({
  selector: 'app-stripe-debit-cards',
  templateUrl: './stripe-debit-cards.component.html',
  styleUrls: ['./stripe-debit-cards.component.scss'],
})
export class StripeDebitCardsComponent implements OnInit, OnDestroy {
  readonly iconType = IconType;

  readonly cards$ = this.stripeFacadeService.cards$;
  readonly loading$ = this.stripeFacadeService.loading$;

  constructor(
    private readonly dialog: MatDialog,
    private readonly stripeFacadeService: StripeFacadeService
  ) {}

  ngOnInit() {
    this.stripeFacadeService.loadCards();
  }

  ngOnDestroy() {
    return;
  }

  formatExpireDate(card: DebitCard) {
    const expMonth = `0${card.expMonth}`.slice(-2);
    const expYear = `${card.expYear}`.slice(-2);

    return `${expMonth}/${expYear}`;
  }

  handleCreateCard() {
    this.dialog
      .open(CreateStripeCardComponent)
      .afterClosed()
      .pipe(
        take(1),
        untilDestroyed(this),
        filter((value) => !!value),
        tap((card) => this.stripeFacadeService.createDebitCard(card))
      )
      .subscribe();
  }

  async handleCardDetails(cardId: string) {
    const cards = await firstValueFrom(this.cards$);

    this.dialog
      .open(StripeDebitCardDetailsComponent, {
        data: cards.find((card) => card.id === cardId),
      })
      .afterClosed()
      .pipe(
        take(1),
        untilDestroyed(this),
        filter((value) => !!value),
        tap((exitDetails) =>
          this.stripeFacadeService.proceedAction(
            ProceedActionFor.CARDS,
            exitDetails
          )
        )
      )
      .subscribe();
  }
}
