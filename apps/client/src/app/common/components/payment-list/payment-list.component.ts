import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PaymentMethod } from '@ocean/api/shared';
import { UserFacade } from '@ocean/api/state';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { delay, filter } from 'rxjs';
import { PaymentModalComponent } from '../payment-modal/payment-modal.component';
import { IconType } from '@ocean/icons';

@Component({
  selector: 'app-payment-list',
  templateUrl: './payment-list.component.html',
  styleUrls: ['./payment-list.component.scss'],
})
export class PaymentListComponent implements OnInit, OnDestroy {
  @Output() cardDetails = new EventEmitter<PaymentMethod>();

  readonly iconType = IconType;
  readonly savedCards$ = this.userFacade.getSavedCards$;

  constructor(
    private readonly dialog: MatDialog,
    private readonly userFacade: UserFacade
  ) {}

  ngOnInit() {
    this.userFacade.loadSavedCards();
  }

  ngOnDestroy() {
    return;
  }

  openDialog() {
    this.dialog
      .open(PaymentModalComponent)
      .afterClosed()
      .pipe(
        untilDestroyed(this),
        filter((success) => success === true),
        delay(1000)
      )
      .subscribe(() => {
        this.userFacade.loadSavedCards();
      });
  }

  extractDataFromJson(card: PaymentMethod['details']) {
    try {
      return card && JSON.parse(card);
    } catch (error) {
      return card;
    }
  }

  getCardBrand(card: PaymentMethod): string {
    const cardInfo = this.extractDataFromJson(card.details);
    return cardInfo?.card?.brand;
  }

  getCardBrandImage(card: PaymentMethod): string {
    const brand = this.getCardBrand(card) ?? 'card';
    return `assets/banks/${brand}.png`;
  }

  getExpirationDate(card: PaymentMethod): string {
    const cardInfo = this.extractDataFromJson(card.details);
    const month = cardInfo?.card?.exp_month;
    const year = cardInfo?.card?.exp_year;
    // format month and year
    const monthString = month < 10 ? `0${month}` : `${month}`;
    return `${monthString}/${year}`;
  }
}
