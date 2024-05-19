/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import {
    ChangeDetectionStrategy, Component,
    Input
} from '@angular/core';
import { DocumentStatus } from '@ocean/api/services';
import { Bid, PaymentEvent } from '@ocean/api/shared';
import { AuctionsFacade } from '@ocean/client/state';

@Component({
  selector: 'ocean-auction-bids-process',
  templateUrl: './auction-bids-process.component.html',
  styleUrls: ['./auction-bids-process.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuctionBidsProcessComponent {
  @Input() bid!: Bid;
  @Input() jobId: number | null = null;
  document$ = this.auctionsFacade.selectedDocument$;
  paymentStatus = PaymentEvent;
  documentStatus = DocumentStatus;

  constructor(private auctionsFacade: AuctionsFacade) {}
}
