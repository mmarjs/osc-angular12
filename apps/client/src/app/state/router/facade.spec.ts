import { APP_BASE_HREF } from '@angular/common';
import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { readFirst } from '@nrwl/angular/testing';

import { EffectsModule } from '@ngrx/effects';
import {
  NavigationActionTiming,
  ROUTER_NAVIGATION,
  StoreRouterConnectingModule,
} from '@ngrx/router-store';
import { Store, StoreModule } from '@ngrx/store';

import { NxModule } from '@nrwl/angular';

import { RouterFacade } from './facade';

import { reducers } from '../reducers';
import { RouterSerializer } from './serializer';
import { KEY } from './state';
import { PartialState } from './state.partial';

describe('RouterFacade', () => {
  let facade: RouterFacade;
  let store: Store<PartialState>;

  beforeEach(() => {});

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [
          RouterModule.forRoot([]),
          NxModule.forRoot(),
          StoreModule.forRoot(reducers),
          EffectsModule.forRoot([]),
          StoreRouterConnectingModule.forRoot({
            stateKey: KEY,
            serializer: RouterSerializer,
            navigationActionTiming: NavigationActionTiming.PostActivation,
          }),
        ],
        providers: [{ provide: APP_BASE_HREF, useValue: '/' }, RouterFacade],
      })
      class RootModule {}
      TestBed.configureTestingModule({ imports: [RootModule] });

      store = TestBed.get(Store);
      facade = TestBed.get(RouterFacade);
    });

    /**
     * Use `SessionLoaded` to manually submit list for state management
     */
    it('url$ should return the loaded url', async () => {
      let url = await readFirst(facade.url$ as any);

      const payload = {
        routerState: {
          url: '/',
          params: {},
          queryParams: {},
        },
        event: {
          id: 1,
          url: '/',
          urlAfterRedirects: '/',
          state: {
            url: '/',
            params: {},
            queryParams: {},
          },
        },
      };
      store.dispatch({ type: ROUTER_NAVIGATION, payload });

      url = await readFirst(facade.url$ as any);

      expect(url).toBe('/');
    });
  });
});
