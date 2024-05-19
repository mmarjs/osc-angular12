// tslint:disable: nx-enforce-module-boundaries
import { Routes } from '@angular/router';
import { CookiePolicyComponent } from '@ocean/client/pages/legal/cookie-policy/cookie-policy.component';
import { BasicLayout } from '@ocean/layout';
import { DATA, PATHS } from '@ocean/shared';

import {
  CallbackComponent,
  ErrorComponent,
  FaqComponent,
  // ForgotPasswordComponent,
  HomepageComponent,
  LegalComponent,
  LicenseAgreementComponent,
  PrivacyPolicyComponent,
  ProprietaryRightsComponent,
  // LoginComponent,
  ProtectionPolicyComponent,
  SignupComponent,
  SignupCreatedComponent,
  UserAgreementComponent,
} from './pages.barrel';
import { DocumentSignedComponent } from './document-signed/document-signed.component';
import { DocumentDeclinedComponent } from './document-declined/document-declined.component';

export const openRoutes: Routes = [
  // {
  //   path: PATHS['LOGIN'],
  //   component: LoginComponent,
  //   outlet: 'open'
  // },
  // {
  //   path: PATHS['RESET'],
  //   component: ForgotPasswordComponent,
  //   outlet: 'open'
  // }
];

export const coreRoutes: Routes = [
  {
    path: '',
    component: BasicLayout,
    children: [
      {
        path: PATHS['HOME'],
        pathMatch: 'full',
        component: HomepageComponent,
        data: DATA['HOME'],
      },
      {
        path: PATHS['FAQ'],
        component: FaqComponent,
        data: DATA['FAQ'],
      },
      {
        path: PATHS['DOCUMENT_SIGNED'],
        component: DocumentSignedComponent,
      },
      {
        path: PATHS['DOCUMENT_DECLINED'],
        component: DocumentDeclinedComponent,
      },
      {
        path: PATHS['LEGAL'],
        children: [
          {
            path: '',
            component: LegalComponent,
            data: DATA['LEGAL'],
            children: [
              {
                path: PATHS['LICENSE_AGREEMENT'],
                pathMatch: 'full',
                component: LicenseAgreementComponent,
                data: DATA['LICENSE_AGREEMENT'],
              },
              {
                path: PATHS['PRIVACY_POLICY'],
                component: PrivacyPolicyComponent,
                data: DATA['PRIVACY_POLICY'],
              },
              {
                path: PATHS['PROPRIETARY_RIGHTS'],
                component: ProprietaryRightsComponent,
                data: DATA['PROPRIETARY_RIGHTS'],
              },
              {
                path: PATHS['PROTECTION_POLICY'],
                component: ProtectionPolicyComponent,
                data: DATA['PROTECTION_POLICY'],
              },
              {
                path: PATHS['USER_AGREEMENT'],
                component: UserAgreementComponent,
                data: DATA['USER_AGREEMENT'],
              },
              {
                path: PATHS['COOKIE_POLICY'],
                component: CookiePolicyComponent,
                data: DATA['COOKIE_POLICY'],
              },
            ],
          },
        ],
      },
      {
        path: PATHS['SIGNUP'],
        data: DATA['SIGNUP'],
        children: [
          {
            path: '',
            pathMatch: 'full',
            component: SignupComponent,
          },
          {
            path: PATHS['SIGNUP_CREATED'],
            component: SignupCreatedComponent,
            data: DATA['SIGNUP_CREATED'],
          },
        ],
      },
      {
        path: PATHS['CALLBACK'],
        component: CallbackComponent,
      },
      {
        path: PATHS['ERROR'],
        component: ErrorComponent,
      },
    ],
  },
];
