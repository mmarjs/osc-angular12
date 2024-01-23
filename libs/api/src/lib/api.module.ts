import { CommonModule } from '@angular/common';
import {
  APP_INITIALIZER,
  Inject,
  ModuleWithProviders,
  NgModule,
  Optional,
  SkipSelf
} from '@angular/core';
import { Store } from '@ngrx/store';
import { API_ENVIRONMENT, ApiEnvironment } from '@ocean/api/shared';
import { ApiStateModule, initApplication } from './state';

@NgModule({
  imports: [CommonModule]
})
export class ApiModule {
  constructor(
    @Optional()
    @SkipSelf()
    parent: ApiModule
  ) {
    if (parent) {
      throw new Error('ApiModule is already loaded.');
    }
  }

  static forRoot(
    environment: ApiEnvironment
  ): Array<ModuleWithProviders | ModuleWithProviders[]> {
    return [
      {
        ngModule: ApiModule,
        providers: [
          { provide: API_ENVIRONMENT, useValue: environment },
          {
            provide: APP_INITIALIZER,
            useFactory: initApplication,
            deps: [[new Inject(Store)]],
            multi: true
          }
        ]
      },
      ApiStateModule.forParent()
    ];
  }
}
