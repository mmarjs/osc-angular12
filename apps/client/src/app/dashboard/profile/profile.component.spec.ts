import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
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
  FormGalleryItemComponent,
  FormGalleryUploadComponent,
} from '@ocean/client/common/forms';
import { IconsModule } from '@ocean/icons';
import { LocalizationService } from '@ocean/internationalization';
import { LayoutComponentsModule } from '@ocean/layout';
import { FormControlUpdateOnSubmitComponent } from '@ocean/shared/forms/form-control-update-on-submit/form-control-update-on-submit.component';
import { FormatTypePipe } from '@ocean/shared/pipes/format-type.pipe';
import { NotifierService } from '@ocean/shared/services';
import { render, screen } from '@testing-library/angular';
import { MockComponent, MockModule, MockPipe, MockProvider } from 'ng-mocks';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import { ProfileMenuComponent } from './menu';
import { ProfilePasswordComponent } from './password';
import { PaymentDetailsComponent } from './payment-details/payment-details.component';
import { PersonalInformationComponent } from './personal-information/personal-information.component';
import { ProfileComponent } from './profile.component';
import { StripeProvider } from '@ocean/api/services';
import { StripeIntegrationDetailsComponent } from './stripe-integration-details/stripe-integration-details.component';
import userEvent from '@testing-library/user-event';
import { TransformPipe } from '@ocean/shared/pipes/transform.pipe';
import { of } from 'rxjs';
import { TestBed } from '@angular/core/testing';
import { UserFacade } from '@ocean/api/state';
import { translateServiceMock } from '@ocean/testing/mocks/translate-service-mock';
import { ButtonComponent } from '@ocean/shared/partials/button/button.component';
import {
  LinkDirective,
  NumberOnlyDirective,
  TextFieldComponent,
  TrimInputDirective,
} from '@ocean/shared';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilderComponent } from '@ocean/libs/form-builder';
import { JobDialogs } from '@ocean/api/data';
import { TextMaskModule } from 'angular2-text-mask';

describe('ProfileComponent', () => {
  let actions$: any;

  const deps = {
    imports: [
      RouterTestingModule,
      FormsModule,
      ReactiveFormsModule,
      MockModule(FlexLayoutModule),
      MockModule(NgxIntlTelInputModule),
      IconsModule,
      MatFormFieldModule,
      MatInputModule,
      LayoutComponentsModule,
      MatMenuModule,
      MatDialogModule,
      MatButtonModule,
      TextMaskModule,
    ],
    declarations: [
      TrimInputDirective,
      NumberOnlyDirective,
      TextFieldComponent,
      FormBuilderComponent,
      LinkDirective,
      ButtonComponent,
      ProfileMenuComponent,
      ProfilePasswordComponent,
      AccountSwitchComponent,
      PersonalInformationComponent,
      FormControlUpdateOnSubmitComponent,
      PaymentDetailsComponent,
      MockPipe(TransformPipe, () => 'https://ocean.io'),
      MockPipe(TranslatePipe, (value: string) => value),
      MockPipe(FormatTypePipe, (value: string) => value),
      MockComponent(StripeIntegrationDetailsComponent),
      ProfileComponent,
      FormGalleryComponent,
      FormGalleryItemComponent,
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
                authId: 170,
              },
            },
          },
        },
      }),
      MockProvider(JobDialogs),
      provideMockActions(() => actions$),
      UserFacade,
      MockProvider(LocalizationService),
      MockProvider(MediaService, {
        deleteFile: jest.fn().mockReturnValue(of({})),
        getFilesByTags: jest
          .fn()
          .mockReturnValue(of([{ publicId: 'publicId' }])),
      } as any),
      MockProvider(NotifierService),
      MockProvider(AuthService),
      MockProvider(TranslateService),
      MockProvider(StripeProvider, {
        getStripeAccountErrors() {
          return undefined;
        },
        createAccount() {
          return undefined;
        },
      }),
      { provide: TranslateService, useValue: translateServiceMock },
    ],
  };

  it('should allow to delete avatar', async () => {
    await render(ProfileComponent, deps);

    const mediaMock = TestBed.inject(MediaService);

    userEvent.hover(screen.getByTestId('avatar'));

    jest.mocked(mediaMock.getFilesByTags).mockReset();

    const deleteButton = screen.getByRole('button', { name: /delete avatar/i });
    userEvent.click(deleteButton);

    expect(mediaMock.deleteFile).toHaveBeenCalledWith({ fileId: 'publicId' });
    expect(mediaMock.getFilesByTags).toHaveBeenCalledWith({
      tags: 'avatar-170',
    });
    expect(mediaMock.getFilesByTags).toHaveBeenCalledTimes(1);
  });
});
