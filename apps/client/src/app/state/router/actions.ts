import { NgrxRoute } from './state';
import { Action } from '@ngrx/store';

export enum RouterActionTypes {
  Go = '[Router] Go',
  Back = '[Router] Back',
  Forward = '[Router] Forward'
}

export class Go implements Action {
  readonly type = RouterActionTypes.Go;
  constructor(public payload: { to: NgrxRoute }) { }
}

export class Back implements Action {
  readonly type = RouterActionTypes.Back;
  constructor() { }
}

export class Forward implements Action {
  readonly type = RouterActionTypes.Forward;
  constructor() { }
}

export type RouterActions = Go | Back | Forward;

export const fromRouterActions = {
  Go,
  Back,
  Forward
};
