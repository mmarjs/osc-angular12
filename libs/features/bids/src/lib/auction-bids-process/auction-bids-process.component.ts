/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { Component, ChangeDetectionStrategy, Input, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Bid, PaymentEvent } from '@ocean/api/shared';
import { AuctionsFacade } from '@ocean/client/state';
import { Document } from 'libs/documents/src/lib/state/models';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { filter } from 'rxjs';

@Component({
  selector: 'ocean-auction-bids-process',
  templateUrl: './auction-bids-process.component.html',
  styleUrls: ['./auction-bids-process.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuctionBidsProcessComponent implements OnInit,OnDestroy {
  @Input() bid!: Bid;
  @Input() jobId: number | null = null;
  document!: Document;
  paymentStatus = PaymentEvent;
  constructor(private auctionsFacade:AuctionsFacade, private cd: ChangeDetectorRef,private router: Router){ }

  ngOnInit(): void {
    this.auctionsFacade.selectedDocument$.pipe(filter(document=>!!document),untilDestroyed(this)).subscribe(document=>{
      this.document = document;
      this.cd.detectChanges();
    })
  }

  ngOnDestroy(): void { }

}
