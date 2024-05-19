import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilderService } from '@ocean/libs/form-builder';
import { stripeBankFields } from '@ocean/forms-config';
import { normalizeFormRawBankData } from '../../../helpers/normalize-form-raw-bank-data';
import { IconType } from '@ocean/icons';

@Component({
  selector: 'app-create-stripe-bank',
  templateUrl: './create-stripe-bank.component.html',
  styleUrls: ['./create-stripe-bank.component.scss'],
})
export class CreateStripeBankComponent {
  readonly iconType = IconType;
  readonly fields = stripeBankFields;
  readonly form = this.formBuilder.buildReactiveForm(this.fields);

  constructor(
    private readonly dialogRef: MatDialogRef<CreateStripeBankComponent>,
    private readonly formBuilder: FormBuilderService
  ) {}

  create() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.dialogRef.close(normalizeFormRawBankData(this.form.value));
  }

  close() {
    this.dialogRef.close();
  }
}
