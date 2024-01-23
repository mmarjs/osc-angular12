import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedDirectivesModule } from '@ocean/shared';

import {
  BasicComponents,
  BasicEntryComponents,
  BasicExports
} from './basic.barrel';
import { BasicImports } from './basic.imports';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    SharedDirectivesModule,
    ...BasicImports
  ],
  declarations: BasicComponents,
  entryComponents: BasicEntryComponents,
  exports: BasicExports
})
export class BasicLayoutModule {}
