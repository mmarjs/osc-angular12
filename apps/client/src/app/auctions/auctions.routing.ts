// tslint:disable: nx-enforce-module-boundaries
import { Routes } from '@angular/router';
import {
  AuctionBidResolver,
  BidResolver,
  BoatResolver,
  JobResolver,
} from '@ocean/api/resolvers';
import { UserTypeTitles } from '@ocean/api/shared';
import { BasicLayout } from '@ocean/layout';
import { DATA, PATHS } from '@ocean/shared';

import { BreadcrumbsComponent } from '../common';
import { RouterWrapperComponent } from '../common/components/router-wrapper';
import {
  AuctionsListComponent,
  AuctionCreateComponent,
  DetailComponent,
  PaymentComponent,
  SignComponent,
} from './auctions.barrel';
import { RoleGuard } from '@ocean/layout/guards';
import { PayCommissionComponent } from './pay-commission/pay-commission.component';

export const routes: Routes = [
  {
    path: '',
    component: BasicLayout,
    children: [
      {
        path: '',
        component: BreadcrumbsComponent,
        children: [
          {
            path: '',
            pathMatch: 'full',
            component: AuctionsListComponent,
            canActivate: [RoleGuard],
            data: {
              ...DATA.AUCTIONS,
              roles: [
                UserTypeTitles.ADMIN,
                UserTypeTitles.SHIPYARD,
                UserTypeTitles.SURVEYOR,
              ],
            },
          },
          {
            path: PATHS.AUCTION,
            component: RouterWrapperComponent,
            resolve: { auction: JobResolver },
            children: [
              {
                path: PATHS.AUCTION_DETAIL,
                component: DetailComponent,
                canActivate: [RoleGuard],
                resolve: { preloaded: AuctionBidResolver },
                data: {
                  ...DATA.AUCTION_DETAIL,
                  roles: [
                    UserTypeTitles.ADMIN,
                    UserTypeTitles.SHIPYARD,
                    UserTypeTitles.SURVEYOR,
                  ],
                },
              },
              {
                path: PATHS.AUCTION_DETAIL_EDIT,
                component: DetailComponent,
                resolve: { bid: BidResolver },
                canActivate: [RoleGuard],
                data: {
                  ...DATA.AUCTION_DETAIL_EDIT,
                  roles: [
                    UserTypeTitles.ADMIN,
                    UserTypeTitles.SHIPYARD,
                    UserTypeTitles.SURVEYOR,
                  ],
                },
              },
              {
                path: PATHS.AUCTION_EDIT,
                component: AuctionCreateComponent,
                // canActivate: [RoleGuard], is auction creator
                data: {
                  ...DATA['AUCTION_EDIT'],
                  roles: [UserTypeTitles.ADMIN, UserTypeTitles.BOAT_OWNER],
                },
              },
              {
                path: PATHS.BIDS,
                loadChildren: () =>
                  import('@ocean/features/bids').then((m) => m.BidsModule),
                canActivate: [RoleGuard],
                data: {
                  ...DATA.BIDS,
                  roles: [UserTypeTitles.ADMIN, UserTypeTitles.BOAT_OWNER],
                },
              },
              {
                path: PATHS.AUCTION_PAYMENT,
                component: PaymentComponent,
                canActivate: [RoleGuard],
                data: {
                  ...DATA.AUCTION_PAYMENT,
                  roles: [UserTypeTitles.ADMIN, UserTypeTitles.BOAT_OWNER],
                },
              },
              {
                path: PATHS.BID_DEPOSIT,
                component: PayCommissionComponent,
                canActivate: [RoleGuard],
                data: {
                  ...DATA.AUCTION_PAYMENT,
                  roles: [
                    UserTypeTitles.ADMIN,
                    UserTypeTitles.SHIPYARD,
                    UserTypeTitles.SURVEYOR,
                  ],
                },
              },
              {
                path: PATHS.AUCTION_SIGN,
                component: SignComponent,
                canActivate: [RoleGuard],
                data: {
                  ...DATA.AUCTION_SIGN,
                  roles: [UserTypeTitles.ADMIN, UserTypeTitles.BOAT_OWNER],
                },
              },
            ],
          },
          {
            path: PATHS['LIST_BOAT'],
            component: RouterWrapperComponent,
            resolve: { boat: BoatResolver },
            children: [
              {
                path: PATHS['AUCTION_CREATE'],
                component: AuctionCreateComponent,
                data: DATA['AUCTION_CREATE'],
              },
            ],
          },
        ],
      },
    ],
  },
];
