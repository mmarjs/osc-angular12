import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CustomValidator } from '@ocean/shared/utils/nospace-validator';
import { TwoInputsDialogData } from './two-inputs-data.interface';


@Component({
  selector: 'app-two-inputs-dialog',
  templateUrl: './two-inputs-dialog.component.html',
  styleUrls: ['./two-inputs-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TwoInputsDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<TwoInputsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: TwoInputsDialogData,
    private fb:FormBuilder
  ) {
  }

  get firstInput() {
    return this.form.get('firstInput')
  }

  get secondInput() {
    return this.form.get('secondInput')
  }

  form = this.fb.group({
    firstInput: ['', [Validators.required, CustomValidator.startWithSpaceValidator]],
    secondInput: ['', [Validators.required, CustomValidator.startWithSpaceValidator]]
  })

}
