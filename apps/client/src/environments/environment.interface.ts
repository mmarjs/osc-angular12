import { ApiEnvironment } from '@ocean/api/shared';

export interface AppEnvironment extends ApiEnvironment {
  sentry: {
    environment: string;
    release: string;
    dsn: string;
    sampleRate: number;
    enabled: boolean;
  };
  production: boolean;
  connection: string;
  webURL: string;
  api: {
    env: 'local' | 'qa' | 'main';
    baseURL: string;
  };
  passwordProtected?: {
    username: string;
    password: string;
  };
  stripePublicKey: string;
  auth: {
    clientID: string;
    domain: string;
    responseType: string;
    audience: string;
    redirectUri: string;
    scope: string;
  };
}
