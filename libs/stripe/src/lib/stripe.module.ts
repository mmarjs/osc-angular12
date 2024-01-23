/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NgxStripeModule } from 'ngx-stripe';
import { TranslateModule } from '@ngx-translate/core';
import { LayoutComponentsModule } from '@ocean/layout';
import { LibsFormBuilderModule } from '@ocean/libs/form-builder';
import { PartialsModule } from '@ocean/shared/partials/partials.module';
import { CreditCardComponent } from './components/credit-card/credit-card.component';
import { CreateStripeAccountComponent } from './components/create-stripe-account/create-stripe-account.component';
import { StripeAccountGuardComponent } from './components/stripe-account-guard/stripe-account-guard.component';
import { environment } from '../../../../apps/client/src/environments/environment';

@NgModule({
  imports: [
    CommonModule,
    NgxStripeModule.forChild(environment.stripePublicKey),
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    LayoutComponentsModule,
    MatInputModule,
    LibsFormBuilderModule,
    MatStepperModule,
    MatButtonModule,
    MatNativeDateModule,
    MatProgressSpinnerModule,
    PartialsModule,
    RouterModule,
    FlexLayoutModule,
  ],
  declarations: [
    CreateStripeAccountComponent,
    CreditCardComponent,
    StripeAccountGuardComponent,
  ],
  exports: [
    CreateStripeAccountComponent,
    CreditCardComponent,
    StripeAccountGuardComponent,
  ]
})
export class StripeModule {
}
