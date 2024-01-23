import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BasicLayout } from '@ocean/layout';
import { CreateStripeAccountComponent } from './components/create-stripe-account/create-stripe-account.component';
import { StripeModule } from '@ocean/stripe';
import { StripeAccountResolver } from '@ocean/api/resolvers';
@NgModule({
  imports: [
    CommonModule,
    StripeModule,
    RouterModule.forChild(
      [
        {
          path: '',
          component: BasicLayout,
          children: [
            {
              path: '', 
              component: CreateStripeAccountComponent, 
              resolve: { stripeAccountDetail: StripeAccountResolver}
            },
          ],
        },
      ]
    ),
  ]
})
export class StripeRoutingModule {
}
