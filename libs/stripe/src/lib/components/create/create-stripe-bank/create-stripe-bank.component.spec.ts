import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateStripeBankComponent } from './create-stripe-bank.component';
import { MatDialogRef } from '@angular/material/dialog';
import { normalizeFormRawBankData } from '../../../helpers/normalize-form-raw-bank-data';
import {
  FormBuilderComponent,
  FormBuilderService,
  LibsFormBuilderModule,
} from '@ocean/libs/form-builder';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MockPipe, MockProvider } from 'ng-mocks';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { CountryISO } from 'ngx-intl-tel-input';
import { JobDialogs } from '@ocean/api/data';
import { NumberOnlyDirective, TrimInputDirective } from '@ocean/shared';
import { MatInputModule } from '@angular/material/input';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
  MatSelectCountryLangToken,
  MatSelectCountryModule,
} from '@angular-material-extensions/select-country';
import { LocalizationService } from '@ocean/internationalization';
import { translateServiceMock } from '@ocean/testing/mocks/translate-service-mock';

const dialogRefMock = {
  close: normalizeFormRawBankData,
};

describe('CreateStripeBankComponent', () => {
  let component: CreateStripeBankComponent;
  let fixture: ComponentFixture<CreateStripeBankComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        ReactiveFormsModule,
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectCountryModule,
        LibsFormBuilderModule,
      ],
      declarations: [
        TrimInputDirective,
        NumberOnlyDirective,
        FormBuilderComponent,
        CreateStripeBankComponent,
        MockPipe(TranslatePipe, (v) => v),
      ],
      providers: [
        MockProvider(MatSelectCountryLangToken),
        MockProvider(LocalizationService),
        MockProvider(JobDialogs),
        FormBuilderService,
        { provide: MatDialogRef, useValue: dialogRefMock },
        { provide: TranslateService, useValue: translateServiceMock },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateStripeBankComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should returns with nothing', () => {
    const spy = jest.spyOn(dialogRefMock, 'close');
    component.create();

    expect(component.form.touched).toEqual(true);
    expect(spy).not.toHaveBeenCalled();
  });

  it('should return normalized result', () => {
    const spy = jest.spyOn(dialogRefMock, 'close');

    component.form.setValue({
      bankName: 'test',
      accountHolderName: 'test',
      accountNumber: '11111',
      country: CountryISO.UnitedStates,
      currency: 'USD',
      routingNumber: '054554445',
    });

    component.create();

    expect(spy).toHaveBeenCalledWith(
      normalizeFormRawBankData(component.form.value)
    );
  });

  it('should close with void value', () => {
    const spy = jest.spyOn(dialogRefMock, 'close');
    component.close();

    expect(spy).toHaveBeenCalledWith();
  });
});
