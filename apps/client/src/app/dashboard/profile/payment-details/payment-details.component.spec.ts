import { TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { UserFacade } from '@ocean/api/state';
import { LayoutComponentsModule } from '@ocean/layout';
import { StripeAccountGuardComponent } from '@ocean/stripe';
import { render, screen } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';
import { MockComponent, MockPipe, MockProvider } from 'ng-mocks';
import { BehaviorSubject, of } from 'rxjs';
import { PaymentDetailsComponent } from './payment-details.component';

describe('PaymentDetailsComponent', () => {
  const getSavedCardsMock$ = new BehaviorSubject([]);
  const isLoadingMock$ = new BehaviorSubject(false);

  afterEach(() => {
    getSavedCardsMock$.next([]);
    isLoadingMock$.next(false);
  });

  it('should reload cards list after adding new card', async () => {
    await render(PaymentDetailsComponent, {
      imports: [LayoutComponentsModule, MatIconModule],
      declarations: [
        MockPipe(TranslatePipe, (value: string) => value),
        MockComponent(StripeAccountGuardComponent),
      ],
      providers: [
        MockProvider(UserFacade, {
          getSavedCards$: getSavedCardsMock$.asObservable(),
          isLoading$: isLoadingMock$.asObservable(),
          loadSavedCards: jest.fn(),
        }),
        MockProvider(MatDialog, {
          open: () => {
            return { afterClosed: () => of(true) };
          },
        } as any),
        MockProvider(TranslateService),
      ],
    });

    const userFacadeMock = TestBed.inject(UserFacade);

    userEvent.click(
      screen.getByRole('button', { name: 'PROFILE.ADD_PAYMENT_METHOD' })
    );

    expect(userFacadeMock.loadSavedCards).toHaveBeenCalled();
  });
});
