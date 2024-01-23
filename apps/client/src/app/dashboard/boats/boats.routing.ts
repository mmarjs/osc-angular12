// tslint:disable: nx-enforce-module-boundaries
import { Routes } from '@angular/router';
import { BreadcrumbsComponent } from '@ocean/client/common';
import { BasicLayout } from '@ocean/layout';
import { DATA, PATHS } from '@ocean/shared';

import { BoatResolver } from '@ocean/api/resolvers';
import {
  BoatsCreateComponent,
  BoatsFormComponent,
  BoatsHomeComponent
} from './boats.barrel';

export const routes: Routes = [
  {
    path: PATHS['BOATS'],
    component: BasicLayout,
    children: [
      {
        path: '',
        component: BreadcrumbsComponent,
        children: [
          {
            path: '',
            pathMatch: 'full',
            component: BoatsHomeComponent
          },
          {
            path: PATHS['BOATS_CREATE'],
            component: BoatsCreateComponent,
            data: DATA['BOATS_CREATE']
          },
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
      }
    ]
  }
];
