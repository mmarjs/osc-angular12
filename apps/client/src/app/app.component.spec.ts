import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { LocalizationService } from '@ocean/internationalization';
import { TestModule } from '@ocean/testing/helpers/test.module';
import { MockComponent, MockProvider } from 'ng-mocks';
import { NgcCookieConsentConfig, NgcCookieConsentService } from 'ngx-cookieconsent';
import { AppComponent } from './app.component';
import { PasswordProtectionComponent } from './components/password-protection/password-protection.component';
import { ProgressIndicatorFacade } from '@ocean/client/state/progress-indicator';
import { of } from 'rxjs';
import { render, screen, waitFor } from '@testing-library/angular';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

const cookieConfig: NgcCookieConsentConfig = {
  cookie: {
    domain: 'localhost'
  },
};

const progressIndicatorMock = {
  getStatus$: of(true),
};

describe('AppComponent', () => {
  beforeEach(() =>
    render(AppComponent, {
      imports: [RouterTestingModule, TestModule, MatProgressSpinnerModule],
      declarations: [AppComponent, MockComponent(PasswordProtectionComponent)],
      providers: [
        MockProvider(LocalizationService),
        {provide: NgcCookieConsentService, useValue: cookieConfig},
        {provide: ProgressIndicatorFacade, useValue: progressIndicatorMock}
      ]
    })
  );

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should show processing notification', async () => {
    await waitFor(() => expect(screen.getByRole('note')).toBeInTheDocument());
  });
});
