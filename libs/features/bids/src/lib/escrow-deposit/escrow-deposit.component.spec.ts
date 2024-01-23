import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { TranslatePipe } from '@ngx-translate/core';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { BidStatus, DurationUnit } from '@ocean/api/shared';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { AppComponentsModule } from '@ocean/common/components/components.module';
import { IconsModule } from '@ocean/icons';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { LayoutComponentsModule } from '@ocean/layout';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { PartialsModule } from '@ocean/shared/partials/partials.module';
import { render, screen, waitFor } from '@testing-library/angular';
import { MockModule, MockPipe } from 'ng-mocks';
import { EscrowDepositComponent } from './escrow-deposit.component';
import userEvent from '@testing-library/user-event';
import { ButtonComponent } from '@ocean/shared/partials/button/button.component';
import { MatButtonModule } from '@angular/material/button';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';

describe('EscrowDepositComponent', () => {
  it('should create', async () => {
    const cmp = await render(EscrowDepositComponent, {
      imports: [
        RouterTestingModule,
        ReactiveFormsModule,
        MatButtonModule,
        MockModule(AppComponentsModule),
        MockModule(IconsModule),
        MockModule(MatIconModule),
        MockModule(MatFormFieldModule),
        MockModule(LayoutComponentsModule),
      ],
      declarations: [ButtonComponent, MockPipe(TranslatePipe, (v) => v)],
      providers: [
        provideMockStore({
          initialState: {
            bids: {
              selectedBid: {
                bidAmount: 5000,
                bidItems: [
                  {
                    amount: 2000,
                    description: 'test',
                    id: 100,
                    quantity: 100,
                  },
                ],
                description: 'Test',
                id: 3,
                minBid: 500,
                status: BidStatus.IN_REVIEW,
                approximateDuration: 50,
                autoBid: false,
                bidderLocation: 'Test',
                bidderName: 'Test',
                durationUnit: DurationUnit.HOURS,
                jobId: 55,
                startDeposit: 1000,
                workStartDate: '10/09/22',
              },
            },
          },
        }),
      ],
      componentProperties: {
        selectedCard: {
          id: 1,
          details: '',
          stripeMethodId: 'test',
          type: 'test',
        },
      },
    });
    expect(screen.getByText('COMMON.BUTTONS.FULL_PAYMENT')).toBeInTheDocument();
    expect(
      screen.getByText('COMMON.BUTTONS.SUBMIT_DEPOSIT')
    ).toBeInTheDocument();

    await userEvent.click(screen.getByText('COMMON.BUTTONS.SUBMIT_DEPOSIT'));
  });
});
