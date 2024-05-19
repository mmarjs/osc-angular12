import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateStripeCardComponent } from './create-stripe-card.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {
  MatSelectCountryLangToken,
  MatSelectCountryModule,
} from '@angular-material-extensions/select-country';
import {
  FormBuilderComponent,
  FormBuilderService,
  LibsFormBuilderModule,
} from '@ocean/libs/form-builder';
import { NumberOnlyDirective, TrimInputDirective } from '@ocean/shared';
import { MockPipe, MockProvider } from 'ng-mocks';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { LocalizationService } from '@ocean/internationalization';
import { JobDialogs } from '@ocean/api/data';
import { MatDialogRef } from '@angular/material/dialog';
import { translateServiceMock } from '@ocean/testing/mocks/translate-service-mock';
import { normalizeFormRawCardData } from '../../../helpers/normalize-form-raw-card-data';

const dialogRefMock = {
  close: normalizeFormRawCardData,
};

describe('CreateStripeCardComponent', () => {
  let component: CreateStripeCardComponent;
  let fixture: ComponentFixture<CreateStripeCardComponent>;

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
        CreateStripeCardComponent,
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
    fixture = TestBed.createComponent(CreateStripeCardComponent);
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
    const mockedDate = new Date('2023-1-1');

    jest.useFakeTimers();
    jest.setSystemTime(mockedDate);

    const spy = jest.spyOn(dialogRefMock, 'close');

    component.form.setValue({
      cardHolderName: 'Name',
      number: '0000 1111 2222 3333',
      expireDate: '01/23',
      cvc: '000',
      currency: 'USD',
    });

    component.create();

    expect(spy).toHaveBeenCalledWith(
      normalizeFormRawCardData(component.form.value)
    );
  });

  it('should close with void value', () => {
    const spy = jest.spyOn(dialogRefMock, 'close');
    component.close();

    expect(spy).toHaveBeenCalledWith();
  });
});
