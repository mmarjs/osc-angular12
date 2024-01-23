import { Component, OnDestroy } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, of, tap, zip } from 'rxjs';
import { take } from 'rxjs/operators';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { PATHS } from '@ocean/shared';
import { UserFacade } from '@ocean/api/state';
import { StripeProvider, StripeProviderMethod } from '@ocean/api/services';
import { UserTypeTitles } from '@ocean/api/shared';

export enum StripeAccountState {
  UNINITIALIZED = 'UNINITIALIZED',
  NOT_CREATED = 'NOT_CREATED',
  PROCEED = 'PROCEED',
  VALID = 'VALID',
}

const ACCOUNT_NOT_CONNECTED_ERROR = 'account_not_present';

@Component({
  selector: 'app-stripe-account-guard',
  templateUrl: './stripe-account-guard.component.html',
  styleUrls: ['./stripe-account-guard.component.scss']
})
export class StripeAccountGuardComponent implements OnDestroy {
  readonly CREATE_STRIPE_ACCOUNT_URL = `/${PATHS.CREATE_STRIPE_ACCOUNT}`;

  readonly STRIPE_ACCOUNT_STATES = StripeAccountState;
  readonly STRIPE_PROVIDER_METHOD = StripeProviderMethod;

  readonly isLoading$ = new BehaviorSubject<boolean>(true);

  readonly stripeAccountState$ = this.getStripeAccountState()
    .pipe(
      tap(() => this.isLoading$.next(false)),
      map(status => status),
      untilDestroyed(this),
      take(1)
    );

  constructor(
    private readonly userFacade: UserFacade,
    private readonly stripeProvider: StripeProvider,
  ) {
    this.stripeAccountState$.subscribe();
  }

  private getStripeAccountState(): Observable<StripeAccountState> {
    return zip([
      this.userFacade.userType$,
      this.stripeProvider.getStripeAccountErrors(),
    ])
      .pipe(
        catchError(() => of([undefined, undefined])),
        map(([type, errors]) => {
          if (typeof errors !== 'object' || errors === null) {
            return StripeAccountState.UNINITIALIZED;
          }

          const keys = Object.keys(errors);

          if (keys.length && ![UserTypeTitles.BOAT_OWNER, UserTypeTitles.ADMIN].includes(type as UserTypeTitles)) {
            if (keys.includes(ACCOUNT_NOT_CONNECTED_ERROR)) {
              return StripeAccountState.NOT_CREATED;
            } else {
              return StripeAccountState.PROCEED;
            }
          }

          return StripeAccountState.VALID;
        }),
        take(1),
      );
  }

  ngOnDestroy() {
    this.isLoading$.complete();
  }
}
