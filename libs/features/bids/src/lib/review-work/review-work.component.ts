/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { JobStatus } from '@ocean/api/services';
import { Bid, JobDTO } from '@ocean/api/shared';
import { AuctionsFacade, BidsFacade } from '@ocean/client/state';
import { IconType } from '@ocean/icons';
import { LocalizationService } from '@ocean/internationalization';
import { PromptDialogComponent } from '@ocean/shared/dialogs';
import { ContactListerComponent } from '@ocean/shared/dialogs/contact-lister/contact-lister.component';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { filter, first, Observable, tap } from 'rxjs';

@Component({
  selector: 'ocean-review-work',
  templateUrl: './review-work.component.html',
  styleUrls: ['./review-work.component.scss'],
})
export class ReviewWorkComponent implements OnInit, OnDestroy {
  bid$: Observable<Bid> = this.bidsFacade.bid$;
  auction$: Observable<JobDTO> = this.auctionsFacade.selectedAuction$.pipe(
    tap(() => {
      this.loading = false;
    })
  );

  iconType = IconType;
  JobStatus = JobStatus;

  loading = false;


  constructor(
    private bidsFacade: BidsFacade,
    private auctionsFacade: AuctionsFacade,
    private localizationService: LocalizationService,
    private matDialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.bidsFacade.loadBid();
  }

  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
  ngOnDestroy(): void {
    // it neccessary to call this method to untilDestroyed operator work
  }

  onSendMessage() {
    this.matDialog.open(ContactListerComponent);
  }

  acceptWork(auctionId: number) {
    this.matDialog
      .open(PromptDialogComponent, {
        data: {
          title: this.localizationService.translate('REVIEW_WORK.ACCEPT_WORK_CAUTION_TITLE'),
          content: this.localizationService.translate('REVIEW_WORK.ACCEPT_WORK_CAUTION_MESSAGE'),
        },
      })
      .afterClosed()
      .pipe(
        untilDestroyed(this),
        first((res) => res === true)
      )
      .subscribe(() => {
        this.loading = true;
        this.auctionsFacade.markAsCompleted(auctionId);
      });
  }
}
