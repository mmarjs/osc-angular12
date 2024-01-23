import { CommonModule } from '@angular/common';
import {
  ModuleWithProviders,
  NgModule,
  Optional,
  SkipSelf
} from '@angular/core';

import { RouterFacade, RouterTestFacade } from './router';

@NgModule({
  imports: [CommonModule]
})
export class AppStateTestModule {
  constructor(
    @Optional()
    @SkipSelf()
    parent: AppStateTestModule
  ) {
    if (parent) {
      throw new Error('AppStateTestModule is already loaded.');
    }
  }

  static forParent(): (any[] | ModuleWithProviders<{}>)[] {
    return [
      {
        ngModule: AppStateTestModule,
        providers: [{ provide: RouterFacade, useClass: RouterTestFacade }]
      }
    ];
  }
}
