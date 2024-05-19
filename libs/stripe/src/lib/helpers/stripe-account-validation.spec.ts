import {
  ACCOUNT_NOT_CONNECTED_ERROR,
  stripeAccountValidation,
  StripeAccountValidationStatus,
  toStripeValidationResult,
} from './stripe-account-validation';
import { lastValueFrom, of, throwError } from 'rxjs';
import { UserTypeTitles } from '@ocean/api/shared';
import { UserFacade } from '@ocean/api/state';
import { StripeProvider } from '@ocean/api/services';

describe('toStripeValidationResult', () => {
  it.each([
    StripeAccountValidationStatus.UNINITIALIZED,
    StripeAccountValidationStatus.NOT_CREATED,
    StripeAccountValidationStatus.PROCEED,
    StripeAccountValidationStatus.VALID,
  ])(`should normalize to stripe validation result (value: %s)`, (type) => {
    expect(
      toStripeValidationResult(type, { custom_error_name: 'test' })
    ).toEqual({
      status: type,
      errors: { custom_error_name: 'test' },
    });
  });
});

describe('stripeAccountValidation', () => {
  let userFacade: UserFacade;
  let stripeProvider: StripeProvider;

  beforeEach(() => {
    userFacade = {
      userType$: of(UserTypeTitles.BOAT_OWNER),
    } as UserFacade;

    stripeProvider = {
      getStripeAccountErrors: () => of(undefined),
    } as StripeProvider;
  });

  it.each([undefined, null])(
    `should return UNINITIALIZED response (%s)`,
    async (type) => {
      stripeProvider.getStripeAccountErrors = () => of(type);

      const response = await lastValueFrom(
        stripeAccountValidation(userFacade, stripeProvider)
      );

      expect(response).toEqual({
        status: StripeAccountValidationStatus.UNINITIALIZED,
        errors: type,
      });
    }
  );

  it(`should return UNINITIALIZED response`, async () => {
    stripeProvider.getStripeAccountErrors = () => throwError(() => 'Error');

    const response = await lastValueFrom(
      stripeAccountValidation(userFacade, stripeProvider)
    );

    expect(response).toEqual({
      status: StripeAccountValidationStatus.UNINITIALIZED,
      errors: undefined,
    });
  });

  it.each([UserTypeTitles.BOAT_OWNER, UserTypeTitles.ADMIN])(
    `should return VALID response (%s)`,
    async (type) => {
      userFacade.userType$ = of(type);
      stripeProvider.getStripeAccountErrors = () =>
        of({ [ACCOUNT_NOT_CONNECTED_ERROR]: 'test' });

      const response = await lastValueFrom(
        stripeAccountValidation(userFacade, stripeProvider)
      );

      expect(response).toEqual({
        status: StripeAccountValidationStatus.VALID,
        errors: {
          [ACCOUNT_NOT_CONNECTED_ERROR]: 'test',
        },
      });
    }
  );

  it.each([UserTypeTitles.SURVEYOR, UserTypeTitles.SHIPYARD])(
    `should return NOT_CREATED response (%s)`,
    async (type) => {
      userFacade.userType$ = of(type);
      stripeProvider.getStripeAccountErrors = () =>
        of({ [ACCOUNT_NOT_CONNECTED_ERROR]: 'test' });

      const response = await lastValueFrom(
        stripeAccountValidation(userFacade, stripeProvider)
      );

      expect(response).toEqual({
        status: StripeAccountValidationStatus.NOT_CREATED,
        errors: {
          [ACCOUNT_NOT_CONNECTED_ERROR]: 'test',
        },
      });
    }
  );

  it.each([UserTypeTitles.SURVEYOR, UserTypeTitles.SHIPYARD])(
    `should return PROCEED response (%s)`,
    async (type) => {
      userFacade.userType$ = of(type);
      stripeProvider.getStripeAccountErrors = () =>
        of({ test_error_msg: 'test' });

      const response = await lastValueFrom(
        stripeAccountValidation(userFacade, stripeProvider)
      );

      expect(response).toEqual({
        status: StripeAccountValidationStatus.PROCEED,
        errors: {
          test_error_msg: 'test',
        },
      });
    }
  );
});
