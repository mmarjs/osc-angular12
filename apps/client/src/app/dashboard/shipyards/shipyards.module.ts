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

import { ShipyardsComponents, ShipyardsExports } from './shipyards.barrel';
import { ShipyardsImports } from './shipyards.imports';
import { LibsFormBuilderModule } from '@ocean/libs/form-builder';

@NgModule({
  imports: [
    CommonModule,
    LayoutComponentsModule,
    MatDataSourceModule,
    SharedDirectivesModule,
    SharedFormsModule,
    AppFormsModule,
    LibsFormBuilderModule,
    AppComponentsModule,
    ComponentsModule,
    ...ShipyardsImports
  ],
  exports: [RouterModule, ...ShipyardsExports],
  declarations: ShipyardsComponents
})
export class ShipyardsModule { }
