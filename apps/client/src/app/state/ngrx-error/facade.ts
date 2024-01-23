import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import * as ErrorActions from './actions';
import { ErrorState } from './state';

@Injectable({ providedIn: 'root' })
export class ErrorFacade {
  constructor(private store: Store<ErrorState>) { }

  throw401Error(error: HttpErrorResponse) {
    this.store.dispatch(new ErrorActions.Throw401Error(error));
  }

  throw404Error(error: HttpErrorResponse) {
    this.store.dispatch(new ErrorActions.Throw404Error(error));
  }
}
