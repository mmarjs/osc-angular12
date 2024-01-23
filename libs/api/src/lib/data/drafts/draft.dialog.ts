import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LocalizationService } from '@ocean/internationalization';
import { PromptDialogComponent, PromptDialogData } from '@ocean/shared/dialogs';
import { InputDialogData } from '@ocean/shared/dialogs/input-dialog/input-dialog-data.interface';
import { InputDialogComponent } from '@ocean/shared/dialogs/input-dialog/input-dialog.component';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DraftDialogs {
  constructor(
    protected dialog: MatDialog,
    private localizationService: LocalizationService
  ) { }

  deletePrompt(id: string): Observable<boolean> {
    const data: PromptDialogData = {
      title: this.localizationService.translate('DRAFTS.DIALOG.DELETE_TITLE'),
      content: this.localizationService.translate('DRAFTS.DIALOG.DELETE_CONTENT', { name: id })
    };

    return this.dialog
      .open(PromptDialogComponent, { data })
      .afterClosed()
      .pipe(
        filter(Boolean)
        // switchMap(() =>
        //   this.boat.deleteBoatById({ id: item.id }).pipe(
        //     map(() => true),
        //     tap(() => this.notifier.info('Boat removed')),
        //     catchError(() => of(false))
        //   )
        // )
      );
  }

  addDraftNamePrompt(): Observable<string> {
    const data: InputDialogData = {
      title: this.localizationService.translate('DRAFTS.DIALOG.ADD_NAME'),
      placeholder: this.localizationService.translate('DRAFTS.DIALOG.ADD_NAME_PLACEHOLDER'),
      label: this.localizationService.translate('DRAFTS.DIALOG.ADD_NAME_LABEL')
    };

    return this.dialog
      .open(InputDialogComponent, { data })
      .afterClosed()
      .pipe(
        filter(Boolean)
      );
  }
}
