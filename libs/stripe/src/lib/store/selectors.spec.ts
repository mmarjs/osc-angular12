import { TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { STRIPE_FEATURE_KEY } from './state';
import { StripeAccountValidationStatus } from '../helpers/stripe-account-validation';
import {
  selectAccount,
  selectBanks,
  selectCards,
  selectLoading,
  selectValidationErrors,
} from './selectors';
import { firstValueFrom } from 'rxjs';

const account = {
  test: 'account',
};

const validation = {
  status: StripeAccountValidationStatus.PROCEED,
  errors: {
    error: 'test',
  },
};

const cards = [
  {
    id: '1',
  },
  {
    id: '2',
  },
];

const banks = [
  {
    id: '1',
  },
  {
    id: '2',
  },
  {
    id: '3',
  },
];

describe('Stripe Selectors Tests', () => {
  let store: MockStore;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideMockStore({
          initialState: {
            [STRIPE_FEATURE_KEY]: {
              loading: true,
              account,
              validation,
              cards,
              banks,
            },
          },
        }),
      ],
    });

    store = TestBed.inject(MockStore);
  });

  it('should select loading properly', async () => {
    const result = await firstValueFrom(store.select(selectLoading));
    expect(result).toEqual(true);
  });

  it('should select account properly', async () => {
    const result = await firstValueFrom(store.select(selectAccount));
    expect(result).toEqual(account);
  });

  it('should select validation properly', async () => {
    const result = await firstValueFrom(store.select(selectValidationErrors));
    expect(result).toEqual(validation);
  });

  it('should select cards properly', async () => {
    const result = await firstValueFrom(store.select(selectCards));
    expect(result).toEqual(cards);
    expect(result).toHaveLength(2);
  });

  it('should select banks properly', async () => {
    const result = await firstValueFrom(store.select(selectBanks));
    expect(result).toEqual(banks);
    expect(result).toHaveLength(3);
  });
});
