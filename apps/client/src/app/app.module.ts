import * as Sentry from '@sentry/angular';
import { APP_INITIALIZER, ErrorHandler, NgModule } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatSelectCountryModule } from '@angular-material-extensions/select-country';
import { NxModule } from '@nrwl/angular';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { ApiModule } from '@ocean/api';
import { BasicLayoutModule } from '@ocean/layout';
import { CookieModule, SharedModule } from '@ocean/shared';
import { InternationalizationModule, Locale } from '@ocean/internationalization';
import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { getRoutes } from './app.routing';
import { AppInterceptor } from './app.interceptor';
import { AppStateModule } from './state/state.module';
import { PasswordProtectionComponent } from './components/password-protection/password-protection.component';
import { NgxStripeModule } from 'ngx-stripe';

export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient);
}

@NgModule({
  declarations: [AppComponent, PasswordProtectionComponent],
  imports: [
    BrowserAnimationsModule,
    FlexLayoutModule,
    NxModule.forRoot(),
    RouterModule.forRoot(getRoutes(), {
      initialNavigation: 'enabled',
      paramsInheritanceStrategy: 'always',
      enableTracing: false
    }),
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    AppStateModule.forParent(),
    ApiModule.forRoot(environment),
    CookieModule.forRoot(environment),
    NgxStripeModule.forRoot(environment.stripePublicKey),
    BasicLayoutModule,
    SharedModule,
    MatSelectCountryModule.forRoot('en'),
    HttpClientModule,
    InternationalizationModule.forRoot({
      locale_id: Locale.EN
    }),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
  ],
  providers: [
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: {
        float: 'never'
      }
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AppInterceptor,
      multi: true
    },
    {
      provide: ErrorHandler,
      useValue: Sentry.createErrorHandler({
        showDialog: false,
      }),
    },
    {
      provide: Sentry.TraceService,
      deps: [Router],
    },
    {
      provide: APP_INITIALIZER,
      useFactory: () => () => {},
      deps: [Sentry.TraceService],
      multi: true,
    }
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {
}
