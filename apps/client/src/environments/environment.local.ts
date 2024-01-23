import { AppEnvironment } from './environment.interface';
import { getProjectRelease } from '@ocean/shared/utils/getProjectRelease';
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
  connection: 'OSCQa',
  webURL: 'https://ui.qa.oceanservicecenter.com',
  api: {
    env: 'qa',
    baseURL: 'https://api.qa.oceanservicecenter.com',
  },
  stripePublicKey: 'pk_test_51AtiFFJl1yaxJafBVTQUcV2dhp5I9epoiP6bggrM6DYbG70FKxqtNBaUMEKcwioOu2GHlJ8lPVVcP4705iPsNv8c003QlvX7vg',
  auth: {
    clientID: 'X4FS5yT19hBfDjYGzQyCmsTDFWNDqN7K',
    domain: 'auth.oceanservicecenter.com',
    responseType: 'token id_token',
    audience: 'https://api2.oceanservicecenter.com',
    redirectUri: 'http://localhost:4200/callback',
    scope: 'openid email profile',
  },
};
