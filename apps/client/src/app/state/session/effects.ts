import * as Sentry from '@sentry/angular';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthService } from '@ocean/api/client';
import { UserProvider } from '@ocean/api/services';
import { NotifierService } from '@ocean/shared/services';
import { Auth0DecodedHash } from 'auth0-js';
import { from, of } from 'rxjs';
import {
  catchError,
  concatMap,
  delay,
  map,
  mergeMap,
  switchMap,
  tap,
  timeout,
} from 'rxjs/operators';
import { SystemActions, UserActions, UserFacade } from '@ocean/api/state';
import { ROUTES } from '@ocean/shared';
import { TranslateService } from '@ngx-translate/core';
import { environment } from '../../../environments/environment';
import { User } from '@ocean/api/shared';

@Injectable()
export class SessionEffects {
  constructor(
    private readonly router: Router,
    private readonly actions$: Actions,
    private readonly auth: AuthService,
    private readonly user: UserProvider,
    private readonly notifier: NotifierService,
    private readonly userFacade: UserFacade,
    private readonly translate: TranslateService
  ) {}

  initStart$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SystemActions.loadSystem),
      switchMap(() =>
        from(this.auth.getAccessToken()).pipe(
          switchMap((hash: Auth0DecodedHash) =>
            of(UserActions.tokenLoaded({ hash }))
          ),
          timeout(10000),
          catchError(() => of(SystemActions.loadSystemSuccess()))
        )
      )
    )
  );

  tokenLoaded$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.tokenLoaded),
      switchMap(() =>
        this.user.getCurrentUser().pipe(
          map((user) => UserActions.loginUserSuccess({ user })),
          catchError((err) => of(UserActions.loginUserFailure({ error: err })))
        )
      ),
      concatMap((action) => [action, SystemActions.loadSystemSuccess()])
    )
  );

  signupUser$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(UserActions.signUpUser),
        switchMap(({ user }) =>
          this.user.registerAccount({ userInputDTO: user }).pipe(
            tap(() => {
              const checkEmailConfirmationText = this.translate.instant(
                'REGISTRATION.CHECK_YOUR_EMAIL_FOR_CONFIRMATION_REGISTRATION_MSG'
              );
              const okValue = this.translate.instant('COMMON.OK');
              this.notifier.success(checkEmailConfirmationText, okValue, 5000);
              this.router.navigate([ROUTES.link('SIGNUP_CREATED')]);
            }),
            catchError((err) => {
              const listOfErrors =
                err?.errors
                  ?.map((e) =>
                    this.translate.instant(`auth0.${e}`.toUpperCase())
                  )
                  ?.join(', ') ??
                this.translate.instant('AUTH0.ERROR.UNHANDLED');

              this.notifier.confirm(listOfErrors);
              return of(null);
            })
          )
        )
      ),
    {
      dispatch: false,
    }
  );

  loginUser$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(UserActions.loginUser),
        tap(() => this.auth.doLogin())
      ),
    {
      dispatch: false,
    }
  );

  loginSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(UserActions.loginUserSuccess),
        tap(({ user }) => {
          Sentry.configureScope((scope) => {
            scope.setUser(this.userToSentryUser(user));
            scope.setTag('environment', environment.sentry.environment);
          });
        })
      ),
    {
      dispatch: false,
    }
  );

  loginError$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(UserActions.loginUserFailure),
        tap(({ error: ApiError }) => {
          if (typeof ApiError?.error === 'string') {
            this.notifier.error(ApiError.error, '', 5000);
          }
        })
      ),
    {
      dispatch: false,
    }
  );

  reauthUser$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(UserActions.reauth),
        tap(() => this.auth.reauth())
      ),
    {
      dispatch: false,
    }
  );

  updateUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.updateUser),
      switchMap(({ user }) =>
        this.user.updateUser({ userDTO: user }).pipe(
          map((user) =>
            UserActions.updateUserSuccess({
              user: {
                firstName: user.firstName,
                lastName: user.lastName,
                phoneNo: user.phoneNo,
                ...user,
              },
            })
          ),
          catchError((err) => {
            if (
              err?.status === 'BAD_REQUEST' ||
              err?.statusText === 'BAD_REQUEST'
            ) {
              this.notifier.error(
                this.translate.instant('FORMS.ERRORS.INVALID_DATA')
              );
            }
            return of(
              UserActions.updateUserFailure({
                error: err,
              })
            );
          })
        )
      )
    )
  );

  updateUserAvatar$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.updateUserAvatar),
      switchMap(({ file }) =>
        this.user.updateUserAvatar({ file }).pipe(
          map((user) => UserActions.updateUserSuccess({ user })),
          catchError((err) => of(UserActions.updateUserFailure({ error: err })))
        )
      )
    )
  );

  updateSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(UserActions.updateUserSuccess),
        tap(() => {
          this.notifier.success(this.translate.instant('PROFILE.UPDATED'));
          this.router.navigate([ROUTES.link('PROFILE')]);
        })
      ),
    {
      dispatch: false,
    }
  );

  logout$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(UserActions.logoutUser),
        map(() => this.auth.doLogout())
      ),
    {
      dispatch: false,
    }
  );

  setUpIntent$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.setUpIntent),
      switchMap(() =>
        this.user.setUpIntent().pipe(
          map((payment) => UserActions.setUpIntentSuccess({ payment })),
          catchError((payment) =>
            of(UserActions.setUpIntentFailure({ payment }))
          )
        )
      )
    )
  );

  getUserCards$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.getUserCards),
      mergeMap((params) => {
        return this.user.getSavedCards().pipe(
          switchMap((paymentMethods) => {
            if (
              typeof params?.lastLength === 'number' &&
              paymentMethods.length === params.lastLength
            ) {
              return of(
                UserActions.getUserCards({ lastLength: params.lastLength })
              ).pipe(delay(1_000));
            }
            return of(UserActions.getUserCardsSuccess({ paymentMethods }));
          }),
          catchError((err) =>
            of(UserActions.getUserCardsFailure({ error: err }))
          )
        );
      })
    )
  );

  deletePaymentMethod$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.deletePaymentMethod),
      switchMap(({ id }) =>
        this.user.deletePaymentMethod(id).pipe(
          delay(500),
          tap(() => this.userFacade.loadSavedCards()),
          map(() => UserActions.deletePaymentMethodSuccess({ id })),
          catchError((err) =>
            of(UserActions.deletePaymentMethodFailure({ error: err }))
          )
        )
      )
    )
  );

  editPaymentMethod$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.editPaymentMethod),
      switchMap(({ edit: method }) =>
        this.user
          .editPaymentMethod(method.dbPaymentId, method.editedYearAndMonth)
          .pipe(
            delay(500),
            tap(() => this.userFacade.loadSavedCards()),
            delay(500),
            map(() => {
              this.notifier.success(
                this.translate.instant(
                  'PAYMENT.PAYMENT_METHOD_EDITED_SUCCESSFULLY'
                )
              );
              return UserActions.editPaymentMethodSuccess();
            }),
            catchError((err) => {
              this.notifier.error(
                this.translate.instant('PAYMENT.EDIT_PAYMENT_METHOD_FAILED')
              );
              return of(UserActions.editPaymentMethodFailure({ error: err }));
            })
          )
      )
    )
  );

  private userToSentryUser(user: User): Sentry.User {
    return {
      id: `${user?.id}`,
      authId: user?.authId ?? '',
      login: user?.login ?? '',
      firstName: user?.firstName ?? '',
      lastName: user?.lastName ?? '',
      email: user?.email ?? '',
      type:
        user?.userTypes
          ?.map((item) => item?.type)
          .join(',')
          .replace(/_/g, ' ') ?? '',
    };
  }
}
