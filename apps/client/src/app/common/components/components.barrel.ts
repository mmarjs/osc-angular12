import { AccountSwitchComponent } from '@ocean/client/common/components/account-switch/account-switch.component';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { SurveyListComponent } from '@ocean/client/common/components/survey-list';
import { RouterWrapperComponent } from '@ocean/client/common/components/router-wrapper';
import { PaymentListComponent } from '@ocean/client/common/components/payment-list/payment-list.component';
import { PaymentModalComponent } from '@ocean/client/common/components/payment-modal/payment-modal.component';
import { CancelListingComponent } from '../components/cancel-listing/cancel-listing.component'
import { EditPaymentFormComponent } from '../components/edit-payment-form/edit-payment-form.component'

export const AppComponents = [
  BreadcrumbsComponent,
  SurveyListComponent,
  RouterWrapperComponent,
  AccountSwitchComponent,
  PaymentListComponent,
  PaymentModalComponent,
  CancelListingComponent,
  EditPaymentFormComponent
];
