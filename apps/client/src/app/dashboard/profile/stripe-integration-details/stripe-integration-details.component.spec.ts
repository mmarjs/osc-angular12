import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StripeIntegrationDetailsComponent } from './stripe-integration-details.component';
import { StripeAccountGuardComponent, StripeModule } from '@ocean/stripe';
import { UserFacade } from '@ocean/api/state';
import { provideMockStore } from '@ngrx/store/testing';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { UserTypeTitles } from '@ocean/api/shared';
import { of } from 'rxjs';
import { MockPipe } from 'ng-mocks';
import { StripeProvider } from '@ocean/api/services';
import { TranslatePipe } from '@ngx-translate/core';
import { screen } from '@testing-library/angular';
import { Router } from '@angular/router';
import userEvent from '@testing-library/user-event';
import { RouterTestingModule } from '@angular/router/testing';
import { PATHS } from '@ocean/shared';
import { BasicLayout } from '@ocean/layout';

const mockUserFacade = {
  userType$: of(UserTypeTitles.SHIPYARD),
  loadSavedCards: () => null,
  getSavedCards$: of([]),
  isLoading$: of(false),
};

const mockStripeProvider = {
  getStripeAccountErrors: () => of({}),
};

describe('StripeIntegrationDetailsComponent', () => {
  let component: StripeIntegrationDetailsComponent;
  let fixture: ComponentFixture<StripeIntegrationDetailsComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        StripeModule,
        RouterTestingModule.withRoutes([
          {
            path: PATHS.STRIPE,
            component: BasicLayout,
          },
        ]),
        StoreModule.forRoot([]),
        EffectsModule.forRoot([]),
      ],
      declarations: [
        StripeIntegrationDetailsComponent,
        StripeAccountGuardComponent,
        MockPipe(TranslatePipe, (v) => v),
      ],
      providers: [
        provideMockStore(),
        { provide: UserFacade, useValue: mockUserFacade },
        { provide: StripeProvider, useValue: mockStripeProvider },
      ],
    }).compileComponents();

    router = TestBed.inject(Router);
    router.initialNavigation();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StripeIntegrationDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should redirect to stripe page', async () => {
    const button = screen.getByText(/STRIPE.ACCOUNT.MANAGE/i);
    await userEvent.click(button);

    expect(router.url).toEqual(`/${PATHS.STRIPE}`);
  });
});
