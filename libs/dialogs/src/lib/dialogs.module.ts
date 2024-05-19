/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { InternationalizationModule } from '@ocean/internationalization';
import { FileDropModule } from '@ocean/file-drop';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { PromptDialogComponent } from './prompt-dialog/prompt-dialog.component';
import { InputDialogComponent } from './input-dialog/input-dialog.component';
import { BidItemNoteDialogComponent } from './bid-item-note-dialog.component';
import { ContactListerDialogComponent } from './contact-lister-dialog/contact-lister-dialog.component';
import { UploadBidDocumentsComponent } from './upload-bid-documents.component';
import { AppFormsModule } from '@ocean/client/common/forms';
import { SharedFormsModule } from '@ocean/shared';
import { DocumentViewerComponent } from './document-viewer/document-viewer.component';
import { IconsModule } from '@ocean/icons';

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    MatButtonModule,
    MatDialogModule,
    MatInputModule,
    ReactiveFormsModule,
    InternationalizationModule,
    FileDropModule,
    AppFormsModule,
    SharedFormsModule,
    IconsModule,
  ],
  declarations: [
    ConfirmDialogComponent,
    PromptDialogComponent,
    InputDialogComponent,
    ContactListerDialogComponent,
    BidItemNoteDialogComponent,
    UploadBidDocumentsComponent,
    DocumentViewerComponent,
  ],
  entryComponents: [
    ConfirmDialogComponent,
    PromptDialogComponent,
    InputDialogComponent,
    ContactListerDialogComponent,
    BidItemNoteDialogComponent,
  ],
  exports: [
    ConfirmDialogComponent,
    PromptDialogComponent,
    InputDialogComponent,
    ContactListerDialogComponent,
    BidItemNoteDialogComponent,
    DocumentViewerComponent,
  ],
})
export class DialogsModule {}
