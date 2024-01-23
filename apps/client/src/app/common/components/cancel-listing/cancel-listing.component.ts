import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { JobDTO } from '@ocean/api/shared';
import { AuctionsFacade, RouterFacade } from '@ocean/client/state';
import { PromptDialogComponent, PromptDialogData } from '@ocean/shared/dialogs';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { tap,filter } from 'rxjs/operators';
@Component({
  selector: 'app-cancel-listing',
  templateUrl: './cancel-listing.component.html',
  styleUrls: ['./cancel-listing.component.scss']
})
export class CancelListingComponent implements OnInit,OnDestroy {
  @Input() auction: JobDTO;
  data: PromptDialogData = {
    title: 'Cancel Listing',
    content: `Do you really want to cancel the auction`
  };;

  constructor(private routerFacade: RouterFacade, private auctionFacade: AuctionsFacade, private dialog: MatDialog) { }
  ngOnInit(): void {

  }
  cancelPrompt() {
    return this.dialog
      .open(PromptDialogComponent, { data: this.data }).afterClosed().pipe(filter(Boolean))
  }

  onCancelListing() {
    this.cancelPrompt().pipe(
      tap(() => {
        if (this.auction?.id) {
          this.auctionFacade.cancel(this.auction?.id)
        }
        else {
          this.routerFacade.go({
            path: ['/dashboard'],
          });
        }
      }),
      untilDestroyed(this)
    ).subscribe()
  }
  ngOnDestroy() { }
}
