import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { MockComponent, MockPipe, MockProvider } from 'ng-mocks';
import { PaymentDetailsComponent } from './payment-details.component';
import { PanelWrapperComponent } from '@ocean/layout';
import { MatIconModule } from '@angular/material/icon';
import { StripeProvider } from '@ocean/api/services';
import { NotifierService } from '@ocean/shared/services';
import { LocalizationService } from '@ocean/internationalization';

describe('PaymentDetailsComponent', () => {
  let component: PaymentDetailsComponent;
  let fixture: ComponentFixture<PaymentDetailsComponent>;
  let actions$: any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatDialogModule, ReactiveFormsModule, FormsModule, MatIconModule],
      declarations: [
        PaymentDetailsComponent,
        MockPipe(TranslatePipe, (value: string) => value),
        MockComponent(PanelWrapperComponent)
      ],
      providers: [
        provideMockStore(),
        provideMockActions(() => actions$),
        MockProvider(StripeProvider, {
          getStripeAccountErrors() {
            return undefined;
          },
          createAccount() {
            return undefined;
          }
        }),
        MockProvider(NotifierService, {error: jest.fn()}),
        MockProvider(LocalizationService),
        MockProvider(TranslateService)
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
