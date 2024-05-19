import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { StripeProvider, StripeProviderMethod } from '@ocean/api/services';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { stripeActions } from './actions';
import { NotifierService } from '@ocean/shared/services';
import { LocalizationService } from '@ocean/internationalization';
import { StripeFacadeService } from './facade';
import { stripeAccountValidation } from '../helpers/stripe-account-validation';
import { UserFacade } from '@ocean/api/state';
import { Action } from '@ngrx/store';

@Injectable()
export class StripeEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly stripeProvider: StripeProvider,
    private readonly userFacade: UserFacade,
    private readonly stripeFacadeService: StripeFacadeService,
    private readonly notifierService: NotifierService,
    private readonly localizationService: LocalizationService
  ) {}

  loadAccount$ = createEffect(() =>
    this.actions$.pipe(
      ofType(stripeActions.loadAccount),
      switchMap(() =>
        this.stripeProvider[StripeProviderMethod.READ]().pipe(
          map((response) =>
            stripeActions.loadAccountSuccessful({ account: response })
          ),
          catchError((error) =>
            this.onError(stripeActions.loadAccountFailure(), error)
          )
        )
      )
    )
  );

  loadValidationErrors$ = createEffect(() =>
    this.actions$.pipe(
      ofType(stripeActions.loadValidationErrors),
      switchMap(() =>
        stripeAccountValidation(this.userFacade, this.stripeProvider).pipe(
          map((response) =>
            stripeActions.loadValidationErrorsSuccess({ validation: response })
          ),
          catchError((error) =>
            this.onError(stripeActions.loadValidationErrorsFailure(), error)
          )
        )
      )
    )
  );

  loadCards$ = createEffect(() =>
    this.actions$.pipe(
      ofType(stripeActions.loadCards),
      switchMap(() =>
        this.stripeProvider.getDebitCards().pipe(
          map((response) =>
            stripeActions.loadCardsSuccess({ cards: response })
          ),
          catchError((error) =>
            this.onError(stripeActions.loadCardsFailure(), error)
          )
        )
      )
    )
  );

  loadBanksAccounts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(stripeActions.loadBanks),
      switchMap(() =>
        this.stripeProvider.getBankAccounts().pipe(
          map((response) =>
            stripeActions.loadBanksSuccess({ banks: response })
          ),
          catchError((error) =>
            this.onError(stripeActions.loadBanksFailure(), error)
          )
        )
      )
    )
  );

  createStripeAccount$ = createEffect(() =>
    this.actions$.pipe(
      ofType(stripeActions.createStripeAccount),
      switchMap(({ account, method }) =>
        this.stripeProvider[method](account).pipe(
          map((response) =>
            stripeActions.createStripeAccountSuccess({
              account: response,
            })
          ),
          switchMap(() =>
            stripeAccountValidation(this.userFacade, this.stripeProvider)
          ),
          map((validation) =>
            stripeActions.loadValidationErrorsSuccess({
              validation,
            })
          ),
          catchError((error) =>
            this.onError(stripeActions.createStripeAccountFailure(), error)
          )
        )
      )
    )
  );

  createBankAccount$ = createEffect(() =>
    this.actions$.pipe(
      ofType(stripeActions.createBankAccount),
      switchMap(({ bankAccount }) =>
        this.stripeProvider.attachBankAccount(bankAccount).pipe(
          map(() => stripeActions.createBankAccountSuccess()),
          map(() => stripeActions.loadBanks()),
          catchError((error) =>
            this.onError(stripeActions.createBankAccountFailure(), error)
          )
        )
      )
    )
  );

  createDebitCard$ = createEffect(() =>
    this.actions$.pipe(
      ofType(stripeActions.createDebitCard),
      switchMap(({ debitCard }) =>
        this.stripeProvider.attachDebitCard(debitCard).pipe(
          map(() => stripeActions.createDebitCardSuccess()),
          map(() => stripeActions.loadCards()),
          catchError((error) =>
            this.onError(stripeActions.createDebitCardFailure(), error)
          )
        )
      )
    )
  );

  markDebitCardAsDefault$ = createEffect(() =>
    this.actions$.pipe(
      ofType(stripeActions.markDebitCardAsDefault),
      switchMap(({ id }) =>
        this.stripeProvider.makeDebitCardAsDefault(id).pipe(
          tap(() => this.stripeFacadeService.loadBanks()),
          map(() => stripeActions.markDebitCardAsDefaultSuccessful()),
          map(() => stripeActions.loadCards()),
          catchError((error) =>
            this.onError(stripeActions.markDebitCardAsDefaultFailure(), error)
          )
        )
      )
    )
  );

  markBankAccountAsDefault$ = createEffect(() =>
    this.actions$.pipe(
      ofType(stripeActions.markBankAccountAsDefault),
      switchMap(({ id }) =>
        this.stripeProvider.makeBankAccountAsDefault(id).pipe(
          tap(() => this.stripeFacadeService.loadCards()),
          map(() => stripeActions.markBankAccountAsDefaultSuccessful()),
          map(() => stripeActions.loadBanks()),
          catchError((error) =>
            this.onError(stripeActions.markBankAccountAsDefaultFailure(), error)
          )
        )
      )
    )
  );

  deleteDebitCard$ = createEffect(() =>
    this.actions$.pipe(
      ofType(stripeActions.deleteDebitCard),
      switchMap(({ id }) =>
        this.stripeProvider.deleteDebitCard(id).pipe(
          map(() => stripeActions.deleteDebitCardSuccessful()),
          map(() => stripeActions.loadCards()),
          catchError((error) =>
            this.onError(stripeActions.deleteDebitCardFailure(), error)
          )
        )
      )
    )
  );

  deleteBankAccount$ = createEffect(() =>
    this.actions$.pipe(
      ofType(stripeActions.deleteBankAccount),
      switchMap(({ id }) =>
        this.stripeProvider.deleteBankAccount(id).pipe(
          map(() => stripeActions.deleteBankAccountSuccessful()),
          map(() => stripeActions.loadBanks()),
          catchError((error) =>
            this.onError(stripeActions.deleteBankAccountFailure(), error)
          )
        )
      )
    )
  );

  private onError(action: Action, error: Error) {
    this.notifierService.error(
      error?.message ??
        this.localizationService.translate('STRIPE.ERROR.UNEXPECTED')
    );

    return of(action);
  }
}
