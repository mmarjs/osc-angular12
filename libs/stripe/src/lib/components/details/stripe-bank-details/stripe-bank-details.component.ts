import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BankAccount } from '@ocean/api/shared/entities/stripe/bank-account';
import { STRIPE_DETAILS_EXIT_TYPE } from '../../../shared/types';
import { exitDetailsWithStatus } from '../../../helpers/exit-details-with-status';
import { bankDetailsTables } from './bank-details-table';
import { IconType } from '@ocean/icons';

@Component({
  selector: 'app-stripe-bank-details',
  templateUrl: './stripe-bank-details.component.html',
  styleUrls: ['./stripe-bank-details.component.scss'],
})
export class StripeBankDetailsComponent {
  readonly iconType = IconType;
  readonly BANK_DETAILS_TABLE = bankDetailsTables;

  constructor(
    private readonly dialogRef: MatDialogRef<StripeBankDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) private readonly data?: BankAccount
  ) {}

  get(key: keyof BankAccount) {
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
