import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PaymentMethod } from '@ocean/api/shared';
import { UserFacade } from '@ocean/api/state';
import { PaymentModalComponent } from '../payment-modal/payment-modal.component';

@Component({
  selector: 'app-payment-list',
  templateUrl: './payment-list.component.html',
  styleUrls: ['./payment-list.component.scss'],
})
export class PaymentListComponent implements OnInit {
  @Output() cardDetails = new EventEmitter<PaymentMethod>();

  savedCards$ = this.userFacade.getSavedCards$;

  constructor(private dialog: MatDialog, private userFacade: UserFacade) {}

  ngOnInit(): void {
    this.userFacade.loadSavedCards();
  }

  openDialog() {
    this.dialog.open(PaymentModalComponent);
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
