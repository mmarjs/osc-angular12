import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgxFileDropEntry } from 'ngx-file-drop';
import { BidItemNodeDialogData } from './interfaces';
import { CustomValidator } from '@ocean/shared/utils/nospace-validator';
@Component({
  selector: 'ocean-bid-item-note-dialog',
  template: `
  <div matDialogTitle class="dialog-title-wrapper">
    <h3>
      {{'NOTES.ADD_NOTE' | translate }}
    </h3>
    <p class="dialog-subtitle">
      {{'NOTES.ADD_NOTE_TO_THE_LINE' | translate }} <b>{{data.lineItemTitle}}</b>
    </p>
  </div>
  <div mat-dialog-content class="bid-item-dialog-content">
    <form [formGroup]="form">
      <div class="form-control">
        <label class="label">
          {{'FORMS.LABELS.YOUR_NOTE' | translate}}:
        </label>
          <app-field-textarea matInput formControlName="text" [rows]="5">
            </app-field-textarea>
      </div>
    </form>
  </div>

  <div mat-dialog-actions fxLayout="row" fxLayoutAlign="end end" fxLayoutGap="10px">
    <button mat-stroked-button [matDialogClose]="false">{{'COMMON.BUTTONS.CANCEL' | translate}}</button>
    <button mat-raised-button color="primary" (click)="addNote()"
      [disabled]="form.invalid">{{'COMMON.BUTTONS.ADD_NOTE' | translate}}</button>
  </div>
`,
  styles: [`
    .dialog-title-wrapper > h3 {
      margin-bottom: 0;
    }

    .bid-item-dialog-content {
      width: 450px;
      overflow: hidden;
    }

    .bid-item-dialog-content .label {
      display: block;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BidItemNoteDialogComponent implements OnInit {
  form!: FormGroup;
  files: NgxFileDropEntry[] = [];

  constructor(
    public dialogRef: MatDialogRef<BidItemNoteDialogComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: BidItemNodeDialogData
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      text: ['', [Validators.required, CustomValidator.startWithSpaceValidator]]
    });
  }

  addNote() {
    this.dialogRef.close({
      text: this.form.value.text,
    })
  }
}
