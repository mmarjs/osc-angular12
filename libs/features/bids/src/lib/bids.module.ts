/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BidsComponent } from './bids/bids.component';
import { InternationalizationModule } from '@ocean/internationalization';
import { BasicLayoutModule, LayoutComponentsModule } from '@ocean/layout';
import { MatDataSourceModule } from '@ocean/material';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { SharedModule } from '@ocean/shared';
import { IconsModule } from '@ocean/icons';
import { MatButtonModule } from '@angular/material/button';
import { AuctionTimeRemainingComponent } from './auction-time-remaining/auction-time-remaining.component';
import { AuctionBidsProcessComponent } from './auction-bids-process/auction-bids-process.component';
import { MatRadioModule } from '@angular/material/radio';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EscrowDepositComponent } from './escrow-deposit/escrow-deposit.component';
import { MatInputModule } from '@angular/material/input';
import { BidsShellComponent } from './bids-shell/bids-shell.component';
import { ReviewWorkComponent } from './review-work/review-work.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AppComponentsModule } from '@ocean/common/components'
import { MatIconModule } from '@angular/material/icon';
import { SharedDialogsModule } from '@ocean/shared/dialogs';
import { SharedBidsComponentsModule } from '../../../../../apps/client/src/app/common/components/shared-bids-components/shared-bids-components.module'
import { ComponentsModule } from '@ocean/components';
import { ContractDocumentComponent } from './contract-document/contract-document.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: BidsShellComponent,
        children: [
          {
            path: '',
            pathMatch: 'full',
            component: BidsComponent,
            data: {
              title: 'BIDS.REVIEW_BIDS',
            },
          },
          {
            path: 'deposit/:bidId',
            component: EscrowDepositComponent,
            data: {
              title: 'BIDS.PAYMENT',
            },
          },
          {
            path: 'review-work/:bidId',
            component: ReviewWorkComponent,
            data: {
              title: 'BIDS.REVIEW_WORK',
            },
          },
          {
            path: 'documents/:bidId',
            component: ContractDocumentComponent,
            data: {
              title: 'BIDS.DOCUMENTS',
            }
          }
        ],
      },
    ]),
    CommonModule,
    InternationalizationModule,
    BasicLayoutModule,
    LayoutComponentsModule,
    MatTableModule,
    MatDataSourceModule,
    MatPaginatorModule,
    SharedModule,
    IconsModule,
    MatButtonModule,
    MatRadioModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    FlexLayoutModule,
    AppComponentsModule,
    MatIconModule,
    SharedDialogsModule,
    SharedBidsComponentsModule,
    ComponentsModule,
    MatProgressSpinnerModule
  ],
  declarations: [
    BidsComponent,
    AuctionTimeRemainingComponent,
    AuctionBidsProcessComponent,
    EscrowDepositComponent,
    BidsShellComponent,
    ReviewWorkComponent,
    ContractDocumentComponent,
  ],
  exports:[],
  // providers: [BidDatasource]
})
export class BidsModule {}