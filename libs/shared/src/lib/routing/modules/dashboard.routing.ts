import { PrimaryRoute } from '../definitions';
import { BOATS } from './boats.routing';
import { FINANCES } from './finances.routing';
import { PROFILE } from './profile.routing';
import { SHIPYARDS } from './shipyards.routing';
import { SURVEYORS } from './surveyors.routing';

export const DASHBOARD: PrimaryRoute = {
  key: 'DASHBOARD',
  path: 'dashboard',
  data: {
    title: 'Dashboard'
  },
  children: [
    PROFILE,
    FINANCES,
    {
      key: 'MESSAGES',
      path: 'messages',
      breadcrumb: 'Messages',
      data: {
        title: 'My Messages'
      }
    },
    {
      key: 'NOTIFICATIONS',
      path: 'notifications',
      breadcrumb: 'Notifications',
      data: {
        title: 'My Notifications'
      }
    },
    BOATS,
    SHIPYARDS,
    SURVEYORS
  ]
};
