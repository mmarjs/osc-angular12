// tslint:disable: nx-enforce-module-boundaries
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppComponentsModule } from '@ocean/client/common';
import { AppFormsModule } from '@ocean/client/common/forms';
import { ComponentsModule } from '@ocean/components';
import { LayoutComponentsModule } from '@ocean/layout';
import { MatDataSourceModule } from '@ocean/material';
import { SharedDirectivesModule, SharedFormsModule } from '@ocean/shared';

import { BoatsComponents, BoatsExports } from './boats.barrel';
import { BoatsImports } from './boats.imports';
import { routes } from './boats.routing';

@NgModule({
  imports: [
    CommonModule,
    LayoutComponentsModule,
    MatDataSourceModule,
    SharedDirectivesModule,
    SharedFormsModule,
    AppFormsModule,
    AppComponentsModule,
    ComponentsModule,
    RouterModule.forChild(routes),
    ...BoatsImports
  ],
  exports: [RouterModule, ...BoatsExports],
  declarations: BoatsComponents
})
export class BoatsModule { }
