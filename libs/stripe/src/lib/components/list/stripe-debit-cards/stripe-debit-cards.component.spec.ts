import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StripeDebitCardsComponent } from './stripe-debit-cards.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MockPipe } from 'ng-mocks';
import { TranslatePipe } from '@ngx-translate/core';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { ProceedActionFor, StripeFacadeService } from '../../../store/facade';
import { of } from 'rxjs';
import { exitDetailsWithStatus } from '../../../helpers/exit-details-with-status';
import { STRIPE_DETAILS_EXIT_TYPE } from '../../../shared/types';
import { STRIPE_FEATURE_KEY } from '../../../store/state';

describe('StripeDebitCardsComponent', () => {
  let component: StripeDebitCardsComponent;
  let fixture: ComponentFixture<StripeDebitCardsComponent>;
  let stripeFacadeService: StripeFacadeService;
  let store: MockStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatDialogModule, MatIconModule, MatCardModule, MatButtonModule],
      declarations: [
        StripeDebitCardsComponent,
        MockPipe(TranslatePipe, (v) => v),
      ],
      providers: [provideMockStore(), StripeFacadeService],
    }).compileComponents();

    fixture = TestBed.createComponent(StripeDebitCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    stripeFacadeService = TestBed.inject(StripeFacadeService);
    store = TestBed.inject(MockStore);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load cards on init', () => {
    const spy = jest.spyOn(stripeFacadeService, 'loadCards');
    component.ngOnInit();
    expect(spy).toHaveBeenCalled();
  });

  it('should format properly (1/23)', () => {
    const spy = jest.spyOn(component, 'formatExpireDate');
    component.formatExpireDate({ expMonth: 1, expYear: 2023 } as any);

    expect(spy).toHaveReturnedWith('01/23');
  });

  it('should format properly (12/23)', () => {
    const spy = jest.spyOn(component, 'formatExpireDate');
    component.formatExpireDate({ expMonth: 12, expYear: 2023 } as any);

    expect(spy).toHaveReturnedWith('12/23');
  });

  it.each([{ accountHolderName: 'test' }, undefined])(
    'should send card data properly (%s)',
    (type) => {
      jest.spyOn(component.dialog, 'open').mockImplementation(() => ({
        afterClosed: () => of(type),
      }));

      const spy = jest
        .spyOn(stripeFacadeService, 'createDebitCard')
        .mockImplementationOnce(() => null);

      component.handleCreateCard();

      typeof type === 'object'
        ? expect(spy).toHaveBeenCalledWith(type)
        : expect(spy).not.toHaveBeenCalled();
    }
  );

  it.each([
    undefined,
    exitDetailsWithStatus(STRIPE_DETAILS_EXIT_TYPE.MARK, 'test'),
    exitDetailsWithStatus(STRIPE_DETAILS_EXIT_TYPE.DELETE, 'test'),
  ])('should proceed cards data properly (%s)', async (type) => {
    jest.spyOn(component.dialog, 'open').mockImplementation(() => ({
      afterClosed: () => of(type),
    }));

    store.setState({
      [STRIPE_FEATURE_KEY]: {
        cards: [
          {
            id: 'test',
          },
        ],
      },
    });

    store.refreshState();
    fixture.detectChanges();

    const spy = jest
      .spyOn(stripeFacadeService, 'proceedAction')
      .mockImplementationOnce(() => null);

    await component.handleCardDetails('test');

    typeof type === 'object'
      ? expect(spy).toHaveBeenCalledWith(ProceedActionFor.CARDS, type)
      : expect(spy).not.toHaveBeenCalled();
  });
});
