import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BidProvider } from '@ocean/api/services';
import { Bid } from '@ocean/api/shared';
import { LocalizationService } from '@ocean/internationalization';
import { PromptDialogComponent, PromptDialogData } from '@ocean/shared/dialogs';
import { AceptBidComponent } from '@ocean/shared/dialogs/acept-bid/acept-bid.component';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { BidDatabase } from './bid.database';

@Injectable({
  providedIn: 'root'
})
export class BidDialogs {
  constructor(
    protected dialog: MatDialog,
    protected database: BidDatabase,
    protected api: BidProvider,
    private localizationService: LocalizationService
  ) { }

  acceptPrompt(data: Bid): Observable<boolean> {
    return this.dialog
      .open(AceptBidComponent, { data })
      .afterClosed()
      .pipe(
        filter(Boolean)
      );
  }

  rejectPrompt(): Observable<boolean> {
    const data: PromptDialogData = {
      title: this.localizationService.translate('BIDS.REJECT'),
      content: this.localizationService.translate('BIDS.REJECT_CONTENT')
    };

    return this.dialog
      .open(PromptDialogComponent, { data })
      .afterClosed()
      .pipe(
        filter(Boolean)
      );
  }
}
