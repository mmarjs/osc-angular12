import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';
import { AppComponentsModule } from '@ocean/client/common';
import { BidsFacade } from '@ocean/client/state';
import { LayoutComponentsModule } from '@ocean/layout';
import {
  FormBuilderComponent,
  FormBuilderService,
  LibsFormBuilderModule,
} from '@ocean/libs/form-builder';
import { render, screen } from '@testing-library/angular';
import { MockModule, MockPipe, MockProvider } from 'ng-mocks';
import { of } from 'rxjs';
import { PayCommissionComponent } from './pay-commission.component';
import { UserFacade } from '@ocean/api/state';
import { PaymentListComponent } from '@ocean/client/common/components/payment-list/payment-list.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { LocalizationService } from '@ocean/internationalization';
import { SharedDirectivesModule, TextFieldComponent } from '@ocean/shared';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { JobDialogs } from '@ocean/api/data';
import userEvent from '@testing-library/user-event';

describe('PayCommissionComponent', () => {
  it('should render bid minimum value', async () => {
    await render(PayCommissionComponent, {
      imports: [
        LayoutComponentsModule,
        ReactiveFormsModule,
        MockModule(AppComponentsModule),
        MockModule(LibsFormBuilderModule),
      ],
      declarations: [MockPipe(TranslatePipe, (v) => v)],
      providers: [
        MockProvider(BidsFacade, {
          bid$: of({ startDeposit: 1000 }),
        }),
      ],
    });

    expect(screen.queryByText('BIDS.MINIMUM:')).toBeInTheDocument();
    expect(screen.queryByText('$1,000.00')).toBeInTheDocument();
  });

  it('should render message after payment', async () => {
    await render(PayCommissionComponent, {
      imports: [
        LayoutComponentsModule,
        ReactiveFormsModule,
        MatDialogModule,
        MatIconModule,
        FormsModule,
        SharedDirectivesModule,
        MatInputModule,
        MatFormFieldModule,
        MatButtonModule,
      ],
      declarations: [
        MockPipe(TranslatePipe, (v) => v),
        PaymentListComponent,
        FormBuilderComponent,
        TextFieldComponent,
      ],
      providers: [
        FormBuilderService,
        MockProvider(LocalizationService),
        MockProvider(JobDialogs),
        MockProvider(UserFacade, {
          getSavedCards$: of([]),
        }),
        MockProvider(BidsFacade, {
          bid$: of({ startDeposit: 1000 }),
        }),
      ],
    });

    await userEvent.click(
      screen.queryByRole('button', { name: 'COMMON.BUTTONS.SUBMIT' })
    );

    expect(screen.queryByText('APPLICATION.SUCCESS!')).toBeInTheDocument();
    expect(
      screen.queryByText('BIDS.SUCCESSFULLY_DEPOSITED')
    ).toBeInTheDocument();
    expect(screen.queryByText('$1,000.00')).toBeInTheDocument();
  });
});
