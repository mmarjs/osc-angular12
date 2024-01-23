import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { of, ReplaySubject } from 'rxjs';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import {
  API_ENVIRONMENT,
  ApiError, EditPayment,
  EditPaymentMethod,
  PaymentMethod,
  PaymentSetUpIntent,
  User,
  UserInputDTO,
  UserUpdateDTO
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
import { take } from 'rxjs/operators';

describe('SessionEffects', () => {
  const actions$: ReplaySubject<any> = new ReplaySubject<any>(1);
  let effects: SessionEffects;
  let authService: AuthService;
  let user: UserProvider;
  let notifier: NotifierService;
  let translate: TranslateService;
  let userFacade: UserFacade;

  const router = {
    navigate: jest.fn()
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        MatDialogModule,
        MatSnackBarModule,
        ...StoreTesting,
      ],
      providers: [
        {provide: API_ENVIRONMENT, useValue: mockEnvironment},
        SessionEffects,
        provideMockActions(() => actions$),
        MockProvider(AuthService),
        MockProvider(NotifierService),
        MockProvider(UserProvider),
        MockProvider(AppRouteDefinitions),
        MockProvider(TranslateService),
        MockProvider(UserFacade),
        MockProvider(LocalizationService),
        {provide: Router, useValue: router}
      ],
    });

    effects = TestBed.inject(SessionEffects);
    authService = TestBed.inject(AuthService);
    user = TestBed.inject(UserProvider);
    notifier = TestBed.inject(NotifierService);
    translate = TestBed.inject(TranslateService);
    userFacade = TestBed.inject(UserFacade);
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

  it('initStart$ success', () => {
    actions$.next(SystemActions.loadSystem());

    const accessToken: Auth0DecodedHash = {
      accessToken: 'accessToken'
    };

    jest.spyOn(authService, 'getAccessToken').mockImplementationOnce(() => {
      return of(accessToken) as any;
    });

    effects.initStart$
      .pipe(take(1))
      .subscribe(res => {
        expect(res).toEqual(UserActions.tokenLoaded({hash: accessToken}));
      });
  });

  it('initStart$ error', () => {
    const accessToken: Auth0DecodedHash = {
      accessToken: 'accessToken'
    };

    jest.spyOn(authService, 'getAccessToken').mockImplementationOnce(() => {
      return of(accessToken) as any;
    });

    jest.spyOn(UserActions, 'tokenLoaded').mockImplementationOnce(() => {
      throw new Error();
    });

    actions$.next(SystemActions.loadSystem());

    effects.initStart$
      .pipe(take(1))
      .subscribe(res => {
        expect(res).toEqual(SystemActions.loadSystemSuccess());
      });
  });

  it('tokenLoaded$ error', () => {
    const accessToken: Auth0DecodedHash = {
      accessToken: 'accessToken'
    };

    const error: ApiError = {
      error: 'error',
      message: 'error message'
    };

    jest.spyOn(user, 'getCurrentUser').mockImplementationOnce(() => {
      throw error;
    });

    actions$.next(UserActions.tokenLoaded({hash: accessToken}));

    effects.tokenLoaded$
      .pipe(take(1))
      .subscribe(res => {
        expect(res).toEqual(UserActions.loginUserFailure({error}));
        expect(res).toEqual(SystemActions.loadSystemSuccess());
      });
  });

  it('tokenLoaded$ success', () => {
    const accessToken: Auth0DecodedHash = {
      accessToken: 'accessToken'
    };

    const loggedUser: User = {
      email: 'test@test.com'
    };

    jest.spyOn(user, 'getCurrentUser').mockImplementationOnce(() => {
      return of(loggedUser);
    });

    actions$.next(UserActions.tokenLoaded({hash: accessToken}));

    effects.tokenLoaded$
      .pipe(take(1))
      .subscribe(res => {
        expect(res).toEqual(UserActions.loginUserSuccess({user: loggedUser}));
        expect(res).toEqual(SystemActions.loadSystemSuccess());
      });
  });

  it('signupUser$ success', () => {
    const userObject: UserInputDTO = {
      email: 'test@test.com',
      login: 'login',
      password: 'password'
    };

    jest.spyOn(user, 'registerAccount').mockImplementation(() => {
      return of({});
    });

    jest.spyOn(notifier, 'success').mockReturnValue(null);

    jest.spyOn(translate, 'instant').mockImplementationOnce((key: string) => {
      return key;
    });

    actions$.next(UserActions.signUpUser({user: userObject}));

    effects.signupUser$
      .pipe(take(1))
      .subscribe(res => {
        expect(res).toEqual({});

        expect(user.registerAccount).toHaveBeenCalledWith(expect.objectContaining({
          userInputDTO: userObject
        }));

        expect(notifier.success).toHaveBeenCalledWith(
          'REGISTRATION.CHECK_YOUR_EMAIL_FOR_CONFIRMATION_REGISTRATION_MSG',
          'OK',
          5000
        );

        expect(router.navigate).toHaveBeenCalledWith(['/signup/created']);
      });
  });

  it('loginUser$ success', () => {
    jest.spyOn(authService, 'doLogin').mockReturnValue(null);

    actions$.next(UserActions.loginUser());

    effects.loginUser$
      .pipe(take(1))
      .subscribe(res => {
        expect(res).toEqual(UserActions.loginUser());
        expect(authService.doLogin).toHaveBeenCalled();
      });
  });

  it('updateUser$ success', () => {
    const userUpdate: UserUpdateDTO = {
      firstName: 'firstName',
      lastName: 'lastName',
      phoneNumber: '00000000'
    };

    const userUpdateExpected = {
      firstName: userUpdate.firstName,
      lastName: userUpdate.lastName,
      phoneNo: userUpdate.phoneNumber,
    };

    jest.spyOn(user, 'updateUser').mockImplementation(() => {
      return of(userUpdateExpected);
    });

    actions$.next(UserActions.updateUser({user: userUpdate}));

    effects.updateUser$
      .pipe(take(1))
      .subscribe(res => {
        expect(res).toEqual(UserActions.updateUserSuccess({user: userUpdateExpected}));
      });
  });

  it('updateUser$ error', () => {
    const userUpdate: UserUpdateDTO = {
      firstName: 'firstName',
      lastName: 'lastName',
      phoneNumber: '00000000'
    };

    jest.spyOn(user, 'updateUser').mockImplementation(() => {
      return of(null);
    });

    actions$.next(UserActions.updateUser({user: userUpdate}));

    effects.updateUser$
      .pipe(take(1))
      .subscribe(res => {
        expect(res).toEqual(UserActions.updateUserFailure({error: new TypeError("Cannot read properties of null (reading 'firstName')")}));
      });
  });

  it('UpdateSuccess$ success', () => {
    const userObject: Partial<User> = {
      email: 'test@test.com'
    };

    jest.spyOn(notifier, 'success').mockReturnValue(null);

    actions$.next(UserActions.updateUserSuccess({user: userObject}));

    effects.updateSuccess$
      .pipe(take(1))
      .subscribe(res => {
        expect(res).toEqual(UserActions.updateUserSuccess({user: userObject}));
        expect(notifier.success).toHaveBeenCalledWith('Profile updated successfully');
        expect(router.navigate).toHaveBeenCalledWith(['/dashboard/profile']);
      });
  });

  it('logout$ success', () => {
    jest.spyOn(authService, 'doLogout').mockReturnValue(null);

    actions$.next(UserActions.logoutUser());

    effects.logout$
      .pipe(take(1))
      .subscribe(res => {
        expect(res).toEqual(undefined);
        expect(authService.doLogout).toHaveBeenCalled();
      });
  });

  it('updateUserAvatar$ success', () => {
    const testFile: File = new File([], 'name');

    const userObj: Partial<User> = {
      email: 'test@test.com'
    };

    jest.spyOn(user, 'updateUserAvatar').mockReturnValue(of(userObj));

    actions$.next(UserActions.updateUserAvatar({file: testFile}));

    effects.updateUserAvatar$
      .pipe(take(1))
      .subscribe(res => {
        expect(res).toEqual(UserActions.updateUserSuccess({user: userObj}));
      });
  });

  it('setUpIntent$ success', () => {
    const paymentSetupIntent: PaymentSetUpIntent = {
      clientSecret: 'clientSecret',
      setupIntentId: 'setupIntentId'
    };

    jest.spyOn(user, 'setUpIntent').mockImplementationOnce(() => {
      return of(paymentSetupIntent);
    });

    actions$.next(UserActions.setUpIntent());

    effects.setUpIntent$
      .pipe(take(1))
      .subscribe(res => {
        expect(res).toEqual(UserActions.setUpIntentSuccess({payment: paymentSetupIntent}));
      });
  });

  it('getUserCards success', () => {
    const cards: PaymentMethod[] = [
      {
        details: 'details',
        id: 0,
        stripeMethodId: 'stripeMethodId',
        type: 'type'
      }
    ];

    jest.spyOn(user, 'getSavedCards').mockImplementationOnce(() => {
      return of(cards);
    });

    actions$.next(UserActions.getUserCards());

    effects.getUserCards
      .pipe(take(1))
      .subscribe(res => {
        expect(res).toEqual(UserActions.getUserCardsSuccess({paymentMethods: cards}));
      });
  });

  it('deletePaymentMethod success', () => {
    const deleteItemNumber = 0;
    const dbPaymentId = 1;
    const nullValue = null;

    jest.spyOn(user, 'deletePaymentMethod').mockImplementationOnce(() => {
      return of(dbPaymentId);
    });

    jest.spyOn(userFacade, 'loadSavedCards').mockReturnValue(null);

    actions$.next(UserActions.deletePaymentMethod({id: deleteItemNumber}));

    effects.deletePaymentMethod
      .pipe(take(1))
      .subscribe(res => {
        expect(res).toEqual(nullValue);
      });
  });

  it('editPaymentMethod success', () => {
    const dbPaymentId = 1;
    const editedYearAndMonth: EditPaymentMethod = {
      expMonth: 1,
      expYear: 2023
    };

    const editPayment: EditPayment = {
      paymentMethodId: 'paymentMethodId'
    };

    jest.spyOn(user, 'editPaymentMethod').mockImplementationOnce(() => {
      return of(editPayment);
    });

    actions$.next(UserActions.editPaymentMethod({edit: {dbPaymentId, editedYearAndMonth}}));

    effects.editPaymentMethod
      .pipe(take(1))
      .subscribe(res => {
        expect(res).toEqual(UserActions.editPaymentMethodSuccess());
      });
  });
});
