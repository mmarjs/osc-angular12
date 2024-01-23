import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { TranslatePipe } from '@ngx-translate/core';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { AppComponentsModule } from '@ocean/client/common/components/components.module';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { LayoutComponentsModule } from '@ocean/layout';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { PartialsModule } from '@ocean/shared/partials/partials.module';
import { MockModule, MockPipe } from 'ng-mocks';
import { AuctionBidsProcessComponent } from '../auction-bids-process/auction-bids-process.component';
import { AuctionTimeRemainingComponent } from '../auction-time-remaining/auction-time-remaining.component';
import { AuctionsFacade, BidsFacade, RouterFacade } from '@ocean/client/state';
import { BidsShellComponent } from './bids-shell.component';
import { LocalizationService } from '@ocean/internationalization';
import { MatDialogModule } from '@angular/material/dialog';
import { MockProvider } from 'ng-mocks';
import { ButtonComponent } from '@ocean/shared/partials/button/button.component';
import { BidProvider, JobProvider, JobStatus } from '@ocean/api/services';
import { NotifierService } from '@ocean/shared/services';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import {
  Bid,
  BidStatus
} from '@ocean/api/shared';
import { hot } from 'jest-marbles';

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

const activatedRoute = {
  data: of({
    auction: {},
  }),
  firstChild: {
    routerConfig: {
      data: {
        title: ''
      }
    }
  },
  params: of({
    id: ''
  })
};

const DialogMock = {
  open() {
    return {
      afterClosed: () => of({}),
    };
  },
};

const mockBidsFacade = {
  selectAcceptedBid$: of({ bid: bid }),
  bid$: of({ bid: bid}),
  loadBids: jest.fn
}

const mockNotifierService = {
  success: jest.fn(),
  error: jest.fn()
};

const mockLocalization = {
  translate: (v: string) => v
};

describe('BidsShellComponent', () => {
  let component: BidsShellComponent;
  let fixture: ComponentFixture<BidsShellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        MatDialogModule,
        MockModule(AppComponentsModule),
        PartialsModule,
        MockModule(LayoutComponentsModule),
      ],
      declarations: [
        ButtonComponent,
        BidsShellComponent,
        MockPipe(TranslatePipe, (v) => v),
        AuctionBidsProcessComponent,
        AuctionTimeRemainingComponent,
      ],
      providers: [
        provideMockStore(),
        { provide: ActivatedRoute, useValue: activatedRoute },
        MockProvider(AuctionsFacade),
        { provide: BidsFacade, useValue: mockBidsFacade},
        {provide: LocalizationService, useValue: mockLocalization},
        MockProvider(RouterFacade),
        MockProvider(JobProvider),
        MockProvider(BidProvider),
        { provide: NotifierService, useValue: mockNotifierService},
        MockProvider(NotifierService, {error: jest.fn()}),
        { provide: MatDialog, useValue: DialogMock },
        MockProvider(TranslateService, {
          instant: v => v
        }),
      ],
    }).overrideTemplate(BidsShellComponent, '')
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BidsShellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('check ngOnInit', () => {
    it('bidsFacade.selectAcceptedBid$ should be called', async () => {
      const bidsFacade = TestBed.inject(BidsFacade);
      const spy = jest.spyOn(bidsFacade, 'loadBids');
      component.ngOnInit();
      expect(spy).toBeCalled();
    });
  });

  describe('check cancelPrompt', () => {
    it('should call cancelPrompt', () => {
      const spy = jest.spyOn(component, 'cancelPrompt');
      component.cancelPrompt();
      expect(spy).toBeCalled();
    });
  });

  describe('check cancelRepair', () => {
    it('should call cancelRepair', () => {
      const auctionId = '123';
      const spy = jest.spyOn(component, 'cancelPrompt');
      component.cancelRepair(auctionId);
      expect(spy).toBeCalled();
    });
  });


  describe('check ngOnDestroy', () => {
    it('should call auctionsFacade.setSelectedAuction and auctionsFacade.setSelectedDocument', () => {
      const param = undefined;
      const auctionsFacade = TestBed.inject(AuctionsFacade);
      jest.spyOn(auctionsFacade, 'setSelectedAuction').mockImplementation();
      jest.spyOn(auctionsFacade, 'setSelectedDocument').mockImplementation();
      component.ngOnDestroy();
      expect(auctionsFacade.setSelectedAuction).toHaveBeenCalledWith(param);
      expect(auctionsFacade.setSelectedDocument).toHaveBeenCalledWith(param);
    });
  });
});
