import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { AuctionsFacade } from '@ocean/client/state';

@Component({
  selector: 'ocean-auction-time-remaining',
  templateUrl: './auction-time-remaining.component.html',
  styleUrls: ['./auction-time-remaining.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuctionTimeRemainingComponent {
  @Input() auctionEndDate = '';
  @Input() auctionId: number | undefined = undefined;

  constructor(private auctionFacade: AuctionsFacade) {}

  extendAuctionEndDate() {
    if (this.auctionId) {
      this.auctionFacade.extendAuctionEndDate(this.auctionId);
    }
  }
}
