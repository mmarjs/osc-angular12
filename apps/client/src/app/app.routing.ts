import { Routes } from '@angular/router';
import { SessionGuard } from '@ocean/api/guards';
import { PATHS } from '@ocean/shared';
import { RoleGuard } from '@ocean/layout/guards';
import { UserTypeTitles } from '@ocean/api/shared';
import { StripeAccountMethodsGuard } from '@ocean/layout/guards/stripe-account-methods.guard';
import { StripeProviderMethod } from '@ocean/api/services';

const routes: Routes = [
  {
    path: PATHS['AUCTIONS'],
    loadChildren: () =>
      import('./auctions/auctions.module').then((m) => m.AuctionsModule),
    canLoad: [SessionGuard],
  },
  {
    path: PATHS['MY_BIDS'],
    loadChildren: () =>
      import('./mybids/mybids.module').then((m) => m.MyBidsModule),
    canLoad: [SessionGuard],
  },
  {
    path: PATHS['DASHBOARD'],
    loadChildren: () =>
      import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
    canLoad: [SessionGuard],
  },
  {
    path: PATHS['DRAFTS'],
    loadChildren: () => import('@ocean/drafts').then((m) => m.DraftsModule),
    canLoad: [SessionGuard],
  },
  {
    path: PATHS.DOCUMENTS,
    loadChildren: () =>
      import('@ocean/documents').then((m) => m.DocumentsModule),
    canLoad: [SessionGuard],
  },
  {
    path: PATHS.STRIPE,
    loadChildren: () =>
      import('@ocean/stripe').then((m) => m.StripeRoutingModule),
    canLoad: [SessionGuard],
    canActivate: [RoleGuard, StripeAccountMethodsGuard],
    data: {
      roles: [UserTypeTitles.SHIPYARD, UserTypeTitles.SURVEYOR],
      methods: [
        StripeProviderMethod.CREATE,
        StripeProviderMethod.EDIT,
        StripeProviderMethod.READ,
      ],
    },
  },
  {
    path: '',
    loadChildren: () =>
      import('./pages/pages.module').then((m) => m.PagesModule),
  },
  {
    path: '**',
    redirectTo: PATHS.ERROR,
  },
];
export const getRoutes = () => {
  return routes;
};
