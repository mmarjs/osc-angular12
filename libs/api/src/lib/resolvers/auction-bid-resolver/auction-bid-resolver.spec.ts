import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { AuctionBidResolver } from '@ocean/api/resolvers';
import { AuctionsFacade } from '@ocean/client/state';
import { DocumentsFacadeService } from '@ocean/documents';
import { BidDTO, JobDTO, PaymentEvent } from '@ocean/api/shared';
import { JobStatus } from '@ocean/api/services';
import { ActivatedRouteSnapshot } from '@angular/router';

const mockAuctionFacade = {
  getBidByAuction: () => {},
  selectedAuction$: of(undefined),
  selectedBid$: of(undefined),
};

const mockDocumentsFacade = {
  hasActiveValidDocument: () => undefined,
  loadDocuments: () => {},
  documents$: of(undefined),
};

const mockActivatedRouteSnapshot = {
  data: of(undefined),
};

describe('Preloaded Data For Bid On Auction Resolver', () => {
  let service: AuctionBidResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        { provide: AuctionsFacade, useValue: mockAuctionFacade },
        { provide: DocumentsFacadeService, useValue: mockDocumentsFacade },
        {
          provide: ActivatedRouteSnapshot,
          useValue: mockActivatedRouteSnapshot,
        },
      ],
    });

    service = TestBed.inject(AuctionBidResolver);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it.each([
    {
      status: JobStatus.COMPLETED,
      eventType: PaymentEvent.SUCCEEDED,
    },
    {
      status: JobStatus.AWARDED,
      eventType: PaymentEvent.FAILED,
    },
  ])(
    'should return false for getFullAmountPaid when auction has ended or bid failed ($status, $eventType)',
    ({ status, eventType }) => {
      const auction: JobDTO = {
        status,
      };

      const bid: BidDTO = {
        paymentItemDTO: {
          paymentIntentId: 'TEST',
          eventType,
        },
      };

      const spy = jest.spyOn(service, 'getFullAmountPaid');
      service.getFullAmountPaid(auction, bid);

      expect(spy).toHaveReturnedWith(false);
    }
  );

  it('should return true for getFullAmountPaid when all conditions are correct', () => {
    const auction: JobDTO = {
      status: JobStatus.AWARDED,
    };

    const bid: BidDTO = {
      paymentItemDTO: {
        paymentIntentId: 'TEST',
        eventType: PaymentEvent.SUCCEEDED,
      },
    };

    const spy = jest.spyOn(service, 'getFullAmountPaid');
    service.getFullAmountPaid(auction, bid);

    expect(spy).toHaveReturnedWith(true);
  });

  it.each([
    { status: JobStatus.COMPLETED, eventType: PaymentEvent.SUCCEEDED },
    {
      status: JobStatus.AWARDED,
      eventType: PaymentEvent.FAILED,
    },
  ])(
    "should return false for getBidAmountPaid when auction or bid isn't correct ($status, $eventType)",
    ({ status, eventType }) => {
      const auction: JobDTO = {
        status,
      };

      const bid: BidDTO = {
        paymentItemDTO: {
          paymentIntentId: 'TEST',
          eventType,
        },
      };

      const spy = jest.spyOn(service, 'getBidAmountPaid');
      service.getBidAmountPaid(auction, bid);

      expect(spy).toHaveReturnedWith(false);
    }
  );

  it('should return true for getBidAmountPaid when all conditions are correct', () => {
    const auction: JobDTO = {
      status: JobStatus.AWARDED,
    };

    const bid: BidDTO = {
      paymentItemDTO: {
        paymentIntentId: 'TEST',
        eventType: PaymentEvent.SUCCEEDED,
      },
    };

    const spy = jest.spyOn(service, 'getBidAmountPaid');
    service.getBidAmountPaid(auction, bid);

    expect(spy).toHaveReturnedWith(true);
  });

  it.each([
    {
      status: JobStatus.COMPLETED,
      eventType: PaymentEvent.SUCCEEDED,
      shouldSign: true,
      expected: 'AUCTIONS.DETAILS.BID_STATUSES.COMPLETED.DESC',
    },
    {
      status: JobStatus.AWARDED,
      eventType: PaymentEvent.SUCCEEDED,
      shouldSign: true,
      expected: 'AUCTIONS.DETAILS.BID_STATUSES.ACCEPTED.FULL_AMOUNT_PAID',
    },
    {
      status: JobStatus.AWARDED,
      eventType: PaymentEvent.FAILED,
      shouldSign: true,
      expected: 'AUCTIONS.DETAILS.BID_STATUSES.REJECTED.FULL_AMOUNT_ERROR',
    },
    {
      status: JobStatus.AWARDED,
      eventType: undefined,
      shouldSign: true,
      expected: 'AUCTIONS.DETAILS.BID_STATUSES.ACCEPTED.SIGN_DOCUMENTS',
    },
    {
      status: JobStatus.AWARDED,
      eventType: undefined,
      shouldSign: false,
      expected: 'AUCTIONS.DETAILS.BID_STATUSES.ACCEPTED.WAIT_FOR_BOAT_OWNER',
    },
  ])(
    'should return $expected for getMessage',
    ({ status, eventType, shouldSign, expected }) => {
      const auction: JobDTO = {
        status,
      };

      const bid: BidDTO = {
        paymentItemDTO: {
          paymentIntentId: 'TEST',
          eventType,
        },
      };

      const spy = jest.spyOn(service, 'getMessage');
      service.getMessage(shouldSign, auction, bid);
      expect(spy).toHaveReturnedWith(expected);
    }
  );

  it.each([JobStatus.AWARDED, JobStatus.AUCTION_LIVE])(
    'should be resolved with expected object (auction status: %s)',
    async (type) => {
      const auction: JobDTO = {
        status: type,
      };

      const bid: BidDTO = {
        paymentItemDTO: {
          paymentIntentId: 'TEST',
          eventType: PaymentEvent.SUCCEEDED,
        },
      };

      const shouldSign = false;

      const activatedRouteSnapshot = TestBed.inject(ActivatedRouteSnapshot);

      service.auction$ = of(auction);
      service.bid$ = of(bid);
      service.shouldSignDocument$ = of(shouldSign);

      const resolved = await service.resolve(activatedRouteSnapshot);
      expect(resolved).toEqual({
        bid,
        isAbleToSignDocument: shouldSign,
        isFullAmountPaid: service.getFullAmountPaid(auction, bid),
        isBidAmountPaid: service.getBidAmountPaid(auction, bid),
        message: service.getMessage(shouldSign, auction, bid),
      });
    }
  );
});
