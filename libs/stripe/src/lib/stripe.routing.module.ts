import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PATHS } from '@ocean/shared';
import { RouterModule } from '@angular/router';
import { StripeModule } from '@ocean/stripe';
import { CreateStripeAccountComponent } from './components/create/create-stripe-account/create-stripe-account.component';
import { StripeBasicLayoutComponent } from './components/stripe-basic-layout/stripe-basic-layout.component';
import { StripeManageComponent } from './components/list/stripe-manage/stripe-manage.component';
import { ManageGuard } from './guards/manage.guard';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { STRIPE_FEATURE_KEY } from './store/state';
import { stripeReducer } from './store/reducers';
import { StripeEffects } from './store/effects';

const paths = {
  manage: PATHS.STRIPE_MANAGEMENT.replace(`${PATHS.STRIPE}/`, ''),
  account: PATHS.CREATE_STRIPE_ACCOUNT.replace(`${PATHS.STRIPE}/`, ''),
};

@NgModule({
  imports: [
    CommonModule,
    StripeModule,
    RouterModule.forChild([
      {
        path: '',
        component: StripeBasicLayoutComponent,
        children: [
          {
            path: '',
            pathMatch: 'full',
            redirectTo: paths.manage,
          },
          {
            path: paths.manage,
            component: StripeManageComponent,
            canActivate: [ManageGuard],
          },
          {
            path: paths.account,
            component: CreateStripeAccountComponent,
          },
        ],
      },
    ]),
    StoreModule.forFeature(STRIPE_FEATURE_KEY, stripeReducer),
    EffectsModule.forFeature([StripeEffects]),
  ],
})
export class StripeRoutingModule {}
