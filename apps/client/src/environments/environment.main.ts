import { AppEnvironment } from './environment.interface';
import { getProjectRelease } from '@ocean/shared/utils/getProjectRelease';
import { dsns } from './sentry';

export const environment: AppEnvironment = {
  sentry: {
    environment: 'production',
    release: getProjectRelease(),
    dsn: dsns.prod,
    sampleRate: 1,
    enabled: true
  },
  production: true,
  connection: 'OSCProd',
  webURL: 'https://www.oceanservicecenter.com',
  api: {
    env: 'main',
    baseURL: 'https://api.oceanservicecenter.com'
  },
  stripePublicKey: 'pk_live_51AtiFFJl1yaxJafBT02Nvbx6EIzcVbyTap3fpkttSAN1Vgg6lDJXMO5KhllmEVjxrfA8zga5PiJCdrMu2OyN66UV00LUjD5cpZ',
  auth: {
    clientID: 'VnW55g9p8Oy5b5pgjANOFDsbTFvnU23P',
    domain: 'auth.oceanservicecenter.com',
    responseType: 'token id_token',
    audience: 'https://api2.oceanservicecenter.com',
    redirectUri: 'https://www.oceanservicecenter.com/callback',
    scope: 'openid email profile'
  }
};
