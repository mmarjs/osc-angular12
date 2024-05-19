// tslint:disable: nx-enforce-module-boundaries
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';
import { RouterModule } from '@angular/router';
import { BasicLayoutModule, LayoutComponentsModule } from '@ocean/layout';
import { SharedModule } from '@ocean/shared';
import { ToastrModule } from 'ngx-toastr';
import { AppComponentsModule } from '../common';
import { BoatsModule } from './boats';
import { ShipyardsModule } from './shipyards';
import { SurveyorsModule } from './surveyors';
import {
  DashboardComponents,
  DashboardEntryComponents,
} from './dashboard.barrel';
import { DashboardImports } from './dashboard.imports';
import { routes } from './dashboard.routing';
import { AppFormsModule } from '../common/forms';
import { BarRatingModule } from 'ngx-bar-rating';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import { SharedBidsComponentsModule } from '../common/components/shared-bids-components/shared-bids-components.module';
import { LibsFormBuilderModule } from '@ocean/libs/form-builder';

@NgModule({
  imports: [
    CommonModule,
    BasicLayoutModule,
    LayoutComponentsModule,
    SharedModule,
    AppComponentsModule,
    ...DashboardImports,
    RouterModule.forChild(routes),
    BoatsModule,
    ShipyardsModule,
    SurveyorsModule,
    ToastrModule.forRoot(),
    MatMenuModule,
    AppFormsModule,
    BarRatingModule,
    MatProgressSpinnerModule,
    NgxIntlTelInputModule,
    SharedBidsComponentsModule,
    LibsFormBuilderModule,
  ],
  declarations: DashboardComponents,
  entryComponents: DashboardEntryComponents,
})
export class DashboardModule {}
