import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserFacade } from '@ocean/api/state';
import { LocalizationService } from '@ocean/internationalization';
import { NotifierService } from '@ocean/shared/services';
import {
  TestMatModule,
  TestModule,
  TestStoreEnvModule,
} from '@ocean/testing/helpers/test.module';
import { MockProvider } from 'ng-mocks';
import { PaymentModalComponent } from './payment-modal.component';
import { StripeService } from 'ngx-stripe';
import { of } from 'rxjs';

const UserTestFacade = {
  setUpIntent: jest.fn(),
  setUpIntentSuccess$: of({ clienSecret: 'test' }),
  loadSavedCards: jest.fn(),
};

const mockNotifierService = {
  success: jest.fn(),
  error: jest.fn(),
};

const dialogRef = {
  close() {
    return true;
  },
  afterClosed() {
    return of(true);
  },
};

describe('PaymentModalComponent', () => {
  let component: PaymentModalComponent;
  let fixture: ComponentFixture<PaymentModalComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestStoreEnvModule, TestModule, TestMatModule],
      declarations: [PaymentModalComponent],
      providers: [
        MockProvider(LocalizationService),
        // @ts-ignore
        MockProvider(StripeService, {
          elements() {
            return of({
              create() {
                return of({
                  mount() {
                    return of(undefined);
                  },
                });
              },
            });
          },
          confirmSetup() {
            return of({ error: { message: 'error' } });
          },
        }),
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: dialogRef },
        { provide: UserFacade, useValue: UserTestFacade },
        { provide: NotifierService, useValue: mockNotifierService },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('check ngOnInit', () => {
    it('userFacade.setUpIntent to be called', () => {
      const spy = jest.spyOn(UserTestFacade, 'setUpIntent');
      component.ngOnInit();
      expect(spy).toBeCalled();
    });
  });

  describe('check onSubmit', () => {
    it('confirmSetup to be called', () => {
      const spy = jest.spyOn(component['stripe'], 'confirmSetup');
      component.onSubmit();
      expect(spy).toBeCalled();
    });
  });

  describe('on close', () => {
    it('should call dialogRef.close', () => {
      const spy = jest.spyOn(dialogRef, 'close');
      component.close();
      expect(spy).toBeCalled();
    });
  });
});
