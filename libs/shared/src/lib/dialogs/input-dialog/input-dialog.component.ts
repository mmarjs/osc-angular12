import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { InputDialogData } from './input-dialog-data.interface';

@Component({
  selector: 'app-input-dialog',
  templateUrl: './input-dialog.component.html',
  styleUrls: ['./input-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputDialogComponent {
  inputCtrl = new FormControl('', [Validators.required]);

  constructor(
    public dialogRef: MatDialogRef<InputDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: InputDialogData
  ) {}
}
