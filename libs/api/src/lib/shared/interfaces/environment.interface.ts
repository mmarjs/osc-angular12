import { InjectionToken } from '@angular/core';
import { AuthOptions } from 'auth0-js';

/**
 * @ocean/api required config
 */
export interface ApiEnvironment {
  connection: string;
  webURL: string;
  api: {
    env: 'local' | 'qa' | 'main';
    baseURL: string;
  };
  auth: AuthOptions;
  /*
  {
    // The Client ID of the Application
    clientID: string;
    // Auth0 account domain such as 'example.auth0.com'
    domain: string;
    // It can be any space separated list of the values `code`, `token`, `id_token`. Token for FE
    responseType: string;
    // The default audience, used if requesting access to an API.
    audience: string;
    // The URL where Auth0 will call back to with the result of a successful or failed authentication.
    redirectUri: string;
    // The default scope used for all authorization requests.
    scope: string;
  };
  */
}

/**
 * Environment Injection Token
 */
export const API_ENVIRONMENT = new InjectionToken<ApiEnvironment>(
  'api.environment'
);
