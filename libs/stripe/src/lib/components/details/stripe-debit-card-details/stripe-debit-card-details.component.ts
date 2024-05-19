import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DebitCard } from '@ocean/api/shared';
import { STRIPE_DETAILS_EXIT_TYPE } from '../../../shared/types';
import { exitDetailsWithStatus } from '../../../helpers/exit-details-with-status';
import { cardDetailsTables } from './card-details-table';
import { IconType } from '@ocean/icons';

@Component({
  selector: 'app-stripe-debit-card-details',
  templateUrl: './stripe-debit-card-details.component.html',
  styleUrls: ['./stripe-debit-card-details.component.scss'],
})
export class StripeDebitCardDetailsComponent {
  readonly iconType = IconType;
  readonly CARD_DETAILS_TABLE = cardDetailsTables;

  constructor(
    private readonly dialogRef: MatDialogRef<StripeDebitCardDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) private readonly data?: DebitCard
  ) {}

  get(key: keyof DebitCard) {
    return this.data?.[key] as string | undefined;
  }

  markAsDefault() {
    this.dialogRef.close(
      exitDetailsWithStatus(STRIPE_DETAILS_EXIT_TYPE.MARK, this.data?.id)
    );
  }

  delete() {
    this.dialogRef.close(
      exitDetailsWithStatus(STRIPE_DETAILS_EXIT_TYPE.DELETE, this.data?.id)
    );
  }
}
