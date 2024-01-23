import { CommonModule } from '@angular/common';
import {
  ModuleWithProviders,
  NgModule,
  Optional,
  SkipSelf
} from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import {
  NavigationActionTiming,
  StoreRouterConnectingModule
} from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../../environments/environment';

import { effects } from './effects';
import { metaReducers, reducers } from './reducers';
import { KEY, RouterFacade, RouterSerializer } from './router';

@NgModule({
  imports: [CommonModule]
})
export class AppStateModule {
  constructor(
    @Optional()
    @SkipSelf()
    parent: AppStateModule
  ) {
    if (parent) {
      throw new Error('AppStateModule is already loaded.');
    }
  }

  static forParent(): (any[] | ModuleWithProviders<{}>)[] {
    return [
      StoreModule.forRoot(reducers, { metaReducers }),
      EffectsModule.forRoot(effects),
      StoreRouterConnectingModule.forRoot({
        stateKey: KEY,
        serializer: RouterSerializer,
        navigationActionTiming: NavigationActionTiming.PostActivation
      }),
      !environment.production ? StoreDevtoolsModule.instrument() : [],
      {
        ngModule: AppStateModule,
        providers: [RouterFacade]
      }
    ];
  }
}
