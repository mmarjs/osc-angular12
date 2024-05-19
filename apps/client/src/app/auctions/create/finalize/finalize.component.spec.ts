import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {
  TranslatePipe,
  TranslateService,
  TranslateStore,
} from '@ngx-translate/core';
import { LocalizationService } from '@ocean/internationalization';
import {
  NumberOnlyDirective,
  TextFieldComponent,
  TrimInputDirective,
} from '@ocean/shared';
import { DatepickerComponent } from '@ocean/shared/forms/fields/datepicker/datepicker.component';
import { render, screen } from '@testing-library/angular';
import { TextMaskModule } from 'angular2-text-mask';
import { MockPipe, MockProvider } from 'ng-mocks';
import { FinalizeComponent } from './finalize.component';
import userEvent from '@testing-library/user-event';
import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { MatDatepickerInputHarness } from '@angular/material/datepicker/testing';

describe('FinalizeComponent', () => {
  beforeAll(() => {
    jest.spyOn(console, 'warn').mockImplementation(() => {});
  });
  afterAll(() => {
    jest.restoreAllMocks();
  });

  beforeEach(() => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date('2021-01-01T00:00:00.000Z'));
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should relative day field change calendar', async () => {
    await render(FinalizeComponent, {
      imports: [
        ReactiveFormsModule,
        FormsModule,
        MatDatepickerModule,
        MatInputModule,
        MatNativeDateModule,
        MatFormFieldModule,
        TextMaskModule,
      ],
      declarations: [
        TextFieldComponent,
        DatepickerComponent,
        NumberOnlyDirective,
        TrimInputDirective,
        MockPipe(TranslatePipe, (value) => value),
      ],
      providers: [
        MockProvider(LocalizationService),
        TranslateService,
        TranslateStore,
      ],
      componentProperties: {
        form: new FormGroup({
          auctionEndDate: new FormControl(),
        }),
      },
    });

    const endAuctionDays = await screen.findByLabelText(
      'FORMS.LABELS.DAYS_BEFORE_END_AUCTION'
    );
    userEvent.clear(endAuctionDays);
    userEvent.type(endAuctionDays, '12');

    const datePicker = screen.getByRole('textbox', {
      name: /FORMS.LABELS.AUCTION_END_DATE/,
    });

    expect(datePicker).toHaveValue('1/13/2021');
  });

  it('should data change reflect in relative day field', async () => {
    const cmp = await render(FinalizeComponent, {
      imports: [
        ReactiveFormsModule,
        FormsModule,
        MatDatepickerModule,
        MatInputModule,
        MatNativeDateModule,
        MatFormFieldModule,
        TextMaskModule,
      ],
      declarations: [
        TextFieldComponent,
        DatepickerComponent,
        NumberOnlyDirective,
        TrimInputDirective,
        MockPipe(TranslatePipe, (value) => value),
      ],
      providers: [
        MockProvider(LocalizationService),
        TranslateService,
        TranslateStore,
      ],
      componentProperties: {
        form: new FormGroup({
          auctionEndDate: new FormControl(),
        }),
      },
    });

    const endAuctionDays = await screen.findByLabelText(
      'FORMS.LABELS.DAYS_BEFORE_END_AUCTION'
    ) as HTMLInputElement;

    const loader: HarnessLoader = TestbedHarnessEnvironment.loader(cmp.fixture);
    const select = await loader.getHarness(MatDatepickerInputHarness);

    await select.setValue('1/7/2021');

    expect(endAuctionDays).toHaveValue('6');
  });
});
