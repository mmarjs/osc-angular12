import { TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { ProceedActionFor, StripeFacadeService } from './facade';
import { stripeActions } from './actions';
import { FormBuilder } from '@angular/forms';
import { StripeProviderMethod } from '@ocean/api/services';
import { createStripeAccount } from '@ocean/api/shared';
import { STRIPE_DETAILS_EXIT_TYPE } from '../shared/types';
import { STRIPE_FEATURE_KEY } from './state';
import { firstValueFrom } from 'rxjs';

describe('Stripe Facade Tests', () => {
  let store: MockStore;
  let service: StripeFacadeService;
  let spy: jest.SpyInstance;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideMockStore()],
    });

    store = TestBed.inject(MockStore);
    service = TestBed.inject(StripeFacadeService);
    spy = jest.spyOn(store, 'dispatch');
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get cards properly', async () => {
    const cards = [{ id: 'test' }, { id: 'test-2' }];

    store.setState({
      [STRIPE_FEATURE_KEY]: {
        cards,
      },
    });

    store.refreshState();
    const value = await firstValueFrom(service.cards$);

    expect(value).toEqual(cards);
  });

  it('should get banks properly', async () => {
    const banks = [{ id: 'test' }, { id: 'test-2' }];

    store.setState({
      [STRIPE_FEATURE_KEY]: {
        banks,
      },
    });

    store.refreshState();
    const value = await firstValueFrom(service.banks$);

    expect(value).toEqual(banks);
  });

  it('should get loading properly', async () => {
    const loading = true;

    store.setState({
      [STRIPE_FEATURE_KEY]: {
        loading,
      },
    });

    store.refreshState();
    const value = await firstValueFrom(service.loading$);

    expect(value).toEqual(loading);
  });

  it('should get account properly', async () => {
    const account = {
      test: 'test',
    };

    store.setState({
      [STRIPE_FEATURE_KEY]: {
        account,
      },
    });

    store.refreshState();
    const value = await firstValueFrom(service.account$);

    expect(value).toEqual(account);
  });

  it('should get validation properly', async () => {
    const validation = {
      test: 'test',
    };

    store.setState({
      [STRIPE_FEATURE_KEY]: {
        validation,
      },
    });

    store.refreshState();
    const value = await firstValueFrom(service.validationErrors$);

    expect(value).toEqual(validation);
  });

  it.each(['loadAccount', 'loadValidationErrors', 'loadCards', 'loadBanks'])(
    'should call %s',
    (type) => {
      service[type]();
      expect(spy).toHaveBeenCalledWith(stripeActions[type]());
    }
  );

  it.each([StripeProviderMethod.CREATE, StripeProviderMethod.EDIT])(
    'should call createAccount with %s',
    (method) => {
      const fb = new FormBuilder();
      const form = fb.group({});
      const account = createStripeAccount(form);

      service.createAccount(account, method as any);
      expect(spy).toHaveBeenCalledWith(
        stripeActions.createStripeAccount({ account, method: method as any })
      );
    }
  );

  it('should call createDebitCard', () => {
    const card = {
      test: 'test',
    } as any;

    service.createDebitCard(card);
    expect(spy).toHaveBeenCalledWith(
      stripeActions.createDebitCard({
        debitCard: card,
      })
    );
  });

  it('should call createBankAccount', () => {
    const bank = {
      test: 'test',
    } as any;

    service.createBankAccount(bank);
    expect(spy).toHaveBeenCalledWith(
      stripeActions.createBankAccount({
        bankAccount: bank,
      })
    );
  });

  it.each([
    null,
    undefined,
    { id: null, status: '' },
    { id: '', status: null },
  ])('should return undefined proceedAction', (value) => {
    service.proceedAction(ProceedActionFor.CARDS, value as any);
    expect(spy).not.toHaveBeenCalled();

    service.proceedAction(ProceedActionFor.BANKS, value as any);
    expect(spy).not.toHaveBeenCalled();
  });

  it.each([STRIPE_DETAILS_EXIT_TYPE.MARK, STRIPE_DETAILS_EXIT_TYPE.DELETE])(
    'should call proper method for %s',
    (action) => {
      service.proceedAction(ProceedActionFor.CARDS, {
        id: 'test',
        status: action,
      });

      const event =
        action === STRIPE_DETAILS_EXIT_TYPE.MARK
          ? 'markDebitCardAsDefault'
          : 'deleteDebitCard';

      expect(spy).toHaveBeenCalledWith(
        stripeActions[event]({
          id: 'test',
        })
      );
    }
  );

  it.each([STRIPE_DETAILS_EXIT_TYPE.MARK, STRIPE_DETAILS_EXIT_TYPE.DELETE])(
    'should call proper method for %s',
    (action) => {
      service.proceedAction(ProceedActionFor.BANKS, {
        id: 'test',
        status: action,
      });

      const event =
        action === STRIPE_DETAILS_EXIT_TYPE.MARK
          ? 'markBankAccountAsDefault'
          : 'deleteBankAccount';

      expect(spy).toHaveBeenCalledWith(
        stripeActions[event]({
          id: 'test',
        })
      );
    }
  );
});
