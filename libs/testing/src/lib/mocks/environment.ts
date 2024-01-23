export const mockEnvironment = {
  production: false,
  webURL: 'http://localhost:4200',
  api: {
    env: 'local',
    baseURL: 'http://main.qa.oceanservicecenter.internal/'
  },
  auth: {
    clientID: 'X4FS5yT19hBfDjYGzQyCmsTDFWNDqN7K',
    domain: 'oceanservicecenter.auth0.com',
    responseType: 'token',
    audience: 'https://oceanservicecenter.auth0.com/api/v2/',
    redirectUri: 'http://localhost:4200/callback',
    scope: 'openid profile email'
  }
};
