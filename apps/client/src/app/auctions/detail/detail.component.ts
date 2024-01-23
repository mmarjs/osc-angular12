import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { JobStatus } from '@ocean/api/services';
import {
  Bid,
  BiddingTableFormModel,
  BidDTO,
  BidItemDTO,
  BidStatus,
  JobDTO,
  JobItem,
  PaymentEvent,
} from '@ocean/api/shared';
import { createBiddingTableViewModel } from '@ocean/client/auctions/detail/detail.helper';
import {
  AuctionsFacade,
  BidItemsFacade,
  BidsFacade,
} from '@ocean/client/state';
import { DocumentsFacadeService } from '@ocean/documents';
import { FormBuilderService } from '@ocean/libs/form-builder';
import { DATA, FormUtils } from '@ocean/shared';
import { nameValidator } from '@ocean/shared/utils';
import { countryEntityToISO } from '@ocean/shared/utils/country-to-iso';
import { dateWithoutTimezone } from '@ocean/shared/utils/dateWithoutTimezone';
import { stringToCountryField } from '@ocean/shared/utils/string-to-country-field';
import { CountryISO } from 'ngx-intl-tel-input';
import { untilDestroyed } from 'ngx-take-until-destroy';
import {
  BehaviorSubject,
  distinctUntilChanged,
  map,
  Observable,
  of,
  tap,
  catchError
} from 'rxjs';
import { BiddingFormTableComponent } from '../auctions.barrel';
import { getDetailFormConfig, TypedDetailFormValues } from './detail.config';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnInit, OnDestroy {
  formBlock = getDetailFormConfig();
  form = this.formBuilderService.buildReactiveForm(this.formBlock);
  bid: BidDTO | null = null;

  showOnlyDescription: boolean;

  biddingTableFormModel: BiddingTableFormModel[];
  auction: JobDTO | null = null;
  shouldSignDocument$ = this.documentsFacade.shouldSignDocument$;
  isBidCreating$: Observable<boolean> = this.auctionsFacade.isBidCreating$;
  isLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

  paymentEvent = PaymentEvent;
  auctionStatus = JobStatus;
  bidStatus = BidStatus;
  bids: Bid[] | undefined;

  @ViewChild('biddingForm') biddingForm: ElementRef;
  @ViewChild('biddingFormTable') biddingFormTable: BiddingFormTableComponent;

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly auctionsFacade: AuctionsFacade,
    private readonly bidItemsFacade: BidItemsFacade,
    private readonly bidsFacade: BidsFacade,
    private readonly formBuilderService: FormBuilderService,
    private readonly documentsFacade: DocumentsFacadeService,
  ) {}

  private get isEdit(): boolean {
    return (
      this.activatedRoute?.snapshot?.data.title ===
      DATA.AUCTION_DETAIL_EDIT.title
    );
  }

  get isFullAmountPaid(): boolean {
    return this.bid?.paymentItemDTO?.eventType === PaymentEvent.SUCCEEDED;
  }

  get shouldShowBidForm(): boolean {
    if (!this.isEdit) {
      return !this.bid ? true : false;
    }
    if (this.bid) {
      return this.bid.status !== BidStatus.ACCEPTED;
    }
    return this.auction?.status === JobStatus.AUCTION_LIVE;
  }

  get isWorkInProgress(): boolean {
    return this.auction?.status === JobStatus.JOB_IN_PROGRESS;
  }

  get bidAcceptedMessage$(): Observable<string> {
    if (this.isFullAmountPaid) {
      return of('AUCTIONS.DETAILS.BID_STATUSES.ACCEPTED.FULL_AMOUNT_PAID');
    }
    return this.shouldSignDocument$.pipe(
      map((shouldSignDocument) =>
        shouldSignDocument
          ? 'AUCTIONS.DETAILS.BID_STATUSES.ACCEPTED.SIGN_DOCUMENTS'
          : 'AUCTIONS.DETAILS.BID_STATUSES.ACCEPTED.WAIT_FOR_BOAT_OWNER'
      ),
      untilDestroyed(this)
    );
  }

  ngOnInit() {
    // initializations
    this.auctionsFacade.init();
    this.bidItemsFacade.initBidItems([]);
    this.initForm();

    this.bidsFacade.bids$
    .pipe(
      catchError(error => {
         this.bids = [];
         return of(error);
      }),
      tap(res => this.bids = res),
      untilDestroyed(this),
    ).subscribe();

    this.bidItemsFacade.biddingTableFormModel$
      .pipe(untilDestroyed(this))
      .subscribe(
        (res: BiddingTableFormModel[]) =>
          (this.biddingTableFormModel = JSON.parse(JSON.stringify(res)))
    );

    this.auctionsFacade.selectedAuction$
      .pipe(untilDestroyed(this))
      .subscribe((auction) => {
        this.form.reset();
        this.auction = auction;
        this.showOnlyDescription = this.isEdit;
        const auctionId = auction.id;
        // load related data
        if (auctionId) {
          const checkBidOfCurrentUser = this.bids?.some(bid => bid.job.id === auctionId);
          this.documentsFacade.loadDocuments(auctionId);
          if (checkBidOfCurrentUser) this.auctionsFacade.getBidByAuction(auctionId);
        } else {
          // if no auction reset bid and stop loading
          this.auctionsFacade.resetSelectedBid();
          this.isLoading$.next(false);
        }
        if (!this.isEdit) {
          // init biding table
          this.initBidItems(auction?.jobItems ?? []);
          // if we look at auction details we need to reset bid
          this.auctionsFacade.resetSelectedBid();
          this.isLoading$.next(false);
        }
      });

    // we get it only at edit time
    this.auctionsFacade.selectedBid$
      .pipe(untilDestroyed(this))
      .subscribe((bid) => {
        this.bid = bid;
        if (bid) {
          this.initBidItems(bid.bidItems);
          this.form?.patchValue(this.changeCountryISOToCountryField(bid));
        }
        this.isLoading$.next(false);
      });
  }

  private initBidItems(bidItems: BidItemDTO[] = []) {
    this.bidItemsFacade.initBidItems(
      bidItems.map?.((jobItem: JobItem) =>
        createBiddingTableViewModel(jobItem, true)
      )
    );
  }

  ngOnDestroy() {
    this.isLoading$.complete();
  }

  private initForm(bid?: Bid) {
    this.form.patchValue({
      approximateDuration: bid?.approximateDuration,
      workStartDate: bid?.workStartDate,
      awayFromProvidersYard: bid?.awayFromProvidersYard,
      yardOwner: bid?.yardOwner,
      country: stringToCountryField(bid?.country ?? CountryISO.UnitedStates),
      zipCode: bid?.zipCode,
    });
    this.handleYardOwnerValidation();

    const countryCtrl = this.form.get('country');
    countryCtrl.valueChanges
      .pipe(
        distinctUntilChanged(),
        tap((change) =>
          FormUtils.validateZipCtrlByCountry(change, this.form.get('zipCode'))
        ),
        untilDestroyed(this)
      )
      .subscribe();
  }

  private handleYardOwnerValidation() {
    const yardOwnerCtrl = this.form.get('yardOwner');
    const originalYardOwnerValidators = [
      nameValidator,
      Validators.maxLength(100),
      Validators.required,
    ];
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

  private toBidDTO(
    formValues: TypedDetailFormValues,
    bidItems: BidItemDTO[],
    bidAmount: number
  ): BidDTO {
    return {
      bidItems,
      bidAmount,
      description: 'test',
      approximateDuration: +formValues?.approximateDuration,
      workStartDate: dateWithoutTimezone(formValues?.workStartDate),
      country: countryEntityToISO(formValues?.country),
      address: formValues?.address,
      address2: formValues?.address2,
      city: formValues?.city,
      startDeposit: 1,
      state: formValues?.state,
      zipCode: formValues?.zipCode ?? '0000',
      awayFromProvidersYard: formValues?.awayFromProvidersYard,
      yardOwner: formValues?.awayFromProvidersYard
        ? formValues?.yardOwner
        : null,
    };
  }

  private toBidItems(items: BiddingTableFormModel[]) {
    return items.map(
      ({ amount, description, id, quantity, note, comments }) => ({
        amount: amount || 0,
        description,
        id,
        quantity,
        auctionName: this.auction?.name ?? '',
        comments: note?.text ? note.text : comments,
      })
    );
  }

  updateOne(bidItem: BiddingTableFormModel) {
    return this.bidItemsFacade.updateOne(bidItem);
  }

  changeCountryISOToCountryField(entity?: BidDTO) {
    const code =
      typeof entity?.country === 'string'
        ? entity.country
        : entity?.country?.alpha3Code;
    return {
      ...(entity ?? {}),
      country: stringToCountryField(code),
    };
  }

  removeLineItem(id: number) {
    this.bidItemsFacade.initBidItems(this.biddingTableFormModel);
    this.bidItemsFacade.deleteBidItem(id);
  }

  addLineItem(jobItem: JobItem) {
    this.bidItemsFacade.initBidItems(this.biddingTableFormModel);
    this.bidItemsFacade.addBidItem(createBiddingTableViewModel(jobItem, false));
  }

  markToProgress() {
    this.isLoading$.next(true);
    this.auctionsFacade.markAsInProgress(this.auction.id);
  }

  bidSubmit(bidAmount: number) {
    const bidDto = this.toBidDTO(
      this.form.value,
      this.toBidItems(this.biddingTableFormModel),
      bidAmount
    );

    if (this.bid) {
      bidDto.id = this.bid.id;
      bidDto.bidderName = this.bid.bidderName;
      bidDto.jobId = this.auction.id;
      this.bidsFacade.editBid(bidDto);
      return;
    }

    this.auctionsFacade.createBid(bidDto);
  }
}
