/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { Bid, BidStatus, TAX } from '@ocean/api/shared';
import { IconType } from '@ocean/icons';

@Component({
  selector: 'ocean-bid-summary',
  templateUrl: './bid-summary.component.html',
  styleUrls: ['./bid-summary.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BidSummaryComponent {
  @Output() collapseDetails: EventEmitter<Bid> = new EventEmitter();
  @Output() acceptBid: EventEmitter<Bid> = new EventEmitter();
  @Output() rejectBid: EventEmitter<number> = new EventEmitter();
  @Input() bid!: Bid;
  @Input() showSummaryButtons:boolean;
  @Output() sendMessage = new EventEmitter();
  TAX_AMOUNT: number = TAX;
  iconType = IconType;
  bidStatus = BidStatus;
}
