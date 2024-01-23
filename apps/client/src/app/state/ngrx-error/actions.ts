import { HttpErrorResponse } from '@angular/common/http';
import { Action } from '@ngrx/store';

export enum ErrorActionTypes {
  Throw401Error = '[Error] Throw401Error',
  Throw404Error = '[Error] Throw404Error'
}

export class Throw401Error implements Action {
  readonly type = ErrorActionTypes.Throw401Error;
  constructor(public payload: HttpErrorResponse) { }
}

export class Throw404Error implements Action {
  readonly type = ErrorActionTypes.Throw404Error;
  constructor(public payload: HttpErrorResponse) { }
}

export type ErrorAction = Throw401Error | Throw404Error;

export const fromErrorActions = {
  Throw401Error,
  Throw404Error
};
