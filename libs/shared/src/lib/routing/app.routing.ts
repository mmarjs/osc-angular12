// import { Dictionary } from '../utils';
import { AppRouteDefinitions, AppRoutes } from './definitions';
import { AUCTIONS, DASHBOARD, DRAFTS, OPEN, PAGES } from './modules';

export const routes: AppRoutes = [
  AUCTIONS,
  DASHBOARD,
  DRAFTS,
  ...PAGES,
  ...OPEN,
  {
    key: 'MY_BIDS',
    path: 'mybids',
    data: {
      title: 'My Bids'
    },
  }
];

// 1. not-AoT compliant
// vars needed outside of the class function call
// const PATHS: Dictionary<string> = {};
// const DATA: Dictionary<any> = {};
// export const ROUTES = new AppRouteDefinitions(routes, PATHS, DATA);
// console.log(PATHS, DATA);
// export { PATHS, DATA };

// 2. AoT values
export const ROUTES = new AppRouteDefinitions(routes);

export const PATHS = {
  AUCTIONS: 'auctions',
  AUCTION: ':id',
  AUCTION_CREATE: 'create',
  AUCTION_DETAIL: 'details',
  AUCTION_DETAIL_EDIT: 'edit-details/:id',
  AUCTION_EDIT: 'edit',
  BID_DEPOSIT: 'deposit/:bidId',
  BID_REVIEW_WORK: 'review-work',
  BID_DOCUMENT: 'document',
  // AUCTION_DETAIL: 'details/:id',
  BIDS: 'bids',
  AUCTION_PAYMENT: 'payment',
  AUCTION_SIGN: 'sign',
  // AUCTION_PAYMENT: 'payment/:id',
  LIST_BOAT: ':id',
  BOATS: 'boats',
  BOATS_CREATE: 'create',
  BOATS_DISPLAY: ':id',
  BOATS_EDIT: 'edit',
  CALLBACK: 'callback',
  DASHBOARD: 'dashboard',
  ERROR: 'error',
  FAQ: 'faq',
  FINANCES: 'finances',
  FINANCES_BANK: 'bank',
  FINANCES_TRANSACTIONS: 'transactions',
  FINANCES_TRANSFER: 'transfer',
  HOME: '',
  LOGIN: 'login',
  MESSAGES: 'messages',
  NOTIFICATIONS: 'notifications',
  PROFILE: 'profile',
  PROFILE_EDIT: 'edit',
  PROFILE_PASSWORD: 'password',
  PROFILE_RATINGS: 'ratings',
  RESET: 'reset',
  SERVICES: 'services',
  SERVICES_BOATS: 'boats',
  SERVICES_SHIPYARDS: 'shipyards',
  SERVICES_SURVEYORS: 'shipyards',
  SHIPYARDS: 'shipyards',
  SHIPYARDS_CREATE: 'create',
  SHIPYARDS_DISPLAY: ':id',
  SHIPYARDS_EDIT: 'edit',
  SIGNUP: 'signup',
  SIGNUP_CREATED: 'created',
  SURVEYORS: 'surveyors',
  SURVEYORS_CREATE: 'create',
  SURVEYORS_DISPLAY: ':id',
  SURVEYORS_EDIT: 'edit',
  LEGAL: 'legal',
  LICENSE_AGREEMENT: 'licenseAgreement',
  PRIVACY_POLICY: 'privacyPolicy',
  PROPRIETARY_RIGHTS: 'proprietaryRights',
  PROTECTION_POLICY: 'protectionPolicy',
  USER_AGREEMENT: 'userAgreement',
  COOKIE_POLICY: 'cookiePolicy',
  DRAFTS: 'drafts',
  MY_BIDS: 'mybids',
  DOCUMENTS: 'documents',
  CREATE_STRIPE_ACCOUNT: 'stripe-account'
};

export const DATA = {
  AUCTIONS: { title: 'Auctions' },
  MY_BIDS: {title: 'My Bids'},
  AUCTION_CREATE: { title: 'Add Auction' },
  AUCTION_DETAIL: { title: 'Auction Details' },
  AUCTION_DETAIL_EDIT: { title: 'Edit Bid' },
  AUCTION_EDIT: { title: 'Auction Edit' },
  BIDS: { title: 'Bids' },
  AUCTION_PAYMENT: { title: 'Auction Payment' },
  AUCTION_SIGN: { title: 'Time to Sign the Agreements!' },
  BOATS: { title: 'My Boats' },
  BOATS_CREATE: { title: 'Add a Boat' },
  BOATS_DISPLAY: { title: 'Boat Details' },
  BOATS_EDIT: { title: 'Edit Boat' },
  CALLBACK: { title: 'Redirecting...' },
  DASHBOARD: { title: 'Dashboard' },
  ERROR: { title: 'Error!' },
  FAQ: { title: 'Frequently Asked Questions' },
  FINANCES: { title: 'My Finances' },
  FINANCES_BANK: { title: 'Manage Bank Information' },
  FINANCES_TRANSACTIONS: { title: 'View Transactions' },
  FINANCES_TRANSFER: { title: 'Transfer Funds' },
  HOME: { title: '' },
  MESSAGES: { title: 'My Messages' },
  NOTIFICATIONS: { title: 'My Notifications' },
  PROFILE: { title: 'My Profile' },
  PROFILE_EDIT: { title: 'Edit Profile' },
  PROFILE_PASSWORD: { title: 'Change Password' },
  PROFILE_RATINGS: { title: 'View Ratings' },
  SERVICES: { title: 'My Services' },
  SERVICES_BOATS: { title: 'My Boats' },
  SHIPYARDS: { title: 'My Shipyards' },
  SHIPYARDS_CREATE: { title: 'Add a Shipyard' },
  SHIPYARDS_DISPLAY: { title: 'Shipyard Details' },
  SHIPYARDS_EDIT: { title: 'Edit Shipyard' },
  SIGNUP: { title: 'Sign Up' },
  SIGNUP_CREATED: { title: 'Account Created!' },
  SURVEYORS: { title: 'My Businesses' },
  SURVEYORS_CREATE: { title: 'Add a Business' },
  SURVEYORS_DISPLAY: { title: 'Business Details' },
  SURVEYORS_EDIT: { title: 'Edit Business' },
  LEGAL: { title: 'Terms & Conditions' },
  LICENSE_AGREEMENT: { title: 'License Agreement' },
  PRIVACY_POLICY: { title: 'Privacy Policy' },
  PROPRIETARY_RIGHTS: { title: 'Proprietary Rights' },
  PROTECTION_POLICY: { title: 'Protection Policy' },
  USER_AGREEMENT: { title: 'User Agreement' },
  COOKIE_POLICY: { title: 'Cookie Policy' },
  DRAFTS: { title: 'Drafts' },
};

/**
 * Angular Language Service complains about the ROUTES type.
 * Do not access it with dot notation but with square bracket notation.
 * Example: links['HOME']
 */
