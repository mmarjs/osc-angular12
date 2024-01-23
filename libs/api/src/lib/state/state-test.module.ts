import { CommonModule } from '@angular/common';
import {
  ModuleWithProviders,
  NgModule,
  Optional,
  SkipSelf
} from '@angular/core';

import { SystemFacade, SystemTestFacade } from './system';
import { UserFacade, UserTestFacade } from './user';

@NgModule({
  imports: [CommonModule]
})
export class ApiStateTestModule {
  constructor(
    @Optional()
    @SkipSelf()
    parent: ApiStateTestModule
  ) {
    if (parent) {
      throw new Error('ApiStateTestModule is already loaded.');
    }
  }

  static forParent(): ModuleWithProviders[] {
    return [
      {
        ngModule: ApiStateTestModule,
        providers: [
          { provide: UserFacade, useClass: UserTestFacade },
          { provide: SystemFacade, useClass: SystemTestFacade }
        ]
      }
    ];
  }
}
