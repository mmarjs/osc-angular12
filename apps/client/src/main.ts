import * as Sentry from '@sentry/angular';
import { BrowserTracing } from '@sentry/tracing';
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

Sentry.init({
  environment: environment.sentry.environment,
  release: environment.sentry.release,
  dsn: environment.sentry.dsn,
  integrations: [
    new BrowserTracing({
      tracePropagationTargets: [environment.webURL],
      routingInstrumentation: Sentry.routingInstrumentation,
    }),
  ],
  tracesSampleRate: environment.sentry.sampleRate,
  enabled: environment.sentry.enabled,
});

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch(err => console.error(err));
