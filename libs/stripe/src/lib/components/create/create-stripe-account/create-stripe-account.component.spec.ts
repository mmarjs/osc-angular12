import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateStripeAccountComponent } from './create-stripe-account.component';
import {
  FormBuilderComponent,
  FormBuilderService,
} from '@ocean/libs/form-builder';
import { LocalizationService } from '@ocean/internationalization';
import { MockPipe, MockProvider } from 'ng-mocks';
import { TranslatePipe } from '@ngx-translate/core';
import { JobDialogs } from '@ocean/api/data';
import { MatNativeDateModule } from '@angular/material/core';
import {
  MatSelectCountryLangToken,
  MatSelectCountryModule,
} from '@angular-material-extensions/select-country';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatStepperModule } from '@angular/material/stepper';
import { TextFieldComponent } from '@ocean/shared/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { CountryISO, NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MaterialModule } from '@ocean/material';
import { DatepickerComponent } from '@ocean/shared/forms/fields/datepicker/datepicker.component';
import { NumberOnlyDirective, TrimInputDirective } from '@ocean/shared';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StripeFacadeService } from '../../../store/facade';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { createStripeAccount, StripeForm } from '@ocean/api/shared';
import { stringToCountryField } from '@ocean/shared/utils/string-to-country-field';
import { StripeProviderMethod } from '@ocean/api/services';
import { TextMaskModule } from 'angular2-text-mask';
import { firstValueFrom } from 'rxjs';
import { STRIPE_FEATURE_KEY } from '../../../store/state';
import { normalizeStipeAccountToForm } from '../../../helpers/normalize-stipe-account-to-form';
import { StripeAccountPreviewComponent } from '../../details/stripe-account-preview/stripe-account-preview.component';
import { UserFacade } from '@ocean/api/state';
import { MediaService } from '@ocean/api/client';
import { MatIconModule } from '@angular/material/icon';
import { CheckboxComponent } from '@ocean/shared/forms/fields/checkbox/checkbox.component';
import { CountryComponent } from '@ocean/shared/forms/autocompleters/country/country.component';

const testStripeForm: StripeForm = {
  firstName: 'first name',
  lastName: 'last name',
  email: 'email@gmail.com',
  businessUrl: 'https://www.youtube.com',
  ssnLast4: '4444',
  phone: {
    number: '234567894',
    countryCode: CountryISO.Afghanistan,
  },
  taxIdOrSSN: true,
  taxId: '12345674444',
  gender: 'male',
  dob: new Date('2005-1-1').toISOString(),
  city: 'city',
  line1: 'address',
  line2: 'test',
  postalCode: '0000',
  state: 'state',
  province: 'province',
  region: 'region',
  country: stringToCountryField(CountryISO.Afghanistan),
};

describe('CreateStripeAccountComponent', () => {
  let component: CreateStripeAccountComponent;
  let fixture: ComponentFixture<CreateStripeAccountComponent>;
  let stripeFacadeService: StripeFacadeService;
  let store: MockStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatDatepickerModule,
        MaterialModule,
        MatNativeDateModule,
        NgxIntlTelInputModule,
        MatSelectCountryModule,
        MatStepperModule,
        TextMaskModule,
        MatIconModule,
      ],
      declarations: [
        CountryComponent,
        CheckboxComponent,
        DatepickerComponent,
        StripeAccountPreviewComponent,
        TextFieldComponent,
        MockPipe(TranslatePipe, (v) => v),
        FormBuilderComponent,
        CreateStripeAccountComponent,
        NumberOnlyDirective,
        TrimInputDirective,
      ],
      providers: [
        FormBuilderService,
        StripeFacadeService,
        provideMockStore(),
        MockProvider(UserFacade, {
          avatar: () => '',
        }),
        MockProvider(MediaService),
        MockProvider(LocalizationService),
        MockProvider(JobDialogs),
        MockProvider(MatSelectCountryLangToken),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateStripeAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    stripeFacadeService = TestBed.inject(StripeFacadeService);
    store = TestBed.inject(MockStore);
  });

  it('should render', () => {
    expect(component).toBeTruthy();
  });

  it('should load account', () => {
    const spy = jest
      .spyOn(stripeFacadeService, 'loadAccount')
      .mockImplementationOnce(() => null);

    component.method = StripeProviderMethod.READ;
    component.ngOnInit();

    expect(spy).toHaveBeenCalled();
  });

  it('should mark form as touched, and return nothing', () => {
    component.onSubmit();

    const spy = jest
      .spyOn(stripeFacadeService, 'createAccount')
      .mockImplementationOnce(() => null);

    expect(component.form.touched).toEqual(true);
    expect(spy).not.toHaveBeenCalled();
  });

  it.each([true, false])(
    'should set proper loading status (%s)',
    async (flag) => {
      store.setState({
        [STRIPE_FEATURE_KEY]: {
          loading: flag,
        },
      });

      store.refreshState();
      fixture.detectChanges();

      const loading = await firstValueFrom(component.loading$);
      expect(loading).toEqual(flag);
    }
  );

  it.each([null, 'undefined method'])(
    `should return undefined (value: %s)`,
    (method) => {
      component.form.setValue(testStripeForm);

      component.method = method;

      component.onSubmit();

      const spy = jest
        .spyOn(stripeFacadeService, 'createAccount')
        .mockImplementationOnce(() => null);

      expect(component.form.touched).toEqual(true);
      expect(spy).not.toHaveBeenCalled();
    }
  );

  it.each([StripeProviderMethod.CREATE, StripeProviderMethod.READ])(
    `should call with proper method (value: %s)`,
    (method) => {
      const spy = jest
        .spyOn(stripeFacadeService, 'createAccount')
        .mockImplementationOnce(() => null);

      component.form.setValue(testStripeForm);

      component.method = method;

      component.onSubmit();

      expect(spy).toHaveBeenCalledWith(
        createStripeAccount(component.form),
        method === StripeProviderMethod.READ
          ? StripeProviderMethod.EDIT
          : StripeProviderMethod.CREATE
      );
    }
  );

  it('should update form on account change', async () => {
    const spy = jest
      .spyOn(component.form, 'patchValue')
      .mockImplementationOnce(() => null);

    store.setState({
      [STRIPE_FEATURE_KEY]: {
        account: {
          individual: {
            address: {
              country: CountryISO.Afghanistan,
            },
          },
        },
      },
    });

    store.refreshState();

    component.ngOnInit();

    const account = await firstValueFrom(component.account$);
    fixture.detectChanges();

    expect(spy).toHaveBeenCalledWith(normalizeStipeAccountToForm(account));
  });
});
