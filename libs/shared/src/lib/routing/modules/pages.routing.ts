import { PrimaryRoutes } from '../definitions';

export const PAGES: PrimaryRoutes = [
  {
    key: 'HOME',
    path: '',
    data: {
      title: 'Welcome!'
    }
  },
  {
    key: 'FAQ',
    path: 'faq',
    data: {
      title: 'Frequently Asked Questions'
    }
  },
  {
    key: 'LEGAL',
    path: 'legal',
    data: {
      title: 'Terms & Conditions'
    },
    children: [
      {
        key: 'LICENSE_AGREEMENT',
        path: 'licenseAgreement',
        data: {
          title: 'License Agreement'
        }
      },
      {
        key: 'PRIVACY_POLICY',
        path: 'privacyPolicy',
        data: {
          title: 'Privacy Policy'
        }
      },
      {
        key: 'PROPRIETARY_RIGHTS',
        path: 'proprietaryRights',
        data: {
          title: 'Proprietary Rights'
        }
      },
      {
        key: 'PROTECTION_POLICY',
        path: 'protectionPolicy',
        data: {
          title: 'Protection Policy'
        }
      },
      {
        key: 'USER_AGREEMENT',
        path: 'userAgreement',
        data: {
          title: 'User Agreement'
        }
      },
      {
        key: 'COOKIE_POLICY',
        path: 'cookiePolicy',
        data: {
          title: 'Cookie Policy'
        }
      }
    ]
  },
  {
    key: 'SIGNUP',
    path: 'signup',
    data: {
      title: 'Sign Up'
    },
    children: [
      {
        key: 'SIGNUP_CREATED',
        path: 'created',
        data: {
          title: 'Account Created!'
        }
      }
    ]
  },
  {
    key: 'CALLBACK',
    path: 'callback',
    data: {
      title: 'Redirecting...'
    }
  },
  {
    key: 'ERROR',
    path: 'error',
    data: {
      title: 'Error!'
    }
  }
];
