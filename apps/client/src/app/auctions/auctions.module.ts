// tslint:disable: nx-enforce-module-boundaries
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BasicLayoutModule, LayoutComponentsModule } from '@ocean/layout';
import { MatDataSourceModule } from '@ocean/material';
import { SharedDirectivesModule } from '@ocean/shared/directives/directives.module';
import { SharedFormsModule } from '@ocean/shared/forms/forms.module'
import { SumArrayValuesPipe } from '@ocean/shared/pipes/sum-array-values.pipe';
import { AppComponentsModule } from '../common';
import { AppFormsModule } from '../common/forms';

import { AuctionsComponents, AuctionsEntryComponents } from './auctions.barrel';
import { AuctionsImports } from './auctions.imports';
import { routes } from './auctions.routing';
import { MatSelectCountryModule } from '@angular-material-extensions/select-country';
import { LibsFormBuilderModule } from '@ocean/libs/form-builder';
import { DocumentsModule } from '@ocean/documents';

@NgModule({
  imports: [
    CommonModule,
    BasicLayoutModule,
    LayoutComponentsModule,
    MatDataSourceModule,
    AppComponentsModule,
    SharedDirectivesModule,
    SharedFormsModule,
    AppFormsModule,
    ...AuctionsImports,
    RouterModule.forChild(routes),
    MatSelectCountryModule,
    LibsFormBuilderModule,
    DocumentsModule.forChild(),
  ],
  declarations: AuctionsComponents,
  entryComponents: AuctionsEntryComponents,
  providers: [SumArrayValuesPipe]
})
export class AuctionsModule { }
