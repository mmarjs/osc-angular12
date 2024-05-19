import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { PaymentMethod } from '@ocean/api/shared';
import { UserFacade } from '@ocean/api/state';
import { EditPaymentFormComponent } from '@ocean/client/common/components/edit-payment-form/edit-payment-form.component';
import { PaymentModalComponent } from '@ocean/client/common/components/payment-modal/payment-modal.component';
import { IconType } from '@ocean/icons';
import { PromptDialogComponent, PromptDialogData } from '@ocean/shared/dialogs';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { EMPTY } from 'rxjs';
import { filter, first, take, catchError, tap } from 'rxjs/operators';

@Component({
  selector: 'app-payment-details',
  templateUrl: './payment-details.component.html',
  styleUrls: ['./payment-details.component.scss'],
})
export class PaymentDetailsComponent implements OnInit, OnDestroy {
  readonly iconType = IconType;

  savedCards: PaymentMethod[] = [];
  data: PromptDialogData;

  isLoading: boolean;

  constructor(
    private readonly dialog: MatDialog,
    private readonly userFacade: UserFacade,
    private readonly translate: TranslateService
  ) {}

  ngOnInit(): void {
    this.init();
    this.data = {
      title: this.translate.instant('PROFILE.DELETE_PAYMENT_METHOD'),
      content: this.translate.instant('PROFILE.DO_YOU_REALLY_WANT_DELETE_PAYMENT_METHOD'),
    };
  }

  ngOnDestroy() {}

  init() {
    this.userFacade.loadSavedCards();

    this.userFacade.getSavedCards$
      .pipe(untilDestroyed(this))
      .subscribe((cards) => {
        this.savedCards = cards;
      });

    this.userFacade.isLoading$
      .pipe(
        tap((isLoading) => (this.isLoading = isLoading)),
        catchError(() => {
          this.isLoading = false;
          return EMPTY;
        }),
        untilDestroyed(this)
      )
      .subscribe();
  }

  openDialog() {
    this.dialog
      .open(PaymentModalComponent)
      .afterClosed()
      .pipe(
        untilDestroyed(this),
        first((success) => success === true),
      )
      .subscribe({
        next: () => {
          this.userFacade.loadSavedCards(this.savedCards.length);
        },
      });
  }

  onEdit(card: PaymentMethod) {
    this.userFacade.openPaymentMethodModal();
    this.dialog.open(EditPaymentFormComponent, {
      data: card,
      disableClose: true,
      width: '500px',
    });
  }

  extractDataFromJson(card) {
    try {
      const paymentCard = card && JSON.parse(card);
      return paymentCard;
    } catch (error) {
      return card;
    }
  }

  onDelete(cardId: number) {
    this.dialog
      .open(PromptDialogComponent, {
        data: this.data,
      })
      .afterClosed()
      .pipe(filter(Boolean), take(1), untilDestroyed(this))
      .subscribe(() => {
        this.userFacade.deletePaymentMethod(cardId);
      });
  }

  getCard(card: PaymentMethod['details']) {
    return this.extractDataFromJson(card).card;
  }
}
