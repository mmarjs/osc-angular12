
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { IconsModule } from '@ocean/icons';
import { InternationalizationModule } from '@ocean/internationalization';
import { MatDataSourceModule } from '@ocean/material';
import { SharedDirectivesModule, SharedPipesModule } from '@ocean/shared';
import { PartialsModule } from '@ocean/shared/partials/partials.module';
import { BidItemsTableComponent } from './bid-items-table/bid-items-table.component';
import { BidSummaryComponent } from './bid-summary/bid-summary.component';
import {BidsTableComponent} from './bids-table/bids-table.component'
@NgModule({
  imports: [
    CommonModule,
    MatTableModule,
    MatDataSourceModule,
    MatPaginatorModule,
    InternationalizationModule,
    MatButtonModule,
    PartialsModule,
    RouterModule,
    IconsModule,
    SharedDirectivesModule,
    MatProgressSpinnerModule,
    SharedPipesModule,
    FlexLayoutModule
  ],
  declarations: [BidsTableComponent,BidItemsTableComponent,BidSummaryComponent],
  exports: [BidsTableComponent]
})
export class SharedBidsComponentsModule{}
