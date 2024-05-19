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
import { CreateStripeAccountComponent } from './components/create/create-stripe-account/create-stripe-account.component';
import { StripeAccountGuardComponent } from './components/stripe-account-guard/stripe-account-guard.component';
import { StripeBasicLayoutComponent } from './components/stripe-basic-layout/stripe-basic-layout.component';
import { environment } from '../../../../apps/client/src/environments/environment';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTabsModule } from '@angular/material/tabs';
import { StripeDebitCardsComponent } from './components/list/stripe-debit-cards/stripe-debit-cards.component';
import { StripeManageComponent } from './components/list/stripe-manage/stripe-manage.component';
import { MatCardModule } from '@angular/material/card';
import { StripeBanksComponent } from './components/list/stripe-banks/stripe-banks.component';
import { StripeAccountPreviewComponent } from './components/details/stripe-account-preview/stripe-account-preview.component';
import { CreateStripeBankComponent } from './components/create/create-stripe-bank/create-stripe-bank.component';
import { MatDialogModule } from '@angular/material/dialog';
import { StripeBankDetailsComponent } from './components/details/stripe-bank-details/stripe-bank-details.component';
import { CreateStripeCardComponent } from './components/create/create-stripe-card/create-stripe-card.component';
import { StripeDebitCardDetailsComponent } from './components/details/stripe-debit-card-details/stripe-debit-card-details.component';
import { MatDividerModule } from '@angular/material/divider';
import { IconsModule } from '@ocean/icons';

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
    MatToolbarModule,
    IconsModule,
    MatTooltipModule,
    MatTabsModule,
    MatCardModule,
    MatDialogModule,
    MatDividerModule,
  ],
  declarations: [
    CreateStripeAccountComponent,
    CreditCardComponent,
    StripeAccountGuardComponent,
    StripeBasicLayoutComponent,
    StripeDebitCardsComponent,
    StripeManageComponent,
    StripeBanksComponent,
    CreateStripeBankComponent,
    StripeAccountPreviewComponent,
    StripeBankDetailsComponent,
    CreateStripeCardComponent,
    StripeDebitCardDetailsComponent,
  ],
  exports: [
    CreateStripeAccountComponent,
    CreditCardComponent,
    StripeAccountGuardComponent,
    StripeBasicLayoutComponent,
    StripeDebitCardsComponent,
    StripeManageComponent,
    StripeBanksComponent,
    StripeAccountPreviewComponent,
    CreateStripeBankComponent,
    StripeBankDetailsComponent,
    CreateStripeCardComponent,
    StripeDebitCardDetailsComponent,
  ],
})
export class StripeModule {}
