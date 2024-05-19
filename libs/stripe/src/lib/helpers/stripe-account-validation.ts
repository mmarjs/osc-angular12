import { catchError, map, Observable, of, zip } from 'rxjs';
import { UserTypeTitles } from '@ocean/api/shared';
import { take } from 'rxjs/operators';
import { UserFacade } from '@ocean/api/state';
import { StripeProvider } from '@ocean/api/services';

export enum StripeAccountValidationStatus {
  UNINITIALIZED = 'UNINITIALIZED',
  NOT_CREATED = 'NOT_CREATED',
  PROCEED = 'PROCEED',
  VALID = 'VALID',
}

export const ACCOUNT_NOT_CONNECTED_ERROR = 'account_not_present';

export interface StripeValidation {
  status: StripeAccountValidationStatus;
  errors?: object;
}

export const toStripeValidationResult = (
  status: StripeAccountValidationStatus,
  errors?: object
) => ({
  status,
  errors,
});

export const stripeAccountValidation = (
  userFacade: UserFacade,
  stripeProvider: StripeProvider
): Observable<StripeValidation> => {
  return zip([
    userFacade.userType$,
    stripeProvider.getStripeAccountErrors(),
  ]).pipe(
    catchError(() => of([undefined, undefined])),
    map(([type, errors]) => {
      if (typeof errors !== 'object' || errors === null) {
        return toStripeValidationResult(
          StripeAccountValidationStatus.UNINITIALIZED,
          errors
        );
      }

      const keys = Object.keys(errors);

      if (
        keys.length &&
        ![UserTypeTitles.BOAT_OWNER, UserTypeTitles.ADMIN].includes(
          type as UserTypeTitles
        )
      ) {
        if (keys.includes(ACCOUNT_NOT_CONNECTED_ERROR)) {
          return toStripeValidationResult(
            StripeAccountValidationStatus.NOT_CREATED,
            errors
          );
        } else {
          return toStripeValidationResult(
            StripeAccountValidationStatus.PROCEED,
            errors
          );
        }
      }

      return toStripeValidationResult(
        StripeAccountValidationStatus.VALID,
        errors
      );
    }),
    take(1)
  );
};
