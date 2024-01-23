import { EventEmitter } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { TranslatePipe } from '@ngx-translate/core';
import { hot } from 'jest-marbles';
import { UserFacade } from '@ocean/api/state';
import { LocalizationService } from '@ocean/internationalization';
import { render, screen, within } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';
import { MockProvider, MockPipe } from 'ng-mocks';
import { of } from 'rxjs';

import { PaymentListComponent } from './payment-list.component';

const cardsInfo = [
  {
    id: 456,
    stripeMethodId: 'pm_1M4HYSJl1yaxJafBHo3zTrkC',
    type: 'card',
    details:
      '{"id": "pm_1M4HYSJl1yaxJafBHo3zTrkC", "card": {"brand": "visa", "last4": "1789", "checks": {"cvc_check": "pass"}, "country": "US", "funding": "credit", "exp_year": 2023, "networks": {"available": ["visa"]}, "exp_month": 4, "fingerprint": "XnRED9cBJejmUgz2", "three_d_secure_usage": {"supported": true}}, "type": "card", "object": "payment_method", "created": 1668489568, "customer": {"id": "cus_MbWRppavhpIE01"}, "livemode": false, "metadata": {"trace_id": "4a29d7ba13a1893b"}, "billing_details": {"address": {"country": "IN"}}}',
  },
  {
    id: 416,
    stripeMethodId: 'pm_1M2ZVpJl1yaxJafBWiWTVQTa',
    type: 'card',
    details:
      '{"id": "pm_1M2ZVpJl1yaxJafBWiWTVQTa", "card": {"brand": "visa", "last4": "4242", "checks": {"cvc_check": "pass"}, "country": "US", "funding": "credit", "exp_year": 2045, "networks": {"available": ["visa"]}, "exp_month": 4, "fingerprint": "XnRED9cBJejmUgz2", "three_d_secure_usage": {"supported": true}}, "type": "card", "object": "payment_method", "created": 1668081942, "customer": {"id": "cus_MbWRppavhpIE01"}, "livemode": false, "metadata": {"trace_id": "f0d40684189a4331"}, "billing_details": {"address": {"country": "IN"}}}',
  },
  {
    id: 168,
    stripeMethodId: 'pm_1LuTmlJl1yaxJafBGaaezayX',
    type: 'card',
    details:
      '{"id": "pm_1LuTmlJl1yaxJafBGaaezayX", "card": {"brand": "visa", "last4": "1683", "checks": {"cvc_check": "pass"}, "country": "US", "funding": "credit", "exp_year": 2024, "networks": {"available": ["visa"]}, "exp_month": 4, "fingerprint": "XnRED9cBJejmUgz2", "three_d_secure_usage": {"supported": true}}, "type": "card", "object": "payment_method", "created": 1666153303, "customer": {"id": "cus_MbWRppavhpIE01"}, "livemode": false, "metadata": {}, "billing_details": {"address": {"country": "IN"}}}',
  },
];

let savedCards = [
  {
    details: '{ id: 123, brand: "visa", last4digit: "4242" }',
    id: 123,
    stripeMethodId: 'PY01234',
    type: 'test',
  },
];
class UserTestFacade {
  loadSavedCards = jest.fn((_) => true);
  getSavedCards$ = of(savedCards);
  constructor() {}
}

const DialogMock = {
  open() {
    return {
      afterClosed: () => of({}),
    };
  },
};

describe('PaymentListComponent', () => {
  let component: PaymentListComponent;
  let fixture: ComponentFixture<PaymentListComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PaymentListComponent],
      providers: [
        MockProvider(LocalizationService),
        MockProvider(UserFacade, new UserTestFacade() as any),
        MockProvider(MatDialog, DialogMock as any),
      ],
    })
      .overrideTemplate(PaymentListComponent, '')
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('check ngOnInit', () => {
    it('userFacade.loadSavedCards to be called', () => {
      const userFacade = TestBed.inject(UserFacade);
      const spy = jest.spyOn(userFacade, 'loadSavedCards');
      component.ngOnInit();
      expect(spy).toBeCalled();
    });

    it('check savedcards contains cards', () => {
      component.ngOnInit();
      expect(component.savedCards$).toBeObservable(hot('(a|)', { a: savedCards }));
    });
  });

  describe('check extractDataFromJson', () => {
    let card = { id: 123, brand: 'visa', last4digit: '4242' };
    it('extractDataFromJson to have return card', () => {
      const spy = jest.spyOn(component, 'extractDataFromJson');
      component.extractDataFromJson(JSON.stringify(card));
      expect(spy).toHaveReturnedWith(card);
    });
  });

  describe('check openDialog', () => {
    it('dialog.open to be called', () => {
      const DialogMock = TestBed.inject(MatDialog);
      const spy = jest.spyOn(DialogMock, 'open');
      component.openDialog();
      expect(spy).toBeCalled();
    });
  });
});

describe('PaymentListComponent integration', () => {
  it('should render', async () => {
    await render(PaymentListComponent, {
      imports: [MatDialogModule, MatIconModule],
      declarations: [MockPipe(TranslatePipe, (v) => v)],
      providers: [
        MockProvider(LocalizationService),
        MockProvider(UserFacade, {
          loadSavedCards: () => true,
          getSavedCards$: of(cardsInfo),
        }),
      ],
    });

    const cardInfo = screen.getAllByTestId('card-info');

    expect(cardInfo).toHaveLength(3);

    expect(within(cardInfo[0]).getByTestId('card-brand')).toHaveTextContent(
      'visa'
    );
    expect(within(cardInfo[0]).getByTestId('card-last4')).toHaveTextContent(
      '1789'
    );
    expect(within(cardInfo[0]).getByTestId('card-exp')).toHaveTextContent(
      'PAYMENT.EXPIRES 04/2023'
    );
  });

  it('should emit when card selected', async () => {
    const fn = new EventEmitter();
    jest.spyOn(fn, 'emit');

    await render(PaymentListComponent, {
      imports: [MatDialogModule, MatIconModule],
      declarations: [MockPipe(TranslatePipe, (v) => v)],
      providers: [
        MockProvider(LocalizationService),
        MockProvider(UserFacade, {
          loadSavedCards: () => true,
          getSavedCards$: of(cardsInfo),
        }),
      ],
      componentProperties: {
        cardDetails: fn,
      }
    });

    const cardRadio = screen.getAllByTestId('card-radio');
    await userEvent.click(cardRadio[0]);

    expect(fn.emit).toHaveBeenCalledWith(cardsInfo[0]);
  });

  it('should get proper expitation dates', async () => {
    await render(PaymentListComponent, {
      imports: [MatDialogModule, MatIconModule],
      declarations: [MockPipe(TranslatePipe, (v) => v)],
      providers: [
        MockProvider(UserFacade, {
          getSavedCards$: of(cardsInfo),
        }),
      ],
    });

    const expirationDates = screen.getAllByTestId('card-exp');
    expect(expirationDates).toHaveLength(3);
    expect(expirationDates[0]).toHaveTextContent('PAYMENT.EXPIRES 04/2023');
    expect(expirationDates[1]).toHaveTextContent('PAYMENT.EXPIRES 04/2045');
    expect(expirationDates[2]).toHaveTextContent('PAYMENT.EXPIRES 04/2024');
  });
});
