// tslint:disable: nx-enforce-module-boundaries
import { Routes } from '@angular/router';
import { BasicLayout } from '@ocean/layout';
import { DATA, PATHS } from '@ocean/shared';
import { BoatResolver } from '@ocean/api/resolvers';

import { BreadcrumbsComponent } from '../common';
import { BoatsFormComponent } from './boats/form/form.component';
import {
  DashboardIndexComponent,
  NotificationsComponent,
  ProfileComponent,
  ProfileFormComponent,
  ProfilePasswordComponent,
  ProfileRatingsComponent, ProfileServicesComponent
} from './dashboard.barrel';

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
            component: DashboardIndexComponent,
            data: DATA['DASHBOARD']
          },
          {
            path: PATHS['PROFILE'],
            children: [
              {
                path: '',
                component: ProfileComponent,
                children: [
                  {
                    path: '',
                    pathMatch: 'full',
                    component: ProfileFormComponent,
                    data: {
                      ...DATA['PROFILE'],
                      readonly: true
                    }
                  },
                  {
                    path: PATHS['PROFILE_EDIT'],
                    component: ProfileFormComponent,
                    // TODO canDeactivate if the form is changed
                    data: {
                      ...DATA['PROFILE_EDIT'],
                      readonly: false
                    }
                  },
                  {
                    path: PATHS['SERVICES'],
                    component: ProfileServicesComponent,
                    data: {
                      ...DATA['SERVICES']
                    },
                    children: [
                      {
                        path: PATHS['BOATS'],
                        children: [
                          {
                            path: PATHS['BOATS_DISPLAY'],
                            resolve: { item: BoatResolver },
                            children: [
                              {
                                path: '',
                                pathMatch: 'full',
                                component: BoatsFormComponent,
                                data: {
                                  ...DATA['BOATS_DISPLAY'],
                                  readonly: true
                                }
                              },
                              {
                                path: PATHS['BOATS_EDIT'],
                                component: BoatsFormComponent,
                                data: {
                                  ...DATA['BOATS_EDIT'],
                                  readonly: false
                                }
                              }
                            ]
                          }
                        ]
                      },
                    ]
                  },
                  {
                    path: PATHS['PROFILE_PASSWORD'],
                    component: ProfilePasswordComponent,
                    data: DATA['PROFILE_PASSWORD']
                  },
                  {
                    path: PATHS['PROFILE_RATINGS'],
                    component: ProfileRatingsComponent,
                    data: DATA['PROFILE_RATINGS']
                  }
                ]
              }
            ]
          },
          // {
          //   path: PATHS['FINANCES'],
          //   children: [
          //     {
          //       path: '',
          //       component: FinancesComponent,
          //       children: [
          //         {
          //           path: '',
          //           pathMatch: 'full',
          //           redirectTo: PATHS['FINANCES_TRANSFER']
          //         },
          //         {
          //           path: PATHS['FINANCES_TRANSFER'],
          //           component: FinancesTransferComponent,
          //           data: DATA['FINANCES_TRANSFER']
          //         },
          //         {
          //           path: PATHS['FINANCES_BANK'],
          //           component: FinancesBankComponent,
          //           data: DATA['FINANCES_BANK']
          //         },
          //         {
          //           path: PATHS['FINANCES_TRANSACTIONS'],
          //           component: FinancesTransactionsComponent,
          //           data: DATA['FINANCES_TRANSACTIONS']
          //         }
          //       ]
          //     }
          //   ]
          // },
          // {
          //   path: PATHS['MESSAGES'],
          //   children: [
          //     {
          //       path: '',
          //       pathMatch: 'full',
          //       component: MessagesComponent,
          //       data: DATA['MESSAGES']
          //     }
          //   ]
          // },
          {
            path: PATHS['NOTIFICATIONS'],
            children: [
              {
                path: '',
                pathMatch: 'full',
                component: NotificationsComponent,
                data: DATA['NOTIFICATIONS']
              }
            ]
          }
        ]
      }
    ]
  }
];
