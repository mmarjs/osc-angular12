import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserFacade } from '@ocean/api/state';
import { LocalizationService } from '@ocean/internationalization';
import { TestMatModule, TestModule, TestStoreEnvModule } from '@ocean/testing/helpers/test.module';
import { MockProvider } from 'ng-mocks';
import { of } from 'rxjs';

import { EditPaymentFormComponent } from './edit-payment-form.component';

class UserTestFacade {
  paymentId$ = of('test');
  resetPaymentId = () => { };
  editPaymentMethod = () => true;
  editPaymentMethodError$=of(true)
}

class MockDialogRef {
  close = () => true
}

describe('EditPaymentFormComponent', () => {
  let component: EditPaymentFormComponent;
  let fixture: ComponentFixture<EditPaymentFormComponent>;
  let userFacade = new UserTestFacade();
  let dialogRef = new MockDialogRef()
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        TestModule,
        TestMatModule,
        TestStoreEnvModule
      ],
      declarations: [EditPaymentFormComponent],
      providers: [
        MockProvider(LocalizationService),
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: dialogRef },
        { provide: UserFacade, useValue: userFacade }
      ]
    }).overrideTemplate(EditPaymentFormComponent, '')
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPaymentFormComponent);
    component = fixture.componentInstance;
    component.editPaymentMethodForm = new FormGroup({
      expMonth: new FormControl(4),
      expYear: new FormControl(2024)
    })
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('check ngOninit', () => {
    it('dialog to be close', () => {
      const spy = jest.spyOn(dialogRef, 'close')
      component.ngOnInit();
      expect(spy).toBeCalled()
    })
    it('userfacade.resetPaymentId to be called', () => {
      const spy = jest.spyOn(userFacade, 'resetPaymentId')
      component.ngOnInit();
      expect(spy).toBeCalled()
    })
  })

  describe('check extractDataFromJson', () => {
    let card = { id: 123, brand: "visa", last4digit: "4242" }
    it('extractDataFromJson to have return card', () => {
      const spy = jest.spyOn(component, 'extractDataFromJson')
      component.extractDataFromJson(JSON.stringify(card))
      expect(spy).toHaveReturnedWith(card)
    });
  })

  describe('check onSubmit', () => {
    const cardId = 4242424242424242
    it('userFacade.editPaymentMethod to be called and showSubmit to be falsy', () => {
      const spy = jest.spyOn(userFacade, 'editPaymentMethod')
      component.onSubmit(cardId)
      expect(spy).toBeCalled();
      expect(component.showSubmit).toBeFalsy()
    })
  })

  describe('check yearValidation', () => {
    it('check if condition and return value', () => {
      let control = new FormControl('2021')
      const spy = jest.spyOn(component, 'yearValidation')
      component.yearValidation(control)
      expect(spy).toBeCalled();
    })
    it('check else condition and return value', () => {
      let control = new FormControl('2023');
      const spy = jest.spyOn(component, 'yearValidation')
      component.yearValidation(control)
      expect(spy).toReturnWith(null)
    })
  })

  describe('check monthValidation',()=>{
    it('check if condition and return value', () => {
      let month = new FormControl('13')
      const spy = jest.spyOn(component, 'monthValidation')
      component.monthValidation(month)
      expect(spy).toBeCalled();
    })
    it('check else condition and return value', () => {
      let month = new FormControl('11')
      const spy = jest.spyOn(component, 'monthValidation')
      component.monthValidation(month)
      expect(spy).toReturnWith(null)
    })
  })

  describe('check close', () => {
    it('dialog to be close', () => {
      const spy = jest.spyOn(dialogRef, 'close')
      component.close();
      expect(spy).toBeCalled()
    })
  })

})
