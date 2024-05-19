import { StripeEffects } from './effects';
import { TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { StripeProvider, StripeProviderMethod } from '@ocean/api/services';
import { lastValueFrom, Observable, of, throwError } from 'rxjs';
import { provideMockActions } from '@ngrx/effects/testing';
import { stripeActions } from './actions';
import { NotifierService } from '@ocean/shared/services';
import { LocalizationService } from '@ocean/internationalization';
import { MockProvider } from 'ng-mocks';
import { UserFacade } from '@ocean/api/state';
import { UserTypeTitles } from '@ocean/api/shared';
import {
  StripeAccountValidationStatus,
  StripeValidation,
} from '../helpers/stripe-account-validation';
import { STRIPE_FEATURE_KEY } from './state';

describe('Stripe Effects Tests', () => {
  let actions$: Observable<any>;
  let effects: StripeEffects;
  let store: MockStore;
  let notifierService: NotifierService;
  let stripeProvider: StripeProvider;
  let localizationService: LocalizationService;
  let notifierSpy: jest.SpyInstance;
  let translateSpy: jest.SpyInstance;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        StripeProvider,
        StripeEffects,
        provideMockStore(),
        provideMockActions(() => actions$),
        MockProvider(StripeProvider),
        MockProvider(NotifierService),
        MockProvider(UserFacade, {
          avatar: () => '',
          userType$: of(UserTypeTitles.SHIPYARD),
        } as any),
        MockProvider(LocalizationService, {
          translate: (v) => v,
        } as any),
      ],
    });

    effects = TestBed.inject(StripeEffects);
    store = TestBed.inject(MockStore);
    notifierService = TestBed.inject(NotifierService);
    stripeProvider = TestBed.inject(StripeProvider);
    localizationService = TestBed.inject(LocalizationService);

    notifierSpy = jest.spyOn(notifierService, 'error');
    translateSpy = jest.spyOn(localizationService, 'translate');
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

  it('should load account', async () => {
    const account = {
      test: 'test',
    } as any;

    jest
      .spyOn(stripeProvider, 'getAccount')
      .mockImplementationOnce(() => of(account));

    actions$ = of(stripeActions.loadAccount());

    const response = await lastValueFrom(effects.loadAccount$);
    expect(response).toEqual(stripeActions.loadAccountSuccessful({ account }));
  });

  it('should failure load account', async () => {
    const error = 'Test Error Response';

    jest
      .spyOn(stripeProvider, 'getAccount')
      .mockImplementationOnce(() => throwError(() => error));

    actions$ = of(stripeActions.loadAccount());

    const response = await lastValueFrom(effects.loadAccount$);

    expect(response).toEqual(stripeActions.loadAccountFailure());
    expect(translateSpy).toHaveBeenCalledWith('STRIPE.ERROR.UNEXPECTED');
    expect(notifierSpy).toHaveBeenCalledWith('STRIPE.ERROR.UNEXPECTED');
  });

  it('should load validation errors', async () => {
    const validation: StripeValidation = {
      status: StripeAccountValidationStatus.VALID,
      errors: {},
    };

    jest
      .spyOn(stripeProvider, 'getStripeAccountErrors')
      .mockImplementationOnce(() => of({}));

    actions$ = of(stripeActions.loadValidationErrors());

    const response = await lastValueFrom(effects.loadValidationErrors$);
    expect(response).toEqual(
      stripeActions.loadValidationErrorsSuccess({ validation })
    );
  });

  it.skip('should fail validation errors', async () => {
    jest
      .spyOn(stripeProvider, 'getStripeAccountErrors')
      .mockImplementationOnce(() => throwError(() => 'Error'));

    actions$ = of(stripeActions.loadValidationErrors());

    const response = await lastValueFrom(effects.loadValidationErrors$);
    expect(response).toEqual(stripeActions.loadValidationErrorsFailure());
  });

  it('should load cards', async () => {
    const cards = [{ id: 'test' }, { id: 'test' }] as any;

    jest
      .spyOn(stripeProvider, 'getDebitCards')
      .mockImplementationOnce(() => of(cards));

    actions$ = of(stripeActions.loadCards());

    const response = await lastValueFrom(effects.loadCards$);
    expect(response).toEqual(
      stripeActions.loadCardsSuccess({
        cards,
      })
    );
  });

  it('should fail load cards', async () => {
    jest
      .spyOn(stripeProvider, 'getDebitCards')
      .mockImplementationOnce(() => throwError(() => 'Error'));

    actions$ = of(stripeActions.loadCards());

    const response = await lastValueFrom(effects.loadCards$);
    expect(response).toEqual(stripeActions.loadCardsFailure());
    expect(translateSpy).toHaveBeenCalledWith('STRIPE.ERROR.UNEXPECTED');
    expect(notifierSpy).toHaveBeenCalledWith('STRIPE.ERROR.UNEXPECTED');
  });

  it('should load bank accounts', async () => {
    const banks = [{ id: 'test' }, { id: 'test' }] as any;

    jest
      .spyOn(stripeProvider, 'getBankAccounts')
      .mockImplementationOnce(() => of(banks));

    actions$ = of(stripeActions.loadBanks());

    const response = await lastValueFrom(effects.loadBanksAccounts$);
    expect(response).toEqual(
      stripeActions.loadBanksSuccess({
        banks,
      })
    );
  });

  it('should fail load bank accounts', async () => {
    jest
      .spyOn(stripeProvider, 'getBankAccounts')
      .mockImplementationOnce(() => throwError(() => 'Error'));

    actions$ = of(stripeActions.loadBanks());

    const response = await lastValueFrom(effects.loadBanksAccounts$);
    expect(response).toEqual(stripeActions.loadBanksFailure());
    expect(translateSpy).toHaveBeenCalledWith('STRIPE.ERROR.UNEXPECTED');
    expect(notifierSpy).toHaveBeenCalledWith('STRIPE.ERROR.UNEXPECTED');
  });

  it.each([StripeProviderMethod.CREATE, StripeProviderMethod.EDIT])(
    'should create / path account properly (%s)',
    async (method) => {
      const spy = jest.spyOn(stripeActions, 'createStripeAccountSuccess');

      const account = {
        test: 'test',
      } as any;

      store.setState({
        [STRIPE_FEATURE_KEY]: {
          account: null,
        },
      });

      store.refreshState();

      const validation: StripeValidation = {
        status: StripeAccountValidationStatus.VALID,
        errors: {},
      };

      jest
        .spyOn(stripeProvider, method)
        .mockImplementationOnce(() => of(account));

      jest
        .spyOn(stripeProvider, 'getStripeAccountErrors')
        .mockImplementationOnce(() => of({}));

      actions$ = of(
        stripeActions.createStripeAccount({ account, method: method as any })
      );

      const response = await lastValueFrom(effects.createStripeAccount$);

      expect(spy).toHaveBeenCalledWith({ account });
      expect(response).toEqual(
        stripeActions.loadValidationErrorsSuccess({
          validation,
        })
      );
    }
  );

  it.each([StripeProviderMethod.CREATE, StripeProviderMethod.EDIT])(
    'should fail create / path account (%s)',
    async (method) => {
      const account = {
        test: 'test',
      } as any;

      jest
        .spyOn(stripeProvider, method)
        .mockImplementationOnce(() => throwError(() => 'Error'));

      actions$ = of(
        stripeActions.createStripeAccount({ account, method: method as any })
      );

      const response = await lastValueFrom(effects.createStripeAccount$);
      expect(response).toEqual(stripeActions.createStripeAccountFailure());
      expect(translateSpy).toHaveBeenCalledWith('STRIPE.ERROR.UNEXPECTED');
      expect(notifierSpy).toHaveBeenCalledWith('STRIPE.ERROR.UNEXPECTED');
    }
  );

  it('should create bank account', async () => {
    const spy = jest.spyOn(stripeActions, 'createBankAccountSuccess');

    const bankAccount = {
      test: 'test',
    } as any;

    jest
      .spyOn(stripeProvider, 'attachBankAccount')
      .mockImplementationOnce(() => of(bankAccount));

    actions$ = of(stripeActions.createBankAccount({ bankAccount }));

    const response = await lastValueFrom(effects.createBankAccount$);
    expect(spy).toHaveBeenCalled();
    expect(response).toEqual(stripeActions.loadBanks());
  });

  it('should fail create bank account', async () => {
    const bankAccount = {
      test: 'test',
    } as any;

    jest
      .spyOn(stripeProvider, 'attachBankAccount')
      .mockImplementationOnce(() => throwError(() => 'Error'));

    actions$ = of(stripeActions.createBankAccount({ bankAccount }));

    const response = await lastValueFrom(effects.createBankAccount$);
    expect(response).toEqual(stripeActions.createBankAccountFailure());
    expect(translateSpy).toHaveBeenCalledWith('STRIPE.ERROR.UNEXPECTED');
    expect(notifierSpy).toHaveBeenCalledWith('STRIPE.ERROR.UNEXPECTED');
  });

  it('should create debit card', async () => {
    const spy = jest.spyOn(stripeActions, 'createDebitCardSuccess');

    const debitCard = {
      test: 'test',
    } as any;

    jest
      .spyOn(stripeProvider, 'attachDebitCard')
      .mockImplementationOnce(() => of(debitCard));

    actions$ = of(stripeActions.createDebitCard({ debitCard }));

    const response = await lastValueFrom(effects.createDebitCard$);
    expect(spy).toHaveBeenCalled();
    expect(response).toEqual(stripeActions.loadCards());
  });

  it('should fail create debit card', async () => {
    const debitCard = {
      test: 'test',
    } as any;

    jest
      .spyOn(stripeProvider, 'attachDebitCard')
      .mockImplementationOnce(() => throwError(() => 'Error'));

    actions$ = of(stripeActions.createDebitCard({ debitCard }));

    const response = await lastValueFrom(effects.createDebitCard$);
    expect(response).toEqual(stripeActions.createDebitCardFailure());
    expect(translateSpy).toHaveBeenCalledWith('STRIPE.ERROR.UNEXPECTED');
    expect(notifierSpy).toHaveBeenCalledWith('STRIPE.ERROR.UNEXPECTED');
  });

  it('should mark debit card as default', async () => {
    const spy = jest.spyOn(stripeActions, 'markDebitCardAsDefaultSuccessful');
    const id = 'test';

    jest
      .spyOn(stripeProvider, 'makeDebitCardAsDefault')
      .mockImplementationOnce(() => of(undefined));

    actions$ = of(stripeActions.markDebitCardAsDefault({ id }));

    const response = await lastValueFrom(effects.markDebitCardAsDefault$);
    expect(spy).toHaveBeenCalled();
    expect(response).toEqual(stripeActions.loadCards());
  });

  it('should fail mark debit card as default', async () => {
    const id = 'test';

    jest
      .spyOn(stripeProvider, 'makeDebitCardAsDefault')
      .mockImplementationOnce(() => throwError(() => 'Error'));

    actions$ = of(stripeActions.markDebitCardAsDefault({ id }));

    const response = await lastValueFrom(effects.markDebitCardAsDefault$);
    expect(response).toEqual(stripeActions.markDebitCardAsDefaultFailure());
    expect(translateSpy).toHaveBeenCalledWith('STRIPE.ERROR.UNEXPECTED');
    expect(notifierSpy).toHaveBeenCalledWith('STRIPE.ERROR.UNEXPECTED');
  });

  it('should mark bank account as default', async () => {
    const spy = jest.spyOn(stripeActions, 'markBankAccountAsDefaultSuccessful');
    const id = 'test';

    jest
      .spyOn(stripeProvider, 'makeBankAccountAsDefault')
      .mockImplementationOnce(() => of(undefined));

    actions$ = of(stripeActions.markBankAccountAsDefault({ id }));

    const response = await lastValueFrom(effects.markBankAccountAsDefault$);
    expect(spy).toHaveBeenCalled();
    expect(response).toEqual(stripeActions.loadBanks());
  });

  it('should fail mark bank account as default', async () => {
    const id = 'test';

    jest
      .spyOn(stripeProvider, 'makeBankAccountAsDefault')
      .mockImplementationOnce(() => throwError(() => 'Error'));

    actions$ = of(stripeActions.markBankAccountAsDefault({ id }));

    const response = await lastValueFrom(effects.markBankAccountAsDefault$);
    expect(response).toEqual(stripeActions.markBankAccountAsDefaultFailure());
    expect(translateSpy).toHaveBeenCalledWith('STRIPE.ERROR.UNEXPECTED');
    expect(notifierSpy).toHaveBeenCalledWith('STRIPE.ERROR.UNEXPECTED');
  });

  it('should delete debit card', async () => {
    const spy = jest.spyOn(stripeActions, 'deleteDebitCardSuccessful');
    const id = 'test';

    jest
      .spyOn(stripeProvider, 'deleteDebitCard')
      .mockImplementationOnce(() => of(undefined));

    actions$ = of(stripeActions.deleteDebitCard({ id }));

    const response = await lastValueFrom(effects.deleteDebitCard$);
    expect(spy).toHaveBeenCalled();
    expect(response).toEqual(stripeActions.loadCards());
  });

  it('should fail delete debit card', async () => {
    const id = 'test';

    jest
      .spyOn(stripeProvider, 'deleteDebitCard')
      .mockImplementationOnce(() => throwError(() => 'Error'));

    actions$ = of(stripeActions.deleteDebitCard({ id }));

    const response = await lastValueFrom(effects.deleteDebitCard$);
    expect(response).toEqual(stripeActions.deleteDebitCardFailure());
    expect(translateSpy).toHaveBeenCalledWith('STRIPE.ERROR.UNEXPECTED');
    expect(notifierSpy).toHaveBeenCalledWith('STRIPE.ERROR.UNEXPECTED');
  });

  it('should delete bank account', async () => {
    const spy = jest.spyOn(stripeActions, 'deleteBankAccountSuccessful');
    const id = 'test';

    jest
      .spyOn(stripeProvider, 'deleteBankAccount')
      .mockImplementationOnce(() => of(undefined));

    actions$ = of(stripeActions.deleteBankAccount({ id }));

    const response = await lastValueFrom(effects.deleteBankAccount$);
    expect(spy).toHaveBeenCalled();
    expect(response).toEqual(stripeActions.loadBanks());
  });

  it('should fail delete bank account', async () => {
    const id = 'test';

    jest
      .spyOn(stripeProvider, 'deleteBankAccount')
      .mockImplementationOnce(() => throwError(() => 'Error'));

    actions$ = of(stripeActions.deleteBankAccount({ id }));

    const response = await lastValueFrom(effects.deleteBankAccount$);
    expect(response).toEqual(stripeActions.deleteBankAccountFailure());
    expect(translateSpy).toHaveBeenCalledWith('STRIPE.ERROR.UNEXPECTED');
    expect(notifierSpy).toHaveBeenCalledWith('STRIPE.ERROR.UNEXPECTED');
  });
});
