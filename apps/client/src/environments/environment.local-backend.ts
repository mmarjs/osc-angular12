import { AppEnvironment } from './environment.interface';
import { getProjectRelease } from '../../../../libs/shared/src/lib/utils/getProjectRelease';
import { dsns } from './sentry';

export const environment: AppEnvironment = {
  sentry: {
    environment: 'local',
    release: getProjectRelease(),
    dsn: dsns.local,
    sampleRate: 1,
    enabled: false
  },
  production: false,
  connection: 'OSCLocal',
  webURL: 'http://localhost:4200',
  api: {
    env: 'local',
    baseURL: 'http://localhost:8080'
  },
  stripePublicKey: 'pk_test_51AtiFFJl1yaxJafBVTQUcV2dhp5I9epoiP6bggrM6DYbG70FKxqtNBaUMEKcwioOu2GHlJ8lPVVcP4705iPsNv8c003QlvX7vg',
  auth: {
    clientID: 'cWOE0UvdKA2ZcR8sfvrP2ByJmYuiJvAB',
    domain: 'oceanservicecenter.auth0.com',
    responseType: 'token id_token',
    audience: 'https://api2.oceanservicecenter.com',
    redirectUri: 'http://localhost:4200/callback',
    scope: 'openid email profile',
  },
};
