import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LocalizationService } from '@ocean/internationalization';
import { MockComponent, MockModule, MockPipe, MockProvider } from 'ng-mocks';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { PanelWrapperComponent } from '@ocean/layout/components/panel-wrapper/panel-wrapper.component';

import { MatFormFieldModule } from '@angular/material/form-field';
import { TranslatePipe } from '@ngx-translate/core';
import { NgxStripeModule } from 'ngx-stripe';
import { CreditCardComponent } from './credit-card.component';
import { of } from 'rxjs';

describe('CreditCardComponent', () => {
  let component: CreditCardComponent;
  let fixture: ComponentFixture<CreditCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MockModule(NgxStripeModule), MatFormFieldModule],
      declarations: [
        CreditCardComponent,
        MockComponent(PanelWrapperComponent),
        MockPipe(TranslatePipe, (v) => v),
      ],
      providers: [
        MockProvider(LocalizationService, {
          onLangChange: (_) => of('en'),
        } as any),
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreditCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
