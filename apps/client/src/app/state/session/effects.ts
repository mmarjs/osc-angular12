import * as Sentry from '@sentry/angular';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthService } from '@ocean/api/client';
import { UserProvider } from '@ocean/api/services';
import { NotifierService } from '@ocean/shared/services';
import { Auth0DecodedHash } from 'auth0-js';
import { from, of } from 'rxjs';
import { catchError, concatMap, delay, map, mergeMap, switchMap, tap, timeout, } from 'rxjs/operators';
import { SystemActions, UserActions, UserFacade, } from '@ocean/api/state';
import { ROUTES } from '@ocean/shared';
import { TranslateService } from '@ngx-translate/core';
import { LocalizationService } from '@ocean/internationalization';
import { environment } from '../../../environments/environment';

@Injectable()
export class SessionEffects {
  constructor(
    private readonly router: Router,
    private readonly actions$: Actions,
    private readonly auth: AuthService,
    private readonly user: UserProvider,
    private readonly notifier: NotifierService,
    private readonly userFacade: UserFacade,
    private readonly translate: TranslateService,
    private readonly localizationService: LocalizationService
  ) {
  }

  initStart$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SystemActions.loadSystem),
      switchMap(() => from(this.auth.getAccessToken())),
      timeout(10000),
      switchMap((hash: Auth0DecodedHash) => of(UserActions.tokenLoaded({hash}))),
      catchError(() => of(SystemActions.loadSystemSuccess()))
    )
  );

  tokenLoaded$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.tokenLoaded),
      switchMap(() => this.user.getCurrentUser()),
      switchMap(user => of(UserActions.loginUserSuccess({user}))),
      catchError(err => of(UserActions.loginUserFailure({error: err}))),
      concatMap((action) => [action, SystemActions.loadSystemSuccess()])
    )
  );

  signupUser$ = createEffect(() =>
      this.actions$.pipe(
        ofType(UserActions.signUpUser),
        switchMap(({user}) => this.user.registerAccount({userInputDTO: user})),
        tap(() => {
          const translateValue = this.translate.instant('REGISTRATION.CHECK_YOUR_EMAIL_FOR_CONFIRMATION_REGISTRATION_MSG');
          this.notifier.success(
            translateValue,
            'OK',
            5000
          );
          this.router.navigate([ROUTES.link('SIGNUP_CREATED')]);
        }),
        catchError((err) => {
          this.notifier.error(err, 'OK', 20000);
          return of(null);
        })
      ),
    {
      dispatch: false
    }
  );

  loginUser$ = createEffect(() =>
      this.actions$.pipe(
        ofType(UserActions.loginUser),
        tap(() => this.auth.doLogin())
      ),
    {
      dispatch: false
    }
  );

  loginSuccess$ = createEffect(() =>
      this.actions$.pipe(
        ofType(UserActions.loginUserSuccess),
        tap(({ user }) => {
          Sentry.configureScope(scope => {
            scope.setUser({
              id: `${user?.id}`,
              authId: user?.authId ?? '',
              login: user?.login ?? '',
              firstName: user?.firstName ?? '',
              lastName: user?.lastName ?? '',
              email: user?.email ?? '',
              type: user?.userTypes?.map(item => item?.type)?.join(',')?.replace(/_/g, ' ') ?? ''
            });
            scope.setTag('environment', environment.sentry.environment);
          });
        })
      ),
    {
      dispatch: false
    }
  );

  loginError$ = createEffect(() =>
      this.actions$.pipe(
        ofType(UserActions.loginUserFailure),
        tap(({error: ApiError}) => {
          if (typeof ApiError?.error === 'string') {
            this.notifier.error(ApiError.error, '', 5000);
          }
        })
      ),
    {
      dispatch: false
    }
  );

  reauthUser$ = createEffect(() =>
      this.actions$.pipe(
        ofType(UserActions.reauth),
        tap(() => this.auth.reauth())
      ),
    {
      dispatch: false
    }
  );

  updateUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.updateUser),
      switchMap(({user}) => this.user.updateUser({userDTO: user})),
      map(user => UserActions.updateUserSuccess({ user : {
        firstName: user.firstName,
        lastName: user.lastName,
        phoneNo: user.phoneNo,
        ...user
      }})),
      catchError(err => {
        if (err?.status === 'BAD_REQUEST') {
          this.notifier.error(this.localizationService.translate('FORMS.ERRORS.INVALID_DATA'));
        }
        return of(UserActions.updateUserFailure({
          error: err
        }));
      })
    )
  );

  updateUserAvatar$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.updateUserAvatar),
      switchMap(({file}) => this.user.updateUserAvatar({file})),
      map(user => UserActions.updateUserSuccess({user})),
      catchError(err => of(UserActions.updateUserFailure({error: err})))
    )
  );

  updateSuccess$ = createEffect(() =>
      this.actions$.pipe(
        ofType(UserActions.updateUserSuccess),
        tap(() => {
          this.notifier.success(this.localizationService.translate('PROFILE.UPDATED'));
          this.router.navigate([ROUTES.link('PROFILE')]);
        })
      ),
    {
      dispatch: false
    }
  );

  logout$ = createEffect(() =>
      this.actions$.pipe(
        ofType(UserActions.logoutUser),
        map(() => this.auth.doLogout())
      ),
    {
      dispatch: false
    }
  );

  setUpIntent$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.setUpIntent),
      switchMap(() => this.user.setUpIntent()),
      map(payment => UserActions.setUpIntentSuccess({payment})),
      catchError(payment => of(UserActions.setUpIntentFailure({payment})))
    )
  );

  getUserCards = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.getUserCards),
      mergeMap(() => this.user.getSavedCards()),
      map(paymentMethods => UserActions.getUserCardsSuccess({paymentMethods})),
      catchError(err => of(UserActions.getUserCardsFailure({error: err})))
    )
  );

  deletePaymentMethod = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.deletePaymentMethod),
      switchMap(({id}) => this.user.deletePaymentMethod(id)),
      delay(500),
      tap(() => this.userFacade.loadSavedCards()),
      catchError(err => of(UserActions.deletePaymentMethodFailure({error: err})))
    )
  );

  editPaymentMethod = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.editPaymentMethod),
      switchMap(({edit: method}) => this.user.editPaymentMethod(method.dbPaymentId, method.editedYearAndMonth)),
      delay(500),
      tap(() => this.userFacade.loadSavedCards()),
      delay(500),
      map(() => {
        this.notifier.success(this.localizationService.translate('PAYMENT.PAYMENT_METHOD_EDITED_SUCCESSFULLY'));
        return UserActions.editPaymentMethodSuccess();
      }),
      catchError(err => {
        this.notifier.error(this.localizationService.translate('PAYMENT.EDIT_PAYMENT_METHOD_FAILED'));
        return of(UserActions.editPaymentMethodFailure({error: err}));
      })
    )
  );
}
