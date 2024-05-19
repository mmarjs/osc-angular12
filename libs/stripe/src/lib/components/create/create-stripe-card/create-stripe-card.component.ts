import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilderService } from '@ocean/libs/form-builder';
import { stripeCardFields } from '@ocean/forms-config';
import { normalizeFormRawCardData } from '../../../helpers/normalize-form-raw-card-data';
import { IconType } from '@ocean/icons';

@Component({
  selector: 'app-create-stripe-card',
  templateUrl: './create-stripe-card.component.html',
  styleUrls: ['./create-stripe-card.component.scss'],
})
export class CreateStripeCardComponent {
  readonly iconType = IconType;
  readonly fields = stripeCardFields;
  readonly form = this.formBuilder.buildReactiveForm(this.fields);

  constructor(
    private readonly dialogRef: MatDialogRef<CreateStripeCardComponent>,
    private readonly formBuilder: FormBuilderService
  ) {}

  create() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.dialogRef.close(normalizeFormRawCardData(this.form.value));
  }

  close() {
    this.dialogRef.close();
  }
}
