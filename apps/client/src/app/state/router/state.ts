import { NavigationExtras, Params } from '@angular/router';
import { RouterReducerState } from '@ngrx/router-store';

export const KEY = 'router';

export interface RouterStateUrl {
  route: string;
  url: string;
  queryParams: Params;
  params: Params;
  data?: any;
}

export interface State {
  navigationId: number;
  state: RouterStateUrl;
}

export interface NgrxRoute {
  path: any[];
  query?: object;
  extras?: NavigationExtras;
}

export type RouterStateType = RouterReducerState<RouterStateUrl>;
