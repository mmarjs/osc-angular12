// tslint:disable: nx-enforce-module-boundaries
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UserTypeTitles } from '@ocean/api/shared';
import { BasicLayout } from '@ocean/layout';
import { RoleGuard } from '@ocean/layout/guards';
import { DATA, SharedModule } from '@ocean/shared';
import { AppComponentsModule, BreadcrumbsComponent } from '../common';
import { AppFormsModule } from '../common/forms';
import { MybidsComponent } from './mybids/mybids.component';
import { SharedBidsComponentsModule } from '../common/components/shared-bids-components/shared-bids-components.module'
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    AppComponentsModule,
    AppFormsModule,
    SharedBidsComponentsModule,
    SharedModule,
    ReactiveFormsModule,
    RouterModule.forChild([
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
                component: MybidsComponent,
                canActivate: [RoleGuard],
                data: {
                  ...DATA.MY_BIDS,
                  roles: [
                    UserTypeTitles.ADMIN,
                    UserTypeTitles.SHIPYARD,
                    UserTypeTitles.SURVEYOR,
                  ]
                }
              }
            ]
          }
        ]
      }
    ]),
  ],
  declarations: [
    MybidsComponent,
  ],
  entryComponents: [MybidsComponent],
})
export class MyBidsModule { }
