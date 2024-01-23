import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LocalizationService } from '@ocean/internationalization';
import { SharedModule } from '@ocean/shared';
import { CustomValidator } from '@ocean/shared/utils/nospace-validator';
import { TestMatModule, TestModule } from '@ocean/testing/helpers/test.module';
import { MockModule, MockProvider } from 'ng-mocks';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';

import { BoatUserComponent } from './boat-user.component';

describe('BoatSignupComponent', () => {
  let component: BoatUserComponent;
  let fixture: ComponentFixture<BoatUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[
        TestModule,
        MockModule(SharedModule),
        TestMatModule,
        BrowserAnimationsModule,
        MockModule(NgxIntlTelInputModule)
      ],
      declarations: [ BoatUserComponent ],
      providers: [MockProvider(LocalizationService)]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BoatUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
