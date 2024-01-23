import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { NgxFileDropEntry } from 'ngx-file-drop';

@Component({
  selector: 'ocean-upload-bid-documents',
  template: `
  <div matDialogTitle>
  <h3>
      {{'AUCTIONS.DIALOGS.UPLOAD_DOCUMENTS' | translate }}
    </h3>
  </div>
  <div mat-dialog-content class="upload-documents-dialog-content">
    <ocean-file-drop accept="application/pdf, application/vnd.ms-excel" (filesChange)="files = $event"></ocean-file-drop>
  </div>

  <div mat-dialog-actions fxLayout="row" fxLayoutAlign="end end" fxLayoutGap="10px">
    <button mat-stroked-button [matDialogClose]="false">{{'COMMON.BUTTONS.CANCEL' | translate}}</button>
    <button mat-raised-button color="primary" (click)="dialogRef.close(files)">{{'COMMON.BUTTONS.SAVE' | translate}}</button>
  </div>
  `,
  styles: [`
    .upload-documents-dialog-content {
      width: 450px;
      overflow: hidden;
    }
  `]
})
export class UploadBidDocumentsComponent {
  files: NgxFileDropEntry[] = [];

  constructor(
    public dialogRef: MatDialogRef<UploadBidDocumentsComponent>
  ) { }
}
