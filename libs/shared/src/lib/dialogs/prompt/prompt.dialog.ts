import { Component, HostBinding, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PromptDialogData } from './prompt-data.interface';

@Component({
  selector: 'app-dialog-prompt',
  templateUrl: 'prompt.dialog.html',
  styleUrls: ['prompt.dialog.scss'],
})
export class PromptDialogComponent {
  @HostBinding('class') cssClasses = 'app-dialog app-prompt';

  title = '';
  content = '';

  constructor(
    public dialogRef: MatDialogRef<PromptDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: PromptDialogData
  ) {
    // WARNING be sure to have translated strings of the parameters
    // because after the extraction they are empty
    this.data = {
      no: 'No',
      yes: 'Yes',
      color: 'warn',
      ...data
    };
  }
}
