import { Component, HostBinding, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ConfirmDialogData } from './confirm-data.interface';

/**
 * Core Confirm Dialog
 */
@Component({
  selector: 'app-dialog-confirm',
  templateUrl: 'confirm.dialog.html'
})
export class ConfirmDialogComponent {
  @HostBinding('class') cssClasses = 'app-dialog app-confirm';

  title = '';
  content = '';

  constructor(
    public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ConfirmDialogData
  ) {
    // WARNING be sure to have translated strings of the parameters
    // because after the extraction they are empty
    this.data = {
      accept: 'Ok',
      color: 'primary',
      ...data
    };
  }
}
