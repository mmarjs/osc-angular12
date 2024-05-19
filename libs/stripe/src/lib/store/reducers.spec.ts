import { stripeActions } from './actions';
import { stripeReducer } from './reducers';
import { StripeAccountValidationStatus } from '../helpers/stripe-account-validation';

describe('Stripe Reducers Tests', () => {
  it.each([
    'loadAccount',
    'loadValidationErrors',
    'loadCards',
    'loadBanks',
    'createStripeAccount',
    'createDebitCard',
    'createBankAccount',
    'markBankAccountAsDefault',
    'markBankAccountAsDefault',
    'markDebitCardAsDefault',
    'deleteDebitCard',
    'deleteBankAccount',
  ])('should set loading to true (%s)', (type) => {
    const result = stripeReducer(
      {
        loading: false,
        cards: [],
        banks: [],
      },
      stripeActions[type]
    );

    expect(result).toEqual({
      loading: true,
      cards: [],
      banks: [],
    });
  });

  it.each([
    'loadCardsFailure',
    'loadBanksFailure',
    'createStripeAccountFailure',
    'createDebitCardSuccess',
    'createDebitCardFailure',
    'createBankAccountSuccess',
    'createBankAccountFailure',
    'markDebitCardAsDefaultSuccessful',
    'markDebitCardAsDefaultFailure',
    'markBankAccountAsDefaultSuccessful',
    'markBankAccountAsDefaultFailure',
    'deleteDebitCardSuccessful',
    'deleteDebitCardFailure',
    'deleteBankAccountSuccessful',
    'deleteBankAccountFailure',
    'loadValidationErrorsFailure',
    'loadAccountFailure',
  ])('should set proper loading to false (%s)', (type) => {
    const result = stripeReducer(
      {
        loading: true,
        cards: [],
        banks: [],
      },
      stripeActions[type]
    );

    expect(result).toEqual({
      loading: false,
      cards: [],
      banks: [],
    });
  });

  it.each(['createStripeAccountSuccess', 'loadAccountSuccessful'])(
    'should set proper account properly (%s)',
    (type) => {
      const account = {
        test: 'test',
      };

      const result = stripeReducer(
        {
          loading: true,
          cards: [],
          banks: [],
        },
        stripeActions[type]({
          account,
        })
      );

      expect(result).toEqual({
        loading: false,
        cards: [],
        banks: [],
        account,
      });
    }
  );

  it('should set cards properly', () => {
    const cards = [
      {
        id: 'test',
      },
      {
        id: 'test-2',
      },
    ] as any;

    const result = stripeReducer(
      {
        loading: true,
        cards: [],
        banks: [],
      },
      stripeActions.loadCardsSuccess({ cards })
    );

    expect(result).toEqual({
      loading: false,
      banks: [],
      cards,
    });
  });

  it('should set banks properly', () => {
    const banks = [
      {
        id: 'test',
      },
      {
        id: 'test-2',
      },
    ] as any;

    const result = stripeReducer(
      {
        loading: true,
        cards: [],
        banks: [],
      },
      stripeActions.loadBanksSuccess({ banks })
    );

    expect(result).toEqual({
      loading: false,
      cards: [],
      banks,
    });
  });

  it('should set validation properly', () => {
    const validation = {
      status: StripeAccountValidationStatus.PROCEED,
      errors: {},
    };

    const result = stripeReducer(
      {
        loading: true,
        cards: [],
        banks: [],
      },
      stripeActions.loadValidationErrorsSuccess({ validation })
    );

    expect(result).toEqual({
      loading: false,
      cards: [],
      banks: [],
      validation,
    });
  });
});
