import { ComponentsModule } from '@ocean/components';
// tslint:disable: nx-enforce-module-boundaries
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppComponentsModule } from '@ocean/client/common';
import { AppFormsModule } from '@ocean/client/common/forms';
import { LayoutComponentsModule } from '@ocean/layout';
import { MatDataSourceModule } from '@ocean/material';
import { SharedDirectivesModule, SharedFormsModule } from '@ocean/shared';

import { SurveyorsComponents, SurveyorsExports } from './surveyors.barrel';
import { SurveyorsImports } from './surveyors.imports';

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
    ...SurveyorsImports
  ],
  exports: [RouterModule, ...SurveyorsExports],
  declarations: SurveyorsComponents
})
export class SurveyorsModule { }
