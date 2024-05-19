import { MatSelectCountryModule } from '@angular-material-extensions/select-country';
import { MatStepperModule } from '@angular/material/stepper';
import { LocalizationService } from '@ocean/internationalization';
import { SharedModule } from '@ocean/shared';
import { TestModule } from '@ocean/testing/helpers/test.module';
import { render, screen, within } from '@testing-library/angular';
import { MockProvider } from 'ng-mocks';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import { ShipyardSurveyorSignupComponent } from './shipyard-surveyor-signup.component';
import userEvent from '@testing-library/user-event';

describe('ShipyardSignupComponent', () => {
  beforeEach(() => {
    jest.spyOn(console, 'warn').mockImplementation(() => {});
  });

  it('should create', async () => {
    const cmp = await render(ShipyardSurveyorSignupComponent, {
      imports: [
        TestModule,
        SharedModule,
        MatSelectCountryModule.forRoot('en'),
        NgxIntlTelInputModule,
        MatStepperModule,
      ],
      providers: [MockProvider(LocalizationService)],
      componentProperties: { isParentValid: false },
    });

    jest.spyOn(cmp.fixture.componentInstance.formValue, 'emit');

    cmp.fixture.componentInstance.step1.patchValue({
      name: 'test',
      country: 'Ukraine',
      businessEmail: 'test@example.com',
      website: 'https://example.com',
    });
    cmp.fixture.componentInstance.step2.patchValue({
      address: 'Test street',
      address2: 'Appartment 1',
      city: 'Miami',
      state: 'Florida',
      zipCode: '12345',
    });

    userEvent.type(
      within(screen.getByTestId('phone')).getByRole('textbox'),
      '+380501234567'
    );

    userEvent.click(
      screen.getByRole('button', { name: 'COMMON.BUTTONS.CREATE_ACCOUNT' })
    );

    expect(cmp.fixture.componentInstance.formValue.emit).toHaveBeenCalledWith({
      name: 'test',
      country: 'Ukraine',
      businessEmail: 'test@example.com',
      website: 'https://example.com',
        phone: '+380 50 123 4567',
      address: 'Test street',
      address2: 'Appartment 1',
      city: 'Miami',
      state: 'Florida',
      zipCode: '12345',
    });
  });
});
