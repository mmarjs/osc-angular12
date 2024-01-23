import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'ocean-auction-time-remaining',
  templateUrl: './auction-time-remaining.component.html',
  styleUrls: ['./auction-time-remaining.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuctionTimeRemainingComponent {
  @Input() auctionEndDate!: string;
}
