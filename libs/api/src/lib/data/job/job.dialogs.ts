// tslint:disable: nx-enforce-module-boundaries
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { JobProvider } from '@ocean/api/services';
import { JobItemNote, JobDTO } from '@ocean/api/shared';
import { LocalizationService } from '@ocean/internationalization';
import { PromptDialogComponent, PromptDialogData } from '@ocean/shared/dialogs';
import { BidItemNoteDialogComponent } from '@ocean/dialogs';
import { BidItemNodeDialogData } from '@ocean/dialogs';
import { Observable, of } from 'rxjs';
import { catchError, filter, map, switchMap } from 'rxjs/operators';
import { JobDatabase } from './job.database';
import { UploadBidDocumentsComponent } from '@ocean/dialogs';
import { TwoInputsDialogComponent } from '@ocean/shared/dialogs/two-inputs/two-inputs-dialog.component';
import { NgxFileDropEntry } from 'ngx-file-drop';

@Injectable({
  providedIn: 'root'
})
export class JobDialogs {
  constructor(
    protected dialog: MatDialog,
    protected database: JobDatabase,
    protected api: JobProvider,
    private localizationService: LocalizationService
  ) { }

  acceptPrompt(item: JobDTO): Observable<boolean> {
    const data: PromptDialogData = {
      title: 'Accept Auction',
      content: `You are about to accept an auction.`
    };

    return this.dialog
      .open(PromptDialogComponent, { data: data })
      .afterClosed()
      .pipe(
        filter(Boolean), // only process confirmed prompts
        switchMap(() =>
          this.api.markAsAccepted({ id: item.id }).pipe(
            map(() => true),
            catchError(() => of(false))
          )
        )
      );
  }

  completePrompt(item: JobDTO): Observable<boolean> {
    const data: PromptDialogData = {
      title: 'Complete Auction',
      content: `You are about to complete an auction.`
    };

    return this.dialog
      .open(PromptDialogComponent, { data: data })
      .afterClosed()
      .pipe(
        filter(Boolean), // only process confirmed prompts
        switchMap(() =>
          this.api.markAsCompleted({ id: item.id }).pipe(
            map(() => true),
            catchError(() => of(false))
          )
        )
      );
  }

  addJobLineItem() {
    return this.dialog.open(TwoInputsDialogComponent, {
      data: {
        firstInput: {
          title: this.localizationService.translate('AUCTIONS.DIALOGS.ADD_LINE_ITEM'),
          placeholder: this.localizationService.translate('FORMS.PLACEHOLDERS.ENTER_TASK_TITLE'),
          label: this.localizationService.translate('FORMS.LABELS.TITLE'),
        },
        secondInput: {
          title: this.localizationService.translate('AUCTIONS.DIALOGS.ADD_LINE_ITEM'),
          placeholder: this.localizationService.translate('FORMS.PLACEHOLDERS.ENTER_TASK_DESCRIPTION'),
          label: this.localizationService.translate('FORMS.LABELS.DESCRIPTION'),
        }
      }
    })
      .afterClosed()
      .pipe(
        filter(Boolean),
        map((response) => ({
          id: new Date().getTime(),
          response
        }))
      );
  }

  openNoteDialog(lineItemTitle: string): Observable<JobItemNote> {
    const data: BidItemNodeDialogData = {
      lineItemTitle
    };

    return this.dialog
      .open(BidItemNoteDialogComponent,
        { data }
      )
      .afterClosed()
      .pipe(
        filter(Boolean)
      );
  }

  openDocumentsDialog(): Observable<NgxFileDropEntry[]> {
    return this.dialog
      .open(UploadBidDocumentsComponent)
      .afterClosed()
      .pipe(
        filter(Boolean)
      );
  }
}
