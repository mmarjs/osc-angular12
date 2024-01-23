import { MatSelectCountryModule } from '@angular-material-extensions/select-country';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatStepperModule } from '@angular/material/stepper';
import { LocalizationService } from '@ocean/internationalization';
import { SharedModule } from '@ocean/shared';
import { TestModule } from '@ocean/testing/helpers/test.module';
import { MockModule, MockProvider } from 'ng-mocks';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';

import { ShipyardSurveyorSignupComponent } from './shipyard-surveyor-signup.component';

describe('ShipyardSignupComponent', () => {
  let component: ShipyardSurveyorSignupComponent;
  let fixture: ComponentFixture<ShipyardSurveyorSignupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestModule, MockModule(SharedModule), MockModule(MatSelectCountryModule), MockModule(NgxIntlTelInputModule), MockModule(MatStepperModule)],
      declarations: [ShipyardSurveyorSignupComponent],
      providers: [MockProvider(LocalizationService)],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShipyardSurveyorSignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
