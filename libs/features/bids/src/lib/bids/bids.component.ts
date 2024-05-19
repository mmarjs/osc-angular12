/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Bid } from '@ocean/api/shared';
import { AuctionsFacade, BidsFacade } from '@ocean/client/state';
import { filter, delay, map, Subject, Subscription, switchMap, tap } from 'rxjs';
import { BidDialogs } from '@ocean/api/data';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ContactListerComponent } from '@ocean/shared/dialogs/contact-lister/contact-lister.component';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalizationService } from '@ocean/internationalization';
import { ROUTE_MAPPING, urlBuilder } from '../bids.module';

@Component({
  selector: 'ocean-bids',
  templateUrl: './bids.component.html',
  styleUrls: ['./bids.component.scss'],
})
export class BidsComponent implements OnInit, OnDestroy {
  bids:Bid[]=[];
  filterForm!: FormGroup;
  searchValue: Subject<string> = new Subject<string>();
  priceFilters = [{ title: this.localizationService.translate('FORMS.LABELS.HIGH_TO_LOW'), value: 'desc' },
  { title: this.localizationService.translate('FORMS.LABELS.LOW_TO_HIGH'), value: 'asc' }]
  isLoading = false;
  bidsSubscription: Subscription | null = null;
  acceptedBid: Bid | null = null;
  bidRejectSubscription: Subscription | null = null;

  constructor(
    private bidsFacade: BidsFacade,
    private bidDialogs: BidDialogs,
    private fb: FormBuilder,
    private matDialog:MatDialog,
    private router:Router,
    private localizationService:LocalizationService,
    private activatedRoute: ActivatedRoute,
    private auctionsFacade: AuctionsFacade
  ) { }

  ngOnInit() {
    this.bidsSubscription = this.bidsFacade.bids$.pipe(
      tap(() => this.isLoading = true),
      delay(500),
      map(bids => {
        this.bids = bids;
        this.isLoading = false;
      })
    ).subscribe()

    this.filterForm = this.fb.group({
      price: [],
      startDate: [],
      rating: [],
      completeTime: []
    })
    this.bidRejectSubscription = this.bidsFacade.selectRejectedBid$.subscribe(res => {
      res && this.bidsFacade.loadBids();
    })
  }

  onSearch(srchQry: string) {
    this.searchValue.next(srchQry);
  }

  acceptBid(bid: Bid) {
    this.bidDialogs
      .acceptPrompt(bid)
      .pipe(
        tap(() => this.bidsFacade.acceptBid(bid?.id as number)),
        switchMap(() => this.bidsFacade.selectAcceptedBid$),
        filter((res) => !!res),
        tap((res) => this.auctionsFacade.getDocuments(res.jobId)),
        map((res) => res?.id),
        untilDestroyed(this),
      )
      .subscribe((bidId) => {
        const url = urlBuilder(ROUTE_MAPPING.documents, {
          bidId: bidId?.toString() ?? '',
        }).split('/');
        const fullUrl = this.router.createUrlTree(['..', ...url], { relativeTo: this.activatedRoute });

        this.router.navigateByUrl(fullUrl);
      });
  }

  rejectBid(id: number) {
    this.bidDialogs
      .rejectPrompt()
      .pipe(
        tap(() => this.bidsFacade.rejectBid(id)),
        untilDestroyed(this)
      )
      .subscribe();
  }

  sendMessage() {
    this.matDialog.open(ContactListerComponent,{
      width: '500px'
    })
  }

  ngOnDestroy(): void {
    this.bidsSubscription?.unsubscribe();
    this.bidRejectSubscription?.unsubscribe();
  }
}
