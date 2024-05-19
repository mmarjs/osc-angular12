import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { StripeFacadeService } from '../store/facade';
import { ManageGuard } from './manage.guard';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { PATHS } from '@ocean/shared';
import { STRIPE_FEATURE_KEY } from '../store/state';
import { StripeAccountValidationStatus } from '../helpers/stripe-account-validation';
import { StripeProviderMethod } from '@ocean/api/services';

describe('Manage Guard', () => {
  let router: Router;
  let store: MockStore;
  let guard: ManageGuard;
  let stripeFacadeService: StripeFacadeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [provideMockStore(), StripeFacadeService],
    });

    guard = TestBed.inject(ManageGuard);
    router = TestBed.inject(Router);
    stripeFacadeService = TestBed.inject(StripeFacadeService);
    store = TestBed.inject(MockStore);
  });

  it('should be created', () => {
    expect(router).toBeTruthy();
    expect(stripeFacadeService).toBeTruthy();
    expect(guard).toBeTruthy();
  });

  it('should return to dashboard', async () => {
    store.setState({
      [STRIPE_FEATURE_KEY]: {
        validation: null,
      },
    });

    store.refreshState();

    const spy = jest
      .spyOn(router, 'parseUrl')
      .mockImplementationOnce(() => null);

    await guard.canActivate();

    expect(spy).toHaveBeenCalledWith(`/${PATHS.DASHBOARD}`);
  });

  it.each([
    StripeAccountValidationStatus.NOT_CREATED,
    StripeAccountValidationStatus.PROCEED,
  ])(`should redirect to create / read account (%s)`, async (type) => {
    store.setState({
      [STRIPE_FEATURE_KEY]: {
        validation: {
          status: type,
          errors: {},
        },
      },
    });

    store.refreshState();

    const spy = jest
      .spyOn(router, 'navigate')
      .mockImplementationOnce(() => null);

    await guard.canActivate();

    expect(spy).toHaveBeenCalledWith([PATHS.CREATE_STRIPE_ACCOUNT], {
      replaceUrl: false,
      state: {
        method:
          type === StripeAccountValidationStatus.NOT_CREATED
            ? StripeProviderMethod.CREATE
            : StripeProviderMethod.READ,
      },
    });
  });

  it('should grant access', async () => {
    store.setState({
      [STRIPE_FEATURE_KEY]: {
        validation: {
          status: StripeAccountValidationStatus.VALID,
          errors: {},
        },
      },
    });

    store.refreshState();

    const response = await guard.canActivate();
    expect(response).toEqual(true);
  });
});
