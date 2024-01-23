import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BoatProvider } from '@ocean/api/services';
import { BoatOutputDTO } from '@ocean/api/shared';
import { PromptDialogComponent, PromptDialogData } from '@ocean/shared/dialogs';
import { NotifierService } from '@ocean/shared/services';
import { Observable, of } from 'rxjs';
import { catchError, filter, map, switchMap, tap } from 'rxjs/operators';
import { BoatDatabase } from './boat.database';

@Injectable({
  providedIn: 'root'
})
export class BoatDialogs {
  constructor(
    protected dialog: MatDialog,
    protected database: BoatDatabase,
    protected boat: BoatProvider,
    private notifier: NotifierService
  ) {}

  deletePrompt(item: BoatOutputDTO): Observable<boolean> {
    const data: PromptDialogData = {
      title: 'Delete Boat',
      content: `Do you really want to remove '${item.name}'?`
    };

    return this.dialog
      .open(PromptDialogComponent, { data: data })
      .afterClosed()
      .pipe(
        filter(Boolean), // only process confirmed prompts
        switchMap(() =>
          this.boat.deleteBoatById({ id: item.id }).pipe(
            map(() => true),
            tap(() => this.notifier.info('Boat removed')),
            catchError(() => of(false))
          )
        )
      );
  }
}
