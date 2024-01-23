/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { Routes } from '@angular/router';
import { UserTypeTitles } from '@ocean/api/shared';
import { BasicLayout } from '@ocean/layout';
import { DATA } from '@ocean/shared';
import { RoleGuard } from '@ocean/layout/guards';
import { DraftsComponent } from './drafts/drafts.component';
import { BreadcrumbsComponent } from '@ocean/common/index';

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
            component: DraftsComponent,
            canActivate: [RoleGuard],
            data: {
              ...DATA['AUCTIONS'],
              roles: Object.values(UserTypeTitles)
            }
          }
        ]
      }
    ]
  }
];
