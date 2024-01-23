import { createFeatureSelector, createSelector } from '@ngrx/store';
import { KEY, RouterStateUrl, State } from './state';

// Main selector
const getRouterState = createFeatureSelector<State>(KEY);

// Field selectors
const getState = createSelector(
  getRouterState,
  (router: State) => (router ? router.state : ({} as RouterStateUrl))
);

const getRoute = createSelector(
  getRouterState,
  (router: State) => (router ? router.state.route : '')
);

const getUrl = createSelector(
  getRouterState,
  (router: State) => (router ? router.state.url : '')
);

const getQueryParams = createSelector(
  getRouterState,
  (router: State) => (router ? router.state.queryParams : {})
);

const getParams = createSelector(
  getRouterState,
  (router: State) => (router ? router.state.params : '')
);

export const routerQuery = {
  getState,
  getRoute,
  getUrl,
  getQueryParams,
  getParams
};
