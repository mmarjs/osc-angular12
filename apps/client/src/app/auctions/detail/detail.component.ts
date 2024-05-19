import { Component, OnDestroy, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { JobStatus } from '@ocean/api/services';
import {
  BiddingTableFormModel,
  BidItemDTO,
  BidStatus,
  JobItem,
} from '@ocean/api/shared';
import {
  AuctionsFacade,
  BidItemsFacade,
  BidsFacade,
} from '@ocean/client/state';
import { FormBuilderService } from '@ocean/libs/form-builder';
import { DATA, FormUtils } from '@ocean/shared';
import { nameValidator } from '@ocean/shared/utils';
import { untilDestroyed } from 'ngx-take-until-destroy';
import {
  BehaviorSubject,
  combineLatestWith,
  distinctUntilChanged,
  filter,
  firstValueFrom,
  map,
  tap,
} from 'rxjs';
import {
  changeCountryISOToCountryField,
  createBiddingTableViewModel,
  toBidDTO,
  toBidItems,
} from './detail.helper';
import { getDetailFieldsConfig } from './detail.config';
import { PreloadedDataForAuction } from '@ocean/api/resolvers/auction-bid-resolver/types';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnInit, OnDestroy {
  readonly auctionStatus = JobStatus;
  readonly bidStatus = BidStatus;

  readonly fields = getDetailFieldsConfig();
  readonly form = this.formBuilderService.buildReactiveForm(this.fields);

  readonly isBidCreating$ = this.auctionsFacade.isBidCreating$;
  readonly isLoading$ = new BehaviorSubject<boolean>(true);

  readonly auction$ = this.auctionsFacade.selectedAuction$;

  readonly bid$ = this.auction$.pipe(
    combineLatestWith(
      this.activatedRoute.data,
      this.auctionsFacade.selectedBid$
    ),
    map(([auction, route, currentBid]) => {
      if (typeof auction?.id !== 'number') {
        return undefined;
      }

      if (this.isEdit(route)) {
        return route?.bid;
      }

      return typeof currentBid?.status === 'string'
        ? currentBid
        : route?.preloaded?.bid;
    })
  );

  readonly isAbleToShowBidForm$ = this.bid$.pipe(
    map((bid) => this.isEdit() || bid?.status === undefined)
  );

  message?: string;

  isAbleToSignDocument?: boolean;
  isWorkInProgress?: boolean;
  isFullAmountPaid?: boolean;
  isBidAmountPaid?: boolean;
  showOnlyDescription?: boolean;

  biddingTableFormModel?: BiddingTableFormModel[];

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly auctionsFacade: AuctionsFacade,
    private readonly bidItemsFacade: BidItemsFacade,
    private readonly bidsFacade: BidsFacade,
    private readonly formBuilderService: FormBuilderService
  ) {}

  private isEdit(entity = this.activatedRoute?.snapshot?.data) {
    return entity?.title === DATA.AUCTION_DETAIL_EDIT.title;
  }

  private initBidItems(bidItems: BidItemDTO[] = []) {
    this.bidItemsFacade.initBidItems(
      bidItems.map?.((jobItem: JobItem) =>
        createBiddingTableViewModel(jobItem, true)
      )
    );
  }

  private handleValidation() {
    const countryCtrl = this.form.get('country');
    const yardOwnerCtrl = this.form.get('yardOwner');
    const originalYardOwnerValidators = [
      nameValidator,
      Validators.maxLength(100),
      Validators.required,
    ];

    countryCtrl.valueChanges
      .pipe(
        distinctUntilChanged(),
        tap((change) =>
          FormUtils.validateZipCtrlByCountry(change, this.form.get('zipCode'))
        ),
        untilDestroyed(this)
      )
      .subscribe();

    this.form
      .get('awayFromProvidersYard')
      .valueChanges.pipe(untilDestroyed(this))
      .subscribe((value) => {
        if (!value) {
          yardOwnerCtrl.clearValidators();
        } else {
          yardOwnerCtrl.setValidators(originalYardOwnerValidators);
        }
        yardOwnerCtrl.updateValueAndValidity();
      });
  }

  ngOnInit() {
    this.handleValidation();
    this.auctionsFacade.init();
    this.bidItemsFacade.initBidItems([]);

    this.bidItemsFacade.biddingTableFormModel$
      .pipe(untilDestroyed(this))
      .subscribe(
        (res) => (this.biddingTableFormModel = JSON.parse(JSON.stringify(res)))
      );

    this.activatedRoute.data
      .pipe(
        combineLatestWith(this.auction$),
        untilDestroyed(this),
        filter(([{ preloaded }]) => typeof preloaded === 'object')
      )
      .subscribe(([{ preloaded }, auction]) => {
        const data = preloaded as PreloadedDataForAuction;

        this.isWorkInProgress = auction?.status === JobStatus.JOB_IN_PROGRESS;

        this.isAbleToSignDocument = data.isAbleToSignDocument;
        this.isFullAmountPaid = data.isFullAmountPaid;
        this.isBidAmountPaid = data.isBidAmountPaid;
        this.message = data.message;
      });

    this.bid$
      .pipe(
        untilDestroyed(this),
        filter((bid) => typeof bid === 'object')
      )
      .subscribe((bid) => {
        this.initBidItems(bid?.bidItems);
        this.form?.patchValue(changeCountryISOToCountryField(bid));
        this.isLoading$.next(false);
      });

    this.auction$.pipe(untilDestroyed(this)).subscribe((auction) => {
      this.showOnlyDescription = this.isEdit();

      if (!this.isEdit()) {
        this.initBidItems(auction?.jobItems ?? []);
        this.auctionsFacade.resetSelectedBid();
      }
    });
  }

  ngOnDestroy() {
    this.isLoading$.complete();
  }

  onBiddingTableChange(table: BiddingTableFormModel[]) {
    this.biddingTableFormModel = table;
  }

  updateOne(bidItem: BiddingTableFormModel) {
    return this.bidItemsFacade.updateOne(bidItem);
  }

  removeLineItem(id: number) {
    this.bidItemsFacade.initBidItems(this.biddingTableFormModel);
    this.bidItemsFacade.deleteBidItem(id);
  }

  addLineItem(jobItem: JobItem) {
    this.bidItemsFacade.initBidItems(this.biddingTableFormModel);
    this.bidItemsFacade.addBidItem(createBiddingTableViewModel(jobItem, false));
  }

  async markToProgress() {
    const auction = await firstValueFrom(this.auction$);
    if (typeof auction?.id === 'number') {
      this.auctionsFacade.markAsInProgress(auction.id);
    }
  }

  async bidSubmit(bidAmount: number) {
    const { auction, bid } = await firstValueFrom(
      this.auction$.pipe(
        combineLatestWith(this.bid$),
        map(([a, b]) => ({
          auction: a,
          bid: b,
        }))
      )
    );

    const bidDto = toBidDTO(
      this.form.value,
      toBidItems(this.biddingTableFormModel, auction?.name ?? ''),
      bidAmount
    );

    if (bid) {
      bidDto.id = bid.id;
      bidDto.bidderName = bid.bidderName;
      bidDto.jobId = auction.id;
      this.bidsFacade.editBid(bidDto);
      return;
    }

    this.auctionsFacade.createBid(bidDto);
  }
}
