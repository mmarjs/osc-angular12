// @ts-nocheck
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControlUpdateOnSubmitComponent } from './form-control-update-on-submit.component';
import { LocalizationService } from '@ocean/internationalization';
import { MockPipe, MockProvider } from 'ng-mocks';
import { FormControl, FormsModule, ReactiveFormsModule, Validators, FormGroup} from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';
import { Country } from 'ngx-intl-tel-input/lib/model/country.model';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { RouterTestingModule } from '@angular/router/testing';
import {
  TestModule,
  TestStoreEnvModule,
} from '@ocean/testing/helpers/test.module';
import { MatInputModule } from '@angular/material/input';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('FormControlUpdateOnSubmitComponent', () => {
  let component: FormControlUpdateOnSubmitComponent;
  let fixture: ComponentFixture<FormControlUpdateOnSubmitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
          RouterTestingModule,
          NoopAnimationsModule,
          ReactiveFormsModule,
          FormsModule,
          MatIconModule,
          MatFormFieldModule,
          MatInputModule
      ],
      declarations: [FormControlUpdateOnSubmitComponent, MockPipe(TranslatePipe, (v) => v)],
      providers: [
        MockProvider(LocalizationService),
      ]
    })
    .overrideTemplate(FormControlUpdateOnSubmitComponent, '')
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormControlUpdateOnSubmitComponent);
    component = fixture.componentInstance;
    component.control = new FormControl('');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('check ngOnInit', () =>{
    it('should call ngOnInit', () => {
      component.ngOnInit();
      component.form = new FormGroup({
        [component.controlName]: component.control
      });
    });
  });
  
  describe('on toggleControlDisabledState', () =>{
    it('should call enable', () => {
      component.control.disable();
      const spy = jest.spyOn(component.control, 'enable');
      component.toggleControlDisabledState();
      expect(spy).toBeCalled();
    });
    it('should call disable', () => {
      component.control.enable();
      const spy = jest.spyOn(component.control, 'disable');
      component.toggleControlDisabledState();
      expect(spy).toBeCalled();
    });
    it('should update the control validity after enabling/disabling it', () => {
      const spy = jest.spyOn(component.control, 'updateValueAndValidity');
      component.toggleControlDisabledState();
      expect(spy).toBeCalled();
    });
  });

  describe('check onValueChange', () =>{
    it('should call onValueChange', () => {
      const spy = jest.spyOn(component, 'ctrlHasError');
      component.onValueChange();
      expect(spy).toBeCalled();
    });
  });
  
  describe('on ctrlHasError', () =>{
    it('check required validator', () => {
      component.control.value = '';
      component.control.setValidators(Validators.required);
      const spy = jest.spyOn(component, 'ctrlHasError');
      component.ctrlHasError();
      expect(spy).toBeTruthy();
    });

    it('check phone number validation if isPhone is true', () => {
      component.isPhone = true;
      component.control.setErrors({'incorrect': true});
      const spy = jest.spyOn(component, 'ctrlHasError');
      component.ctrlHasError();
      expect(spy).toBeTruthy();
    })

    it('check phone number required if isPhone is false', () => {
      component.isPhone = false;
      component.control.setErrors({'incorrect': true});
      const spy = jest.spyOn(component, 'ctrlHasError');
      component.ctrlHasError();
      expect(spy).toBeTruthy();
    });

    it('check label min size', () => {
      component.control.setErrors({'incorrect': true});
      component.control.value = 'test';
      component.minLength = '5';
      const spy = jest.spyOn(component, 'ctrlHasError');
      component.ctrlHasError();
      expect(spy).toBeTruthy();
    });

    it('check label max size', () => {
      component.control.value = 'testtesttest';
      component.maxLength = '8';
      const spy = jest.spyOn(component, 'ctrlHasError');
      component.ctrlHasError();
      expect(spy).toBeTruthy();
    });
    
    it('check email validation', () => {
      component.control.value = 'test';
      const spy = jest.spyOn(component, 'ctrlHasError');
      component.control.setValidators(Validators.email);
      component.ctrlHasError();
      expect(spy).toBeTruthy();
    });
  
    it('check no error', () => {
      component.control.value = 'validvalue';
      const spy = jest.spyOn(component, 'ctrlHasError')
      component.ctrlHasError();
      expect(spy).toBeTruthy();
      expect(component.errorMsg).toEqual('');
    });
  });

 describe('on onCountrySelect', () =>{
    it('should set countryCode', () => {
      const mockCountry: Country = {
        name: 'United States',
        iso2: 'US',
        dialCode: '123',
        priority: 123,
        htmlId: '321',
        flagClass: 'string',
        placeHolder: 'string',
      };
      component.onCountrySelect(mockCountry);
      const spy = jest.spyOn(component, 'ctrlHasError')
      component.ctrlHasError();
      expect(spy).toBeCalled();
      expect(component.countryCode).toEqual(mockCountry.iso2.toLowerCase());
    });
  
    it('should set countryCode as US', () => {
      const mockCountry: Country = {
        name: 'Unknown',
        iso2: undefined,
        dialCode: '123',
        priority: 123,
        htmlId: '321',
        flagClass: 'string',
        placeHolder: 'string',
      };
      component.onCountrySelect(mockCountry);
      expect(component.countryCode).toEqual("us");
    });
  });
  
  describe('on submit', () =>{
    it('should enable the control if it has errors', async () => {
      component.ctrlHasError = jest.fn(() => true)
      const spy = jest.spyOn(component.control, 'enable');
      component.submit();
      expect(spy).toBeCalled();
    });

    it('should emit control value if it is disabled', () => {
      component.control.disable();
      jest.spyOn(component.controlSubmitted, 'emit');
      component.submit();
      expect(component.isLoading).toBeTruthy();
      expect(component.controlSubmitted.emit).toHaveBeenCalledWith(component.control.value);
    });
  });
});
