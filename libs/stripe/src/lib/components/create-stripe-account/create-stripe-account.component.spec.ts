import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateStripeAccountComponent } from './create-stripe-account.component';
import { StripeProvider, StripeProviderMethod } from '@ocean/api/services';
import { FormBuilderComponent, FormBuilderService } from '@ocean/libs/form-builder';
import { LocalizationService } from '@ocean/internationalization';
import { RouterTestingModule } from '@angular/router/testing';
import { MockPipe, MockProvider } from 'ng-mocks';
import { TranslatePipe } from '@ngx-translate/core';
import { JobDialogs } from '@ocean/api/data';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectCountryLangToken, MatSelectCountryModule } from '@angular-material-extensions/select-country';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatStepperModule } from '@angular/material/stepper';
import { TextFieldComponent } from '@ocean/shared/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { NotifierService } from '@ocean/shared/services';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MaterialModule } from '@ocean/material';
import { DatepickerComponent } from '@ocean/shared/forms/fields/datepicker/datepicker.component';
import { of } from 'rxjs';
import { NumberOnlyDirective, PATHS, TrimInputDirective } from '@ocean/shared';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BasicLayout } from '@ocean/layout';
import { Router } from '@angular/router';
import { dateWithoutTimezone } from '@ocean/shared/utils/dateWithoutTimezone';
import SpyInstance = jest.SpyInstance;

describe('CreateStripeAccountComponent', () => {
  let component: CreateStripeAccountComponent;
  let fixture: ComponentFixture<CreateStripeAccountComponent>;
  let router: SpyInstance;

  const createAccountFn = jest.fn(of);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        RouterTestingModule.withRoutes([
          {
            path: PATHS.DASHBOARD,
            component: BasicLayout
          }
        ]),
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
      ],
      declarations: [
        DatepickerComponent,
        TextFieldComponent,
        MockPipe(TranslatePipe, (v) => v),
        FormBuilderComponent,
        CreateStripeAccountComponent,
        NumberOnlyDirective,
        TrimInputDirective
      ],
      providers: [
        FormBuilderService,
        MockProvider(StripeProvider, {
          getStripeAccountErrors() {
            return undefined;
          },
          createAccount: createAccountFn
        }),
        MockProvider(NotifierService, {error: jest.fn()}),
        MockProvider(LocalizationService),
        MockProvider(JobDialogs),
        MockProvider(MatSelectCountryLangToken)
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateStripeAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    const injectedRouter = TestBed.inject(Router);
    injectedRouter.initialNavigation();
    router = jest.spyOn(injectedRouter, 'navigate').mockReturnValue(Promise.resolve(true));
  });

  it('should render', () => {
    expect(component).toBeTruthy();
  });

  it('should send proper data', () => {
    const date = 'Mon Feb 13 2023 05:56:47 GMT+0200 (Восточная Европа, стандартное время)';
    // @ts-ignore
    component.method = StripeProviderMethod.CREATE;

    component.form.setValue({
      firstName: 'first name',
      lastName: 'last name',
      email: 'email@gmail.com',
      businessUrl: 'https://www.youtube.com',
      ssnLast4: '4444',
      phone: {
        e164Number: '8805553535',
      },
      taxId: '12345678911',
      gender: 'male',
      dob: date,
      city: 'city',
      line1: 'address',
      line2: '',
      postalCode: '0000',
      state: 'state',
      province: 'province',
      region: 'region',
      country: {
        alpha2Code: 'US'
      }
    });

    component.onSubmit();

    expect(createAccountFn).toBeCalledWith({
      mcc: '5551',
      email: 'email@gmail.com',
      businessUrl: 'https://www.youtube.com',
      ssnLast4: '4444',
      individual: {
        firstName: 'first name',
        lastName: 'last name',
        phone: '8805553535',
        taxId: '12345678911',
        gender: 'male',
        dob: dateWithoutTimezone(date, false),
        address: {
          city: 'city',
          line1: 'address',
          line2: '',
          postalCode: '0000',
          state: 'state',
          country: 'US'
        }
      }
    });

    expect(router).toHaveBeenCalledWith([`/${PATHS.DASHBOARD}`]);
  });
});
