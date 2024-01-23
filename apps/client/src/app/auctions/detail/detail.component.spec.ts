import { NO_ERRORS_SCHEMA } from '@angular/core';
import {
  ComponentFixture,
  TestBed,
  TestModuleMetadata,
} from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ActivatedRoute } from '@angular/router';
import { provideMockActions } from '@ngrx/effects/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { DocumentStatus, UserStatus } from '@ocean/api/services';
import { mockAuctionsFacade } from '@ocean/testing/helpers/auctionsTestFacade';
import {
  AuctionsFacade,
  BidItemsFacade,
  BidsFacade,
} from '@ocean/client/state';
import { DocumentsFacadeService } from '@ocean/documents';
import { IconsModule } from '@ocean/icons';
import { LocalizationService } from '@ocean/internationalization';
import { LayoutComponentsModule } from '@ocean/layout';
import { PartialsModule } from '@ocean/shared/partials/partials.module';
import { SumArrayValuesPipe } from '@ocean/shared/pipes/sum-array-values.pipe';
import { DATA } from '@ocean/shared/routing';
import { mockBidItemsFacade } from '@ocean/testing/helpers/bidItemsFacade';
import {
  DummyBidData,
  DummyPaidBidData,
  selectedAuctionTestData,
} from '@ocean/testing/helpers/Models/testData';
import { TestMatModule, TestModule } from '@ocean/testing/helpers/test.module';
import { render, screen } from '@testing-library/angular';
import { MockProvider } from 'ng-mocks';
import { of } from 'rxjs';
import { BoatDetailsComponent } from '../auctions.barrel';
import { AuctionInfoComponent } from './auction-info/auction-info.component';
import { DetailComponent } from './detail.component';
import { JobStatus } from '@ocean/api/services';
import { Bid, BidStatus } from '@ocean/api/shared';

const bid: Bid = {
  id: 2804410,
  status: BidStatus.ACCEPTED,
  description: "test",
  autoBid: false,
  bidAmount: 250,
  minBid: null,
  approximateDuration: 20,
  workStartDate: '10/09/22',
  bidderName: "John Santos",
  address: "881 NW 13th Ave",
  address2: "881 NW 13th Ave",
  city: "Miami",
  state: "FL",
  zipCode: "33125",
  country: "USA",
  startDeposit: 1,
  awayFromProvidersYard: false,
  yardOwner: null,
  job: {
      id: 2749010,
      status: JobStatus.AWARDED,
      auctionEndDate: '15/09/22'
  },
 }


const mockActivatedRoute = {
  data: of({
    title: DATA.AUCTION_DETAIL_EDIT.title,
  }),
  snapshot: {
    data: {
      title: DATA.AUCTION_DETAIL_EDIT.title,
    },
  },
};

const DialogMock = {
  open() {
    return {
      afterClosed: () => of({}),
    };
  },
};

const customMockAuctionsFacade = (_bid = {}) => ({
  ...mockAuctionsFacade,
  selectedBid$: of(_bid),
  resetSelectedBid: () => {}
});

const mockBidsFacade = {
  selectAcceptedBid$: of({ bid: bid }),
  bids$: of([{ bid: bid}]),
  loadBids: jest.fn,
  editBid: jest.fn,
}

const mockDocumentsFacadeService = {
  shouldSignDocument$: of(true),
  documents$: of([
    {
      id: '1',
      title: 'title',
      externalDocumentId: 'externalDocumentId',
      userStatus: UserStatus.Completed,
      status: DocumentStatus.New,
    },
  ])
}

const mockLocalization = {
  translate: (key: string) => key
}

let actions$: any;

const deps: TestModuleMetadata = {
  imports: [
    TestModule,
    TestMatModule,
    MatProgressSpinnerModule,
    LayoutComponentsModule,
    IconsModule,
    PartialsModule,
  ],
  declarations: [
    DetailComponent,
    SumArrayValuesPipe,
    BoatDetailsComponent,
    AuctionInfoComponent,
  ],
  providers: [
    provideMockStore({
      initialState: {
        auctions: {
          selectedAuction: selectedAuctionTestData,
          selectedBid: DummyBidData,
        },
      },
    }),
    provideMockActions(() => actions$),
    {provide: AuctionsFacade, useValue: customMockAuctionsFacade()},
    MockProvider(ActivatedRoute, mockActivatedRoute as any),
    { provide: BidItemsFacade, useValue: mockBidItemsFacade },
    { provide: LocalizationService, useValue: mockLocalization},
    { provide: MatDialog, useValue: DialogMock },
    { provide: BidsFacade, useValue: mockBidsFacade },
    { provide: DocumentsFacadeService, useValue: mockDocumentsFacadeService}
  ],
  schemas: [NO_ERRORS_SCHEMA],
};

describe('DetailComponent', () => {
  let component: DetailComponent;
  let fixture: ComponentFixture<DetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule(deps)
      .overrideTemplate(DetailComponent, '')
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('check ngOnInit', () =>{
    it('should call ngOnInit', () => {
      const param = [];
      const auctionsFacade = TestBed.inject(AuctionsFacade);
      const spy1 = jest.spyOn(auctionsFacade, 'init');
      const spy2 = jest.spyOn(mockBidItemsFacade, 'initBidItems');
      component.ngOnInit();
      expect(spy1).toBeCalled();
      expect(spy2).toHaveBeenCalledWith(param);
    });
  });

  describe('on updateOne', () => {
    it('should call bidItemsFacade.updateOne', () => {
      const spy = jest.spyOn(mockBidItemsFacade, 'updateOne');
      component.updateOne({
        id: 1,
        title: 'title',
        amount: 1,
        quantity: 1,
        isStoredinDB: true,
        description: '',
        comments: '',
        note: {
          text: '',
          files: [],
        },
      });
      expect(spy).toBeCalled();
    });
  });

  describe('on removeLineItem', () => {
    it('should call bidItemsFacade.initBidItems and deleteBidItem', () => {
      const spy = jest.spyOn(mockBidItemsFacade, 'initBidItems');
      const spy2 = jest.spyOn(mockBidItemsFacade, 'deleteBidItem');
      component.removeLineItem(123);
      expect(spy).toBeCalled();
      expect(spy2).toBeCalled();
    });
  });

  describe('on addLineItem', () => {
    const jobItem = {
      description: 'test',
      id: 123,
      title: 'test',
      amount: 150,
    };
    it('should call bidItemsFacade.initBidItems and addBidItem', () => {
      const spy = jest.spyOn(mockBidItemsFacade, 'initBidItems');
      const spy2 = jest.spyOn(mockBidItemsFacade, 'addBidItem');
      component.addLineItem(jobItem);
      expect(spy).toBeCalled();
      expect(spy2).toBeCalled();
    });
  });

  describe('on bidSubmit', () => {
    it('should call auctionsFacade.createBid', () => {
      const auctionsFacade = TestBed.inject(AuctionsFacade);
      const spy = jest.spyOn(auctionsFacade, 'createBid');
      component.auction = {
        id: 10,
        name: '',
      };
      component.bid = null;
      component.bidSubmit(500);
      expect(spy).toBeCalled();
    });
    it('should call bidsFacade.editBid', () => {
      const spy = jest.spyOn(mockBidsFacade, 'editBid');
      component.auction = {
        id: 10,
        name: '',
      };
      component.bid = DummyBidData;
      component.bidSubmit(500);
      expect(spy).toBeCalled();
    });
  });
});

describe('DetailComponent', () => {
  describe('integration', () => {
    it('should render with proper information', async () => {
      const cmp = await render(DetailComponent, {
        ...deps,
      });

      cmp.detectChanges();

      expect(screen.getByText("122' qqqq 2022")).toBeInTheDocument();
      expect(screen.getByText('Bangalore, Karnataka')).toBeInTheDocument();
      expect(screen.getByText('560069')).toBeInTheDocument();
      expect(screen.getAllByText(/Jul 15, 2022/i)).toHaveLength(2);
      expect(screen.getAllByText(/Jul 18, 2022/i)).toHaveLength(2);
    });

    describe('Accepted Bid', () => {
      it.skip('should render send message button', async () => {
        const cmp = await render(DetailComponent, {
          ...deps,
          providers: [
            ...deps.providers,
            MockProvider(ActivatedRoute, {
              data: of({
                title: DATA.AUCTION_DETAIL_EDIT.title,
                bid: bid,
                auction: selectedAuctionTestData,
              }),
            } as any),
          ],
        });

        TestBed.inject(MockStore).setState({
          auctions: {
            selectedBid: bid,
            selectedAuction: selectedAuctionTestData,
          },
        });

        cmp.detectChanges();

        expect(
          screen.queryByRole('button', { name: 'COMMON.BUTTONS.SEND_MESSAGE' })
        ).toBeInTheDocument();
      });

      it('should render documents button when Documents not signed', async () => {
        const cmp = await render(DetailComponent, {
          ...deps,
          providers: [
            ...deps.providers,
            MockProvider(DocumentsFacadeService, {
              shouldSignDocument$: of(true),
            }),
            {provide: AuctionsFacade, useValue: customMockAuctionsFacade(bid)},
            MockProvider(ActivatedRoute, {
              data: of({
                title: DATA.AUCTION_DETAIL_EDIT.title,
                bid: bid,
                auction: selectedAuctionTestData,
              }),
            } as any),
          ],
        });

        TestBed.inject(MockStore).setState({
          auctions: {
            selectedBid: bid,
            selectedAuction: selectedAuctionTestData,
          },
        });

        cmp.detectChanges();

        expect(
          screen.queryByRole('button', { name: 'BIDS.DOCUMENTS' })
        ).toBeInTheDocument();
        expect(
          screen.queryByText(
            'AUCTIONS.DETAILS.BID_STATUSES.ACCEPTED.SIGN_DOCUMENTS'
          )
        ).toBeInTheDocument();
      });

      it('should not render documents button when Documents signed', async () => {
        const cmp = await render(DetailComponent, {
          ...deps,
          providers: [
            ...deps.providers,
            MockProvider(DocumentsFacadeService, {
              shouldSignDocument$: of(false),
            }),
            {provide: AuctionsFacade, useValue: customMockAuctionsFacade(bid)},
            MockProvider(ActivatedRoute, {
              data: of({
                title: DATA.AUCTION_DETAIL_EDIT.title,
                bid: bid,
                auction: selectedAuctionTestData,
              }),
            } as any),
          ],
        });

        TestBed.inject(MockStore).setState({
          auctions: {
            selectedBid: bid,
            selectedAuction: selectedAuctionTestData,
          },
        });

        cmp.detectChanges();
        
        expect(
          screen.queryByRole('button', { name: 'BIDS.DOCUMENTS' })
        ).not.toBeInTheDocument();
        expect(
          screen.getByText(
            'AUCTIONS.DETAILS.BID_STATUSES.ACCEPTED.WAIT_FOR_BOAT_OWNER'
          )
        ).toBeInTheDocument();
      });

      it('should render sign button when documents signed and boat owner pay full amount', async () => {
        const cmp = await render(DetailComponent, {
          ...deps,
          providers: [
            ...deps.providers,
            {provide: AuctionsFacade, useValue: customMockAuctionsFacade(DummyPaidBidData)},
            MockProvider(DocumentsFacadeService, {
              documents$: of([
                {
                  id: '1',
                  title: 'title',
                  externalDocumentId: 'externalDocumentId',
                  userStatus: UserStatus.Completed,
                  status: DocumentStatus.New,
                },
              ]),
            }),
          ],
        });

        TestBed.inject(MockStore).setState({
          auctions: {
            selectedAuction: selectedAuctionTestData,
            selectedBid: DummyPaidBidData,
          },
        });

        cmp.detectChanges();

        expect(
          screen.queryByRole('button', { name: 'BIDS.BID_START_REPAIR' })
        ).toBeInTheDocument();
      });
    });
  });
});
