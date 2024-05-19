import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AppDialogsImports } from './dialogs.imports';

import { ConfirmDialogComponent } from './confirm';
import { PromptDialogComponent } from './prompt';
import { InputDialogComponent } from './input-dialog/input-dialog.component';
import { ContactListerComponent } from './contact-lister/contact-lister.component';
import { AceptBidComponent } from './acept-bid/acept-bid.component';
import { SharedFormsModule } from '../forms';
import { SharedDirectivesModule } from '../directives';
import { RouterModule } from '@angular/router';
import { TwoInputsDialogComponent } from './two-inputs/two-inputs-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    ...AppDialogsImports,
    SharedFormsModule,
    SharedDirectivesModule,
    RouterModule,
  ],
  declarations: [
    ConfirmDialogComponent,
    PromptDialogComponent,
    InputDialogComponent,
    ContactListerComponent,
    AceptBidComponent,
    TwoInputsDialogComponent,
  ],
  entryComponents: [
    ConfirmDialogComponent,
    PromptDialogComponent,
    InputDialogComponent,
    ContactListerComponent,
    AceptBidComponent,
  ],
  exports: [
    ConfirmDialogComponent,
    PromptDialogComponent,
    InputDialogComponent,
    ContactListerComponent,
    AceptBidComponent,
    TwoInputsDialogComponent,
  ],
})
export class SharedDialogsModule {}
