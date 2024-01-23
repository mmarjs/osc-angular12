import { CommonModule } from '@angular/common';
import {
  ModuleWithProviders,
  NgModule,
  Optional,
  SkipSelf
} from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { effects } from './effects';
import { reducers } from './reducers';
import { initialState, KEY } from './state';
declare module '@angular/core' {
  interface ModuleWithProviders<T = any> {
    ngModule: Type<T>;
    providers?: Provider[];
  }
}
@NgModule({
  imports: [CommonModule]
})

export class ApiStateModule {
  constructor(
    @Optional()
    @SkipSelf()
    parent: ApiStateModule
  ) {
    if (parent) {
      throw new Error('ApiStateModule is already loaded.');
    }
  }

  static forParent(): ModuleWithProviders[] {
    return [
      StoreModule.forFeature(KEY, reducers, { initialState }),
      EffectsModule.forFeature(effects)
    ];
  }
}
