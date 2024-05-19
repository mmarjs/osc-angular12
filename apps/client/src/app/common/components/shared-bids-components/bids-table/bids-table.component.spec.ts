import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { BidsFacade } from '@ocean/client/state';
import { IconsModule } from '@ocean/icons';
import { LocalizationService } from '@ocean/internationalization';
import { LinkDirective } from '@ocean/shared';
import { ButtonComponent } from '@ocean/shared/partials/button/button.component';
import { Router } from '@angular/router';
import {
  TestModule,
  TestStoreEnvModule
} from '@ocean/testing/helpers/test.module';
import { MockComponent, MockProvider } from 'ng-mocks';
import { of } from 'rxjs';
import { BidSummaryComponent } from '../bid-summary/bid-summary.component';
import { BidItemsTableComponent } from './../bid-items-table/bid-items-table.component';
import { BidsTableComponent } from './bids-table.component';
import { BidProvider, JobProvider } from '@ocean/api/services';
import {
  Bid,
  BidStatus
} from '@ocean/api/shared';
import { JobStatus } from '@ocean/api/services';
import SpyInstance = jest.SpyInstance;

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

describe('BidsTableComponent', () => {
  let component: BidsTableComponent;
  let fixture: ComponentFixture<BidsTableComponent>;
  let router: SpyInstance;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        TestStoreEnvModule,
        TestModule,
        MatTableModule,
        NoopAnimationsModule,
        RouterTestingModule,
        IconsModule,
        MatButtonModule,
        MatDialogModule,
        MatSnackBarModule,
        MatPaginatorModule,
        MatProgressSpinnerModule
      ],
      declarations: [
        BidsTableComponent,
        ButtonComponent,
        BidSummaryComponent,
        LinkDirective,
        MockComponent(BidItemsTableComponent),
      ],
      providers: [
        MockProvider(LocalizationService, { translate: (key: string) => key }),
        MockProvider(JobProvider),
        MockProvider(BidProvider),
        MockProvider(BidsFacade),
      ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BidsTableComponent);
    component = fixture.componentInstance;
    component.filterValue = of('test');
    fixture.detectChanges();
    const injectedRouter = TestBed.inject(Router);
    injectedRouter.initialNavigation();
    router = jest.spyOn(injectedRouter, 'navigate').mockReturnValue(Promise.resolve(true));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('check isAuctionEnded', () => {
    it('isAuctionEnded should return true', () => {
      const auction = {
        status: JobStatus.AUCTION_CANCELLED,
        auctionEndDate: new Date('15/09/30')
      }
      const spy = jest.spyOn(component, 'isAuctionEnded');
      component.isAuctionEnded(auction);
      expect(spy).toReturnWith(true);
    });

    it('isAuctionEnded should return false', () => {
      const auction = {
        status: JobStatus.AWARDED,
        auctionEndDate: new Date('15/09/30')
      }
      const spy = jest.spyOn(component, 'isAuctionEnded');
      component.isAuctionEnded(auction);
      expect(spy).toReturnWith(false);
    });
  });

  describe('check onStartProgress', () => {
    it('should call onStartProgress', () => {
      const jobProvider = TestBed.inject(JobProvider);
      const id = bid?.job?.id;
      const spy1 = jest.spyOn(component, 'onStartProgress');
      const spy2 = jest.spyOn(jobProvider, 'markAsInProgress');
      component.onStartProgress(bid);
      expect(spy1).toBeCalled();
      expect(spy2).toHaveBeenCalledWith({ id });
    });
  });

  describe('check ngOnInit', () => {
    it('should call loadMyBids', () => {
      component.ngOnInit();
      expect(component.paginator.page).toBeDefined();
      const bidsFacade = TestBed.inject(BidsFacade);
      jest.spyOn(bidsFacade, 'loadMyBids').mockImplementation();
      component.ngOnInit();
      component.isReviewBids = false;
    });
  });

  describe('check onNavigate', () => {
    it('should navigate to edit if bid can be updated', () => {
      const router = TestBed.inject(Router);
      jest.spyOn(router, 'navigate').mockImplementation();
      component.onNavigate({ ...bid, status: BidStatus.IN_REVIEW });
      expect(router.navigate).toHaveBeenCalledWith([
        `auctions/${bid.job.id}/edit-details/${bid.id}`,
      ]);
    });

    it('should navigate to view if bid cannot be updated', () => {
      const router = TestBed.inject(Router);
      jest.spyOn(router, 'navigate').mockImplementation();
      component.onNavigate({ ...bid, status: BidStatus.ACCEPTED });
      expect(router.navigate).toHaveBeenCalledWith([
        `auctions/${bid.job.id}/details`,
      ]);
    });
  });
});
