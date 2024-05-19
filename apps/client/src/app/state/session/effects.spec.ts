import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of, throwError } from 'rxjs';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import {
  API_ENVIRONMENT,
  ApiError,
  EditPayment,
  EditPaymentMethod,
  PaymentMethod,
  PaymentSetUpIntent,
  User,
  UserInputDTO,
  UserUpdateDTO,
} from '@ocean/api/shared';
import { mockEnvironment, StoreTesting } from '@ocean/testing';
import { SessionEffects } from './effects';
import { MockProvider } from 'ng-mocks';
import { AuthService } from '@ocean/api/client';
import { Auth0DecodedHash } from 'auth0-js';
import { SystemActions, UserActions, UserFacade } from '@ocean/api/state';
import { UserProvider } from '@ocean/api/services';
import { NotifierService } from '@ocean/shared/services';
import { Router } from '@angular/router';
import { AppRouteDefinitions } from '@ocean/shared';
import { TranslateService } from '@ngx-translate/core';
import { LocalizationService } from '@ocean/internationalization';
import * as Sentry from '@sentry/angular';
import { Action } from '@ngrx/store';
import { TestScheduler } from 'rxjs/testing';
import { HttpErrorResponse } from '@angular/common/http';

export function getScheduler() {
  const testScheduler = new TestScheduler((actual, expected) => {
    expect(actual).toEqual(expected);
  });
  return testScheduler;
}

afterEach(() => {
  expect.hasAssertions();
});

describe('SessionEffects', () => {
  let effects: SessionEffects;
  let authService: AuthService;
  let user: UserProvider;
  let notifier: NotifierService;
  let userFacade: UserFacade;

  const router = {
    navigate: jest.fn(),
  };

  let actions$: Observable<Action>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        MatDialogModule,
        MatSnackBarModule,
        ...StoreTesting,
      ],
      providers: [
        { provide: API_ENVIRONMENT, useValue: mockEnvironment },
        SessionEffects,
        provideMockActions(() => actions$),
        MockProvider(AuthService),
        MockProvider(NotifierService),
        MockProvider(UserProvider),
        MockProvider(AppRouteDefinitions),
        MockProvider(TranslateService),
        MockProvider(UserFacade),
        MockProvider(LocalizationService),
        MockProvider(TranslateService, { instant: jest.fn((k) => k) }),
        { provide: Router, useValue: router },
      ],
    });

    effects = TestBed.inject(SessionEffects);
    authService = TestBed.inject(AuthService);
    user = TestBed.inject(UserProvider);
    notifier = TestBed.inject(NotifierService);
    userFacade = TestBed.inject(UserFacade);
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  it('initStart$ success', () => {
    const accessToken: Auth0DecodedHash = {
      accessToken: 'accessToken',
    };

    getScheduler().run(({ expectObservable, hot, flush }) => {
      authService.getAccessToken = jest.fn().mockReturnValue(of(accessToken));

      actions$ = hot('a', { a: SystemActions.loadSystem() });

      expectObservable(effects.initStart$).toBe('a', {
        a: UserActions.tokenLoaded({ hash: accessToken }),
      });

      flush();
    });
  });

  it('initStart$ error', () => {
    jest.spyOn(authService, 'getAccessToken').mockImplementationOnce(() => {
      return Promise.reject(new Error('error'));
    });

    getScheduler().run(({ expectObservable, hot, flush }) => {
      actions$ = hot('a', { a: SystemActions.loadSystem() });

      expectObservable(effects.initStart$).toBe('10s e', {
        e: SystemActions.loadSystemSuccess(),
      });

      flush();
    });
  });

  it('tokenLoaded$ success', () => {
    const accessToken: Auth0DecodedHash = {
      accessToken: 'accessToken',
    };

    const loggedUser: User = {
      email: 'test@test.com',
    };

    jest.spyOn(user, 'getCurrentUser').mockImplementationOnce(() => {
      return of(loggedUser);
    });

    getScheduler().run(({ expectObservable, cold, flush }) => {
      actions$ = cold('a', {
        a: UserActions.tokenLoaded({ hash: accessToken }),
      });

      expectObservable(effects.tokenLoaded$).toBe('(ab)', {
        a: UserActions.loginUserSuccess({ user: loggedUser }),
        b: SystemActions.loadSystemSuccess(),
      });

      flush();
    });
  });

  it('tokenLoaded$ error', () => {
    const accessToken: Auth0DecodedHash = {
      accessToken: 'accessToken',
    };

    const error: ApiError = {
      error: 'error',
      message: 'error message',
    };

    jest
      .spyOn(user, 'getCurrentUser')
      .mockImplementation(() => throwError(() => error));

    getScheduler().run(({ expectObservable, cold, hot, flush }) => {
      actions$ = hot('a', {
        a: UserActions.tokenLoaded({ hash: accessToken }),
      });

      expectObservable(effects.tokenLoaded$).toBe('(ab)', {
        a: UserActions.loginUserFailure({ error }),
        b: SystemActions.loadSystemSuccess(),
      });

      flush();
    });
  });

  it('signupUser$ success', () => {
    const userObject: UserInputDTO = {
      email: 'test@test.com',
      login: 'login',
      password: 'password',
    };

    jest.spyOn(user, 'registerAccount').mockImplementation(() => {
      return of({});
    });

    jest.spyOn(notifier, 'success').mockReturnValue(null);

    getScheduler().run(({ expectObservable, cold, flush }) => {
      actions$ = cold('a', {
        a: UserActions.signUpUser({ user: userObject }),
      });

      expectObservable(effects.signupUser$).toBe('a', { a: {} });

      flush();

      expect(user.registerAccount).toHaveBeenCalledWith(
        expect.objectContaining({
          userInputDTO: userObject,
        })
      );

      expect(notifier.success).toHaveBeenCalledWith(
        'REGISTRATION.CHECK_YOUR_EMAIL_FOR_CONFIRMATION_REGISTRATION_MSG',
        'COMMON.OK',
        5000
      );

      expect(router.navigate).toHaveBeenCalledWith(['/signup/created']);
    });
  });

  it('signupUser$ error', () => {
    const userObject: UserInputDTO = {
      email: '',
      login: 'login',
      password: 'password',
    };
    jest.spyOn(user, 'registerAccount').mockImplementation(() => {
      return throwError(() => Error('API error'));
    });

    jest.spyOn(notifier, 'confirm').mockReturnValue(null);

    getScheduler().run(({ expectObservable, cold, flush }) => {
      actions$ = cold('a', {
        a: UserActions.signUpUser({ user: userObject }),
      });

      expectObservable(effects.signupUser$).toBe('a', { a: null });

      flush();
      expect(notifier.confirm).toHaveBeenCalledWith('AUTH0.ERROR.UNHANDLED');

      expect(user.registerAccount).toHaveBeenCalledWith({
        userInputDTO: userObject,
      });
    });
  });

  it('loginUser$ success', () => {
    jest.spyOn(authService, 'doLogin').mockReturnValue(null);

    getScheduler().run(({ expectObservable, hot, flush }) => {
      actions$ = hot('a', {
        a: UserActions.loginUser(),
      });

      expectObservable(effects.loginUser$).toBe('a', {
        a: UserActions.loginUser(),
      });
      flush();
      expect(authService.doLogin).toHaveBeenCalled();
    });
  });

  it('loginSuccess$ success', () => {
    const user: User = {
      id: 1,
      authId: '123',
      login: 'login',
      firstName: 'first',
      lastName: 'last',
      email: 'test@test.com',
      userTypes: [
        { id: 1, type: 'user' },
        { id: 2, type: 'admin' },
      ],
    };
    const scopeMock = {
      setUser: jest.fn(),
      setTag: jest.fn(),
    };
    jest
      .spyOn(Sentry, 'configureScope')
      .mockImplementation((cb: any) => cb(scopeMock));

    getScheduler().run(({ expectObservable, hot, flush }) => {
      actions$ = hot('a', {
        a: UserActions.loginUserSuccess({ user: user }),
      });

      expectObservable(effects.loginSuccess$).toBe('a', {
        a: UserActions.loginUserSuccess({ user: user }),
      });

      flush();
      expect(scopeMock.setUser).toHaveBeenCalledWith({
        ...user,
        userTypes: undefined,
        id: '1',
        type: 'user,admin',
      });
      expect(scopeMock.setTag).toHaveBeenCalledWith('environment', 'local');
    });
  });

  it('loginError$ success', () => {
    const error: ApiError = {
      error: 'error',
      message: 'error message',
    };
    jest.spyOn(notifier, 'error').mockReturnValue(null);

    getScheduler().run(({ expectObservable, hot, flush }) => {
      actions$ = hot('a', {
        a: UserActions.loginUserFailure({ error: error }),
      });

      expectObservable(effects.loginError$).toBe('a', {
        a: UserActions.loginUserFailure({ error: error }),
      });

      flush();

      expect(notifier.error).toHaveBeenCalledWith(error.error, '', 5000);
    });
  });

  it('reauthUser$ success', () => {
    jest.spyOn(authService, 'reauth').mockReturnValue(null);

    getScheduler().run(({ expectObservable, hot, flush }) => {
      actions$ = hot('a', {
        a: UserActions.reauth(),
      });

      expectObservable(effects.reauthUser$).toBe('a', {
        a: UserActions.reauth(),
      });

      flush();

      expect(authService.reauth).toHaveBeenCalled();
    });
  });

  it('updateUser$ success', () => {
    const userUpdate: UserUpdateDTO = {
      firstName: 'firstName',
      lastName: 'lastName',
      phoneNumber: '00000000',
    };

    const userUpdateExpected = {
      firstName: userUpdate.firstName,
      lastName: userUpdate.lastName,
      phoneNo: userUpdate.phoneNumber,
    };

    jest
      .spyOn(user, 'updateUser')
      .mockImplementation(() => of(userUpdateExpected));

    getScheduler().run(({ expectObservable, hot, flush }) => {
      actions$ = hot('a', {
        a: UserActions.updateUser({ user: userUpdate }),
      });

      expectObservable(effects.updateUser$).toBe('a', {
        a: UserActions.updateUserSuccess({ user: userUpdateExpected }),
      });

      flush();

      expect(user.updateUser).toHaveBeenCalledWith({ userDTO: userUpdate });
    });
  });

  it('updateUser$ error', () => {
    const userUpdate: UserUpdateDTO = {
      firstName: 'firstName',
      lastName: 'lastName',
      phoneNumber: '00000000',
    };
    jest.spyOn(user, 'updateUser').mockImplementation(() => {
      return of(null);
    });

    getScheduler().run(({ expectObservable, hot, flush }) => {
      actions$ = hot('a', {
        a: UserActions.updateUser({ user: userUpdate }),
      });

      expectObservable(effects.updateUser$).toBe('a', {
        a: UserActions.updateUserFailure({
          error: new TypeError(
            "Cannot read properties of null (reading 'firstName')"
          ),
        }),
      });

      flush();

      expect(user.updateUser).toHaveBeenCalledWith({ userDTO: userUpdate });
    });
  });

  it('updateUser$ BAD_REQUEST', () => {
    const error = new HttpErrorResponse({
      statusText: 'BAD_REQUEST',
    });
    jest.spyOn(user, 'updateUser').mockImplementation(() => {
      return throwError(() => error);
    });
    jest.spyOn(notifier, 'error').mockReturnValue(null);

    getScheduler().run(({ expectObservable, hot, flush }) => {
      actions$ = hot('a', {
        a: UserActions.updateUser({ user: null }),
      });

      expectObservable(effects.updateUser$).toBe('a', {
        a: UserActions.updateUserFailure({
          error: error,
        }),
      });

      flush();

      expect(user.updateUser).toHaveBeenCalledWith({ userDTO: null });
      expect(notifier.error).toHaveBeenCalledWith('FORMS.ERRORS.INVALID_DATA');
    });
  });

  it('updateUserAvatar$ success', () => {
    const testFile: File = new File([], 'name');

    const userObj: Partial<User> = {
      email: 'test@test.com',
    };

    jest.spyOn(user, 'updateUserAvatar').mockReturnValue(of(userObj));

    getScheduler().run(({ expectObservable, hot, flush }) => {
      actions$ = hot('a', {
        a: UserActions.updateUserAvatar({ file: testFile }),
      });

      expectObservable(effects.updateUserAvatar$).toBe('a', {
        a: UserActions.updateUserSuccess({ user: userObj }),
      });

      flush();

      expect(user.updateUserAvatar).toHaveBeenCalledWith({ file: testFile });
    });
  });

  it('updateUserAvatar$ error', () => {
    const error = new HttpErrorResponse({ statusText: 'BAD_REQUEST' });
    const testFile = new File([], 'testFile');
    jest.spyOn(user, 'updateUserAvatar').mockImplementation(() => {
      return throwError(() => error);
    });

    getScheduler().run(({ expectObservable, hot, flush }) => {
      actions$ = hot('a', {
        a: UserActions.updateUserAvatar({ file: testFile }),
      });

      expectObservable(effects.updateUserAvatar$).toBe('a', {
        a: UserActions.updateUserFailure({
          error: error,
        }),
      });

      flush();

      expect(user.updateUserAvatar).toHaveBeenCalledWith({ file: testFile });
    });
  });

  it('UpdateSuccess$ success', () => {
    const userObject: Partial<User> = {
      email: 'test@test.com',
    };

    jest.spyOn(notifier, 'success').mockReturnValue(null);

    getScheduler().run(({ expectObservable, hot, flush }) => {
      actions$ = hot('a', {
        a: UserActions.updateUserSuccess({ user: userObject }),
      });

      expectObservable(effects.updateSuccess$).toBe('a', {
        a: UserActions.updateUserSuccess({ user: userObject }),
      });

      flush();

      expect(notifier.success).toHaveBeenCalledWith('PROFILE.UPDATED');
      expect(router.navigate).toHaveBeenCalledWith(['/dashboard/profile']);
    });
  });

  it('logout$ success', () => {
    jest.spyOn(authService, 'doLogout').mockReturnValue(null);

    getScheduler().run(({ expectObservable, hot, flush }) => {
      actions$ = hot('a', {
        a: UserActions.logoutUser(),
      });

      expectObservable(effects.logout$).toBe('a', {
        a: null,
      });

      flush();

      expect(authService.doLogout).toHaveBeenCalled();
    });
  });

  it('setUpIntent$ success', () => {
    const paymentSetupIntent: PaymentSetUpIntent = {
      clientSecret: 'clientSecret',
      setupIntentId: 'setupIntentId',
    };

    jest.spyOn(user, 'setUpIntent').mockImplementationOnce(() => {
      return of(paymentSetupIntent);
    });

    getScheduler().run(({ expectObservable, hot, flush }) => {
      actions$ = hot('a', {
        a: UserActions.setUpIntent(),
      });

      expectObservable(effects.setUpIntent$).toBe('a', {
        a: UserActions.setUpIntentSuccess({ payment: paymentSetupIntent }),
      });

      flush();

      expect(user.setUpIntent).toHaveBeenCalled();
    });
  });

  it('setUpIntent$ error', () => {
    const error = new HttpErrorResponse({
      statusText: 'BAD_REQUEST',
    });

    jest.spyOn(user, 'setUpIntent').mockImplementation(() => {
      return throwError(() => error);
    });

    getScheduler().run(({ expectObservable, hot, flush }) => {
      actions$ = hot('a', {
        a: UserActions.setUpIntent(),
      });

      expectObservable(effects.setUpIntent$).toBe('a', {
        a: UserActions.setUpIntentFailure({ payment: error }),
      });

      flush();

      expect(user.setUpIntent).toHaveBeenCalled();
    });
  });

  it('getUserCards success', () => {
    const cards: PaymentMethod[] = [
      {
        details: 'details',
        id: 0,
        stripeMethodId: 'stripeMethodId',
        type: 'type',
      },
    ];

    jest.spyOn(user, 'getSavedCards').mockImplementationOnce(() => {
      return of(cards);
    });

    getScheduler().run(({ expectObservable, hot, flush }) => {
      actions$ = hot('a', {
        a: UserActions.getUserCards({}),
      });

      expectObservable(effects.getUserCards$).toBe('a', {
        a: UserActions.getUserCardsSuccess({ paymentMethods: cards }),
      });

      flush();

      expect(user.getSavedCards).toHaveBeenCalled();
    });
  });

  it('getUserCards success new card loaded', () => {
    const cards: PaymentMethod[] = [
      {
        details: 'details',
        id: 0,
        stripeMethodId: 'stripeMethodId',
        type: 'type',
      },
    ];

    jest.spyOn(user, 'getSavedCards').mockImplementationOnce(() => {
      return of(cards);
    });

    getScheduler().run(({ expectObservable, hot, flush }) => {
      actions$ = hot('a', {
        a: UserActions.getUserCards({ lastLength: 0 }),
      });

      expectObservable(effects.getUserCards$).toBe('a', {
        a: UserActions.getUserCardsSuccess({ paymentMethods: cards }),
      });

      flush();

      expect(user.getSavedCards).toHaveBeenCalled();
    });
  });
  it('getUserCards success with reload if amount not changed', () => {
    const cards: PaymentMethod[] = [
      {
        details: 'details',
        id: 0,
        stripeMethodId: 'stripeMethodId',
        type: 'type',
      },
    ];

    jest.spyOn(user, 'getSavedCards').mockImplementationOnce(() => {
      return of(cards);
    });

    getScheduler().run(({ expectObservable, hot, flush }) => {
      actions$ = hot('a', {
        a: UserActions.getUserCards({ lastLength: 1 }),
      });

      expectObservable(effects.getUserCards$).toBe('1s a', {
        a: UserActions.getUserCards({ lastLength: 1 }),
      });

      flush();

      expect(user.getSavedCards).toHaveBeenCalled();
    });
  });

  it('getUserCards error', () => {
    const error = new HttpErrorResponse({
      statusText: 'BAD_REQUEST',
    });
    jest.spyOn(user, 'getSavedCards').mockImplementationOnce(() => {
      return throwError(error);
    });

    getScheduler().run(({ expectObservable, hot, flush }) => {
      actions$ = hot('a', {
        a: UserActions.getUserCards({}),
      });

      expectObservable(effects.getUserCards$).toBe('a', {
        a: UserActions.getUserCardsFailure({ error }),
      });

      flush();

      expect(user.getSavedCards).toHaveBeenCalled();
    });
  });

  it('deletePaymentMethod success', () => {
    const dbPaymentId = 1;

    jest.spyOn(user, 'deletePaymentMethod').mockImplementationOnce(() => {
      return of(null);
    });

    jest.spyOn(userFacade, 'loadSavedCards');

    getScheduler().run(({ expectObservable, hot, flush }) => {
      actions$ = hot('a', {
        a: UserActions.deletePaymentMethod({ id: dbPaymentId }),
      });

      expectObservable(effects.deletePaymentMethod$).toBe('500ms a', {
        a: UserActions.deletePaymentMethodSuccess({ id: dbPaymentId }),
      });

      flush();

      expect(user.deletePaymentMethod).toHaveBeenCalledWith(dbPaymentId);
      expect(userFacade.loadSavedCards).toHaveBeenCalled();
    });
  });

  it('deletePaymentMethod error', () => {
    const deleteItemNumber = 0;

    const error = new HttpErrorResponse({
      statusText: 'BAD_REQUEST',
    });
    jest.spyOn(user, 'deletePaymentMethod').mockImplementationOnce(() => {
      return throwError(() => error);
    });

    jest.spyOn(userFacade, 'loadSavedCards').mockReturnValue(null);

    getScheduler().run(({ expectObservable, hot, flush }) => {
      actions$ = hot('a', {
        a: UserActions.deletePaymentMethod({ id: deleteItemNumber }),
      });

      expectObservable(effects.deletePaymentMethod$).toBe('a', {
        a: UserActions.deletePaymentMethodFailure({ error }),
      });

      flush();

      expect(user.deletePaymentMethod).toHaveBeenCalledWith(deleteItemNumber);
      expect(userFacade.loadSavedCards).not.toHaveBeenCalled();
    });
  });

  it('editPaymentMethod success', () => {
    const dbPaymentId = 1;
    const editedYearAndMonth: EditPaymentMethod = {
      expMonth: 1,
      expYear: 2023,
    };

    const editPayment: EditPayment = {
      paymentMethodId: 'paymentMethodId',
    };

    jest.spyOn(user, 'editPaymentMethod').mockImplementationOnce(() => {
      return of(editPayment);
    });

    jest.spyOn(userFacade, 'loadSavedCards').mockReturnValue(null);
    jest.spyOn(notifier, 'success').mockReturnValue(null);

    getScheduler().run(({ expectObservable, hot, flush }) => {
      actions$ = hot('a', {
        a: UserActions.editPaymentMethod({
          edit: { dbPaymentId, editedYearAndMonth },
        }),
      });

      expectObservable(effects.editPaymentMethod$).toBe('1s a', {
        a: UserActions.editPaymentMethodSuccess(),
      });

      flush();

      expect(user.editPaymentMethod).toHaveBeenCalledWith(
        dbPaymentId,
        editedYearAndMonth
      );

      expect(userFacade.loadSavedCards).toHaveBeenCalled();

      expect(notifier.success).toHaveBeenCalledWith(
        'PAYMENT.PAYMENT_METHOD_EDITED_SUCCESSFULLY'
      );
    });
  });
});
