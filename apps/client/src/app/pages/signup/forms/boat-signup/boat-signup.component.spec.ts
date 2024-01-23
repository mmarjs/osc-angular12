import { MatSelectCountryModule } from '@angular-material-extensions/select-country';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatStepperModule } from '@angular/material/stepper';
import { LocalizationService } from '@ocean/internationalization';
import { SharedModule } from '@ocean/shared';
import { TestModule } from '@ocean/testing/helpers/test.module';
import { MockModule, MockProvider } from 'ng-mocks';

import { BoatSignupComponent } from './boat-signup.component';

describe('BoatSignupComponent', () => {
  let component: BoatSignupComponent;
  let fixture: ComponentFixture<BoatSignupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestModule, MockModule(SharedModule), MockModule(MatSelectCountryModule), MockModule(MatStepperModule)],
      declarations: [BoatSignupComponent],
      providers: [MockProvider(LocalizationService)],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BoatSignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
