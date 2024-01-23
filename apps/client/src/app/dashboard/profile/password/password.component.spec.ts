// tslint:disable: nx-enforce-module-boundaries
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslatePipe } from '@ngx-translate/core';
import { API_ENVIRONMENT } from '@ocean/api/shared';
import { PanelWrapperComponent } from '@ocean/layout';
import { PasswordConfirmFieldComponent } from '@ocean/shared';
import { mockEnvironment } from '@ocean/testing';
import { MockComponent, MockPipe, MockProvider } from 'ng-mocks';
import { DashboardImports } from '../../dashboard.imports';
import { ProfilePasswordComponent } from './password.component';
import { AuthService } from '../../../../../../../libs/api/src/lib/client/auth.service';
import { LocalizationService } from '../../../../../../../libs/internationalization/src/lib/localization.service';

describe('ProfilePasswordComponent', () => {
  let component: ProfilePasswordComponent;
  let fixture: ComponentFixture<ProfilePasswordComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [...DashboardImports],
      declarations: [
        MockComponent(PanelWrapperComponent),
        MockComponent(PasswordConfirmFieldComponent),
        MockPipe(TranslatePipe, (value: string) => value),
        ProfilePasswordComponent,
      ],
      providers: [
        { provide: API_ENVIRONMENT, useValue: mockEnvironment },
        MockProvider(AuthService),
        MockProvider(LocalizationService),
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfilePasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
