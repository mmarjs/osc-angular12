import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute } from '@angular/router';
import { JobProvider } from '@ocean/api/services';
import { UserFacade } from '@ocean/api/state';
import { PaymentListComponent } from '@ocean/client/common/components/payment-list/payment-list.component';
import { AuctionsFacade, BoatsFacade, RouterFacade } from '@ocean/client/state';
import { LocalizationService } from '@ocean/internationalization';
import { LayoutModule, PanelWrapperComponent } from '@ocean/layout';
import { LinkDirective } from '@ocean/shared';
import { ButtonComponent } from '@ocean/shared/partials/button/button.component';
import { NotifierService } from '@ocean/shared/services';
import { mockAuctionsFacade } from '@ocean/testing/helpers/auctionsTestFacade';
import { mockBoatsFacade } from '@ocean/testing/helpers/boatTestFacade';
import { selectedAuctionTestData } from '@ocean/testing/helpers/Models/testData';
import { mockRouterFacade } from '@ocean/testing/helpers/routerTestFacade';
import {
  TestMatModule,
  TestModule,
  TestStoreEnvModule,
} from '@ocean/testing/helpers/test.module';
import { render, screen, waitFor } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';
import { MockComponent, MockProvider } from 'ng-mocks';
import { of } from 'rxjs';
import { CancelListingComponent } from './../../common/components/cancel-listing/cancel-listing.component';
import { PaymentComponent } from './payment.component';

const activatedRoute = {
  parent: {
    data: of({
      auction: selectedAuctionTestData,
    }),
  },
};

const mockJobProvider = {
  hasPaid: () => of(selectedAuctionTestData),
  pay: () => of(selectedAuctionTestData),
  startAuction: () => of(true),
};

const mockNotifierService = { success: jest.fn(), error: jest.fn() };

describe('PaymentComponent', () => {
  let component: PaymentComponent;
  let fixture: ComponentFixture<PaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestModule, TestStoreEnvModule, TestMatModule],
      declarations: [PaymentComponent],
      providers: [
        { provide: ActivatedRoute, useValue: activatedRoute },
        MockProvider(LocalizationService),
        { provide: JobProvider, useValue: mockJobProvider },
        { provide: RouterFacade, useValue: mockRouterFacade },
        { provide: AuctionsFacade, useValue: mockAuctionsFacade },
        { provide: BoatsFacade, useValue: mockBoatsFacade },
        { provide: NotifierService, useValue: mockNotifierService },
      ],
    })
      .overrideTemplate(PaymentComponent, '')
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('on getCard', () => {
    let card = {
      details: '',
      id: 123,
      stripeMethodId: '123456',
      type: '',
    };
    it('check cardDetails', () => {
      component.setCard(card);
      expect(component.cardDetails).toEqual(card);
    });
  });

  describe('on onEditAuction', () => {
    it('should call auctionsFacadde.setSelectedAuction and boatsFacade.setSelectedBoat', () => {
      const auction = {
        id: 42010,
        boat: {
          id: 12345,
        },
      };
      const spy = jest.spyOn(mockAuctionsFacade, 'setSelectedAuction');
      const spy2 = jest.spyOn(mockBoatsFacade, 'setSelectedBoat');
      component.onEditAuction(auction);
      expect(spy).toBeCalled();
      expect(spy2).toBeCalled();
    });
  });
});

describe('PaymentComponent integration', () => {
  it('should render', async () => {
    const cmp = await render(PaymentComponent, {
      imports: [
        TestModule,
        TestStoreEnvModule,
        TestMatModule,
        LayoutModule,
        MatIconModule,
        MatButtonModule,
      ],
      declarations: [
        PaymentComponent,
        CancelListingComponent,
        LinkDirective,
        PanelWrapperComponent,
        MockComponent(PaymentListComponent),
        ButtonComponent,
      ],
      providers: [
        { provide: ActivatedRoute, useValue: activatedRoute },
        MockProvider(LocalizationService, { translate: (key: string) => key }),
        { provide: JobProvider, useValue: mockJobProvider },
        {
          provide: RouterFacade,
          useValue: {
            queryParams$: of({ draft: 'draft' }),
            go: jest.fn(() => true),
          },
        },
        { provide: AuctionsFacade, useValue: mockAuctionsFacade },
        { provide: BoatsFacade, useValue: mockBoatsFacade },
        { provide: NotifierService, useValue: mockNotifierService },
      ],
    });

    cmp.fixture.componentInstance.setCard({
      id: 123,
      stripeMethodId: 'pm_1M4HYSJl1',
      type: 'card',
      details: '',
    });
    cmp.detectChanges();

    expect(screen.queryByTestId('title')).toHaveTextContent(
      'AUCTIONS.DEPOSIT - $10.00'
    );

    expect(
      screen.queryByRole('button', { name: 'COMMON.BUTTONS.SUBMIT' })
    ).not.toBeDisabled();

    await userEvent.click(
      screen.queryByRole('button', { name: 'COMMON.BUTTONS.SUBMIT' })
    );

    expect(mockNotifierService.success).toHaveBeenCalledWith(
      'COMMON.INFO.ALREADY_PAID'
    );
    await waitFor(() => {
      expect(screen.getByText('APPLICATION.SUCCESS!')).toBeInTheDocument();
    });
  });

  it('should hide Card selector and submit button when payment succeed', async () => {
    const cmp = await render(PaymentComponent, {
      imports: [
        TestModule,
        TestStoreEnvModule,
        TestMatModule,
        LayoutModule,
        MatIconModule,
        MatButtonModule,
      ],
      declarations: [
        PaymentComponent,
        CancelListingComponent,
        LinkDirective,
        PanelWrapperComponent,
        PaymentListComponent,
        ButtonComponent,
      ],
      providers: [
        { provide: ActivatedRoute, useValue: activatedRoute },
        MockProvider(LocalizationService, { translate: (key: string) => key }),
        { provide: JobProvider, useValue: mockJobProvider },
        {
          provide: RouterFacade,
          useValue: {
            queryParams$: of({ draft: 'draft' }),
            go: jest.fn(() => true),
          },
        },
        MockProvider(UserFacade, {
          loadSavedCards: jest.fn(),
          getSavedCards$: of([
            {
              id: 456,
              stripeMethodId: 'pm_1M4HYSJl1yaxJafBHo3zTrkC',
              type: 'card',
              details:
                '{"id": "pm_1M4HYSJl1yaxJafBHo3zTrkC", "card": {"brand": "visa", "last4": "1789", "checks": {"cvc_check": "pass"}, "country": "US", "funding": "credit", "exp_year": 2023, "networks": {"available": ["visa"]}, "exp_month": 4, "fingerprint": "XnRED9cBJejmUgz2", "three_d_secure_usage": {"supported": true}}, "type": "card", "object": "payment_method", "created": 1668489568, "customer": {"id": "cus_MbWRppavhpIE01"}, "livemode": false, "metadata": {"trace_id": "4a29d7ba13a1893b"}, "billing_details": {"address": {"country": "IN"}}}',
            },
          ]),
        }),
        { provide: AuctionsFacade, useValue: mockAuctionsFacade },
        { provide: BoatsFacade, useValue: mockBoatsFacade },
        { provide: NotifierService, useValue: mockNotifierService },
      ],
    });

    await userEvent.click(
      screen.getByTestId('card-radio')
    );

    await userEvent.click(
      screen.queryByRole('button', { name: 'COMMON.BUTTONS.SUBMIT' })
    );

    await waitFor(() => {
      expect(screen.getByText('APPLICATION.SUCCESS!')).toBeInTheDocument();
    });

    expect(screen.queryByTestId('payment-cmp')).not.toBeInTheDocument();
  });
});
