import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { AuthService, MediaService } from '@ocean/api/client';
import { AccountSwitchComponent } from '@ocean/client/common/components/account-switch/account-switch.component';
import {
  FormGalleryComponent,
  FormGalleryUploadComponent
} from '@ocean/client/common/forms';
import { IconsModule } from '@ocean/icons';
import { LocalizationService } from '@ocean/internationalization';
import { LayoutComponentsModule } from '@ocean/layout';
import { FormControlUpdateOnSubmitComponent } from '@ocean/shared/forms/form-control-update-on-submit/form-control-update-on-submit.component';
import { FormatTypePipe } from '@ocean/shared/pipes/format-type.pipe';
import { NotifierService } from '@ocean/shared/services';
import { render, screen } from '@testing-library/angular';
import { MockModule, MockPipe, MockProvider } from 'ng-mocks';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import { ProfileMenuComponent } from './menu';
import { ProfilePasswordComponent } from './password';
import { PaymentDetailsComponent } from './payment-details/payment-details.component';
import { PersonalInformationComponent } from './personal-information/personal-information.component';
import { ProfileComponent } from './profile.component';
import { StripeProvider } from '@ocean/api/services';

describe('ProfileComponent', () => {
  let actions$: any;

  const deps = {
    imports: [
      RouterTestingModule,
      FormsModule,
      ReactiveFormsModule,
      MockModule(FlexLayoutModule),
      MockModule(NgxIntlTelInputModule),
      MockModule(IconsModule),
      MatIconModule,
      MatFormFieldModule,
      MatInputModule,
      LayoutComponentsModule,
      MatMenuModule,
      MatDialogModule,
    ],
    declarations: [
      ProfileMenuComponent,
      ProfilePasswordComponent,
      AccountSwitchComponent,
      PersonalInformationComponent,
      FormControlUpdateOnSubmitComponent,
      PaymentDetailsComponent,
      MockPipe(TranslatePipe, (value: string) => value),
      MockPipe(FormatTypePipe, (value: string) => value),
      ProfileComponent,
      FormGalleryComponent,
      FormGalleryUploadComponent,
    ],
    providers: [
      provideMockStore({
        initialState: {
          api: {
            user: {
              loggedIn: true,
              token: 'token',
              user: {
                firstName: 'John',
                lastName: 'Doe',
                address: '7900 W 110th St',
                email: 'john-doe@mail.com',
                id: 170,
              },
            },
          },
        },
      }),
      provideMockActions(() => actions$),
      MockProvider(LocalizationService),
      MockProvider(MediaService),
      MockProvider(NotifierService),
      MockProvider(AuthService),
      MockProvider(TranslateService),
      MockProvider(StripeProvider, {
        getStripeAccountErrors() {
          return undefined;
        },
        createAccount() {
          return undefined;
        }
      }),
    ],
  };

  it('should render', async () => {
    await render(ProfileComponent, deps);

    expect(screen.queryByLabelText(/FORMS.LABELS.FIRST_NAME/i)).toHaveValue(
      'John'
    );
    expect(screen.queryByLabelText(/FORMS.LABELS.LAST_NAME/i)).toHaveValue(
      'Doe'
    );
    expect(screen.queryByLabelText(/FORMS.LABELS.EMAIL_ADDRESS/i)).toHaveValue(
      'john-doe@mail.com'
    );
  });
});
