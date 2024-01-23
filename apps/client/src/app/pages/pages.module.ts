// tslint:disable: nx-enforce-module-boundaries
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BasicLayoutModule, LayoutComponentsModule } from '@ocean/layout';
import { SharedFormsModule } from '@ocean/shared';
import { AppComponentsModule } from '../common';

import { PagesComponents, PagesEntryComponents } from './pages.barrel';
import { PagesImports } from './pages.imports';
import { coreRoutes } from './pages.routing';

@NgModule({
  imports: [
    CommonModule,
    BasicLayoutModule,
    SharedFormsModule,
    LayoutComponentsModule,
    ...PagesImports,
    RouterModule.forChild(coreRoutes),
    AppComponentsModule
  ],
  declarations: PagesComponents,
  entryComponents: PagesEntryComponents
})
export class PagesModule { }
