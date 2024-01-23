import { async, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { LocalizationService } from '@ocean/internationalization';
import { TestModule } from '@ocean/testing/helpers/test.module';
import { MockComponent, MockProvider } from 'ng-mocks';
import { NgcCookieConsentConfig, NgcCookieConsentService } from 'ngx-cookieconsent';
import { AppComponent } from './app.component';
import { PasswordProtectionComponent } from './components/password-protection/password-protection.component';

const cookieConfig: NgcCookieConsentConfig = {
  cookie: {
    domain: 'localhost'
  },
};

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule,TestModule],
      declarations: [AppComponent, MockComponent(PasswordProtectionComponent)],
      providers: [{provide:NgcCookieConsentService,useValue:cookieConfig}, MockProvider(LocalizationService)]
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });
});
